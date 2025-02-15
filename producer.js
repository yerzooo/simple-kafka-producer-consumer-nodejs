require("dotenv").config();
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-producer",
  brokers: [process.env.KAFKA_BROKER],
  ssl: true,
  sasl: {
    mechanism: "plain",
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
});

const producer = kafka.producer();

const sendMessage = async () => {
  await producer.connect();
  console.log("Producer connected...");

  const message = { value: `Hello Kafka ${new Date().toISOString()}` };

  await producer.send({
    topic: process.env.KAFKA_TOPIC,
    messages: [message],
  });

  console.log("Message sent:", message);
  await producer.disconnect();
};

sendMessage().catch(console.error);