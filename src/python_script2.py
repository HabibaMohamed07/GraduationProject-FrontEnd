import bluetooth

def connect_to_device_r():
    hc05_address = "00:21:13:00:A4:3F"
    sock = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
    sock.connect((hc05_address, 1))
    data_to_send = "r"
    sock.send(data_to_send)
    sock.close()

# For testing purposes
if __name__ == "__main__":
    connect_to_device_r()


