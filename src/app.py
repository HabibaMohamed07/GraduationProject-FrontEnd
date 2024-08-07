from flask import Flask, jsonify
from flask_cors import CORS
import subprocess
import logging
import threading
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

progress_percentage = 0
headsetprogress_percentage = 0

def handle_connect():
    global progress_percentage
    print("Client connected")
    progress_percentage = 10
    return "Client Connected"

def handle_headsetconnect():
    global headsetprogress_percentage
    print("Client connected")
    headsetprogress_percentage += 10
    if headsetprogress_percentage > 100:
            headsetprogress_percentage = 100
    return "Client Connected"

def increase_headset_progress():
    global headsetprogress_percentage
    while headsetprogress_percentage >= 0:
        handle_headsetconnect()
        
        time.sleep(3)  # Adjust the sleep time as needed






@app.route("/Left", methods=["POST"])
def movingleft():
    
    from python_script import connect_to_device_l
    from python_script2 import connect_to_device_r

    try:
        connect_to_device_l()
    except Exception as e:
        print("Error:", e)
    return "Left Arm Move"  

@app.route("/Right", methods=["POST"])
def movingright():
  
    from python_script import connect_to_device_l
    from python_script2 import connect_to_device_r
   
    try:
        connect_to_device_r()
    except Exception as e:
        print("Error:", e)
      
    return "Right Arm Move"  





@app.route("/connect", methods=["POST"])
def connect():
    handle_connect()
    from python_script import connect_to_device_l
    from python_script2 import connect_to_device_r
    global progress_percentage
    try:
        connect_to_device_l()
        
        progress_percentage = 50  # Connection successful
        connect_to_device_r()
        progress_percentage = 100
    except Exception as e:
        print("Error:", e)
        progress_percentage = -1  # Connection failed
    return "Connected successfully"

@app.route('/headset', methods=["POST"])
def run_scripts():
    global headsetprogress_percentage
   
    try:
        headsetprogress_percentage=0
        # Start the thread to increase headset progress
        threading.Thread(target=increase_headset_progress, daemon=True).start()

        process = subprocess.Popen(['python', '-m', 'pipenv', 'run', 'python', 'src/headsetAPI/main.py'])
        process.communicate()
        if process.returncode != 0:
            raise Exception(f"Subprocess returned non-zero exit code: {process.returncode}")
        return jsonify({'status': 'Scripts started successfully'})
    except Exception as e:
        headsetprogress_percentage = -1
        logging.error(f'Error starting scripts: {e}')
        return jsonify({'status': 'Error starting scripts', 'error': str(e)})

@app.route("/progress", methods=["GET"])
def get_progress():
    global progress_percentage
    print("Fetching progress:", progress_percentage)
    return jsonify({"percentage": progress_percentage})

@app.route("/headsetprogress", methods=["GET"])
def get_headsetprogress():
    global headsetprogress_percentage
    print("Fetching headsetprogress:", headsetprogress_percentage)
    return jsonify({"headsetconnection": headsetprogress_percentage})


@app.route('/model', methods=['GET'])
def model():
    # Here you can implement your model or dummy logic to generate predictions
    # For this example, let's assume the model predicts the result as "Left"
    result = "Left"
    return jsonify({"result": result})


from flask import request
import random
@app.route('/generate', methods=['POST'])
def generate():
    input_data = request.json.get('input')  # Assuming input is sent in JSON format
    if input_data == 'Left':
        choices = ['Left', 'Right']
        probabilities = [0.6, 0.4]
    elif input_data == 'Right':
        choices = ['Right', 'Left']  # Reversed order for right input
        probabilities = [0.6, 0.4]
    else:
        return jsonify({'error': 'Invalid input'}), 400

    result = random.choices(choices, weights=probabilities, k=1)[0]
    return jsonify({'result': result}), 200


from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
mlp_model = tf.keras.models.load_model("src/mlp_model_3.keras")

@app.route("/predict", methods=["POST"])
def predict():

    input_data = request.json["data"]   
    X = np.array([input_data])
    print(X)
    predictions = mlp_model.predict(X)
    labels = ['Right', 'Left', 'other', 'other']
    
    predicted_index = np.argmax(predictions)
    
    predicted_label = labels[predicted_index]
    
    return jsonify({"prediction": predicted_label})



if __name__ == "__main__":
    app.run(debug=True)
