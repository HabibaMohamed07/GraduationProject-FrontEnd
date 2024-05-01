from emotiv_lsl.emotiv_epoc_x import EmotivEpocX
#First Termainl python -m pipenv run python main.py 
#Second Terminal python examples/read_data.py
if __name__ == "__main__":
    emotiv_epoc_x = EmotivEpocX()
    emotiv_epoc_x.main_loop()
