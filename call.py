import paho.mqtt.publish as publish


publish.single("anith/test", 0, hostname = "test.mosquitto.org")
publish.single("anith/topic", "World", hostname = "test.mosquitto.org")


print("Done")
