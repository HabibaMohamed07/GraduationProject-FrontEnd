import bluetooth

def connect_to_device_l():
    hc05_address = "00:21:13:00:A4:3F"
    sock = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
    sock.connect((hc05_address, 1))
    data_to_send = "l"
    sock.send(data_to_send)
    sock.close()

# For testing purposes
if __name__ == "__main__":
    connect_to_device_l()


