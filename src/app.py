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

if __name__ == "__main__":
    app.run(debug=True)
