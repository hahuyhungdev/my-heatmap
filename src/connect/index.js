import mqtt from "mqtt";
const client = mqtt.connect("mqtt://localhost");
client.subscribe("my-topic");

client.on("message", (topic, message) => {
  console.log(message.toString());
});

client.publish("my-topic", "Hello, MQTT!");
