from datetime import datetime, timedelta

import numpy as np
from mne import Info, create_info
from mne.io.array import RawArray
from pylsl import StreamInlet, resolve_stream

# Define the sampling rate (replace 250 with your actual sampling rate)
SRATE = 250

def get_info() -> Info:
    ch_names = ['AF3', 'F7', 'F3', 'FC5', 'T7', 'P7',
                'O1', 'O2', 'P8', 'T8', 'FC6', 'F4', 'F8', 'AF4']

    info = create_info(
        sfreq=SRATE,
        ch_names=ch_names,
        ch_types=['eeg'] * len(ch_names)
    )

    return info


def main():
    # first resolve an EEG stream on the lab network
    print("looking for an EEG stream...")
    streams = resolve_stream('type', 'EEG')

    # create a new inlet to read from the stream
    inlet = StreamInlet(streams[0])

    buffer = []
    start_time = datetime.now()
    end_time = start_time + timedelta(minutes=1)  # Capture data for 1 minute

    while datetime.now() < end_time:
        sample, _ = inlet.pull_sample()
        sample = [el / 1000000 for el in sample]  # convert to microvolts
        buffer.append(sample)

    info = get_info()
    raw = RawArray(np.array(buffer).T, info)

    # Generate a timestamp for the file name
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    raw.save("data_{}_R_raw.fif".format(timestamp))


if __name__ == '__main__':
    main()