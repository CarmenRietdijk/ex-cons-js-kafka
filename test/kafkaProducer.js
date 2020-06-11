// Simulate sending messages to the Kafka queue and receiving
const { Kafka } = require("kafkajs");
const { v4  } = require('uuid');
const faker = require('faker');

const kafka = new Kafka({
  clientId: "pactflow-example-producer-js-kafka",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();

  setInterval(() => {
    producer.send({
      topic: "products",
      messages: [
        {
          value: JSON.stringify({
            id: v4(),
            name: faker.commerce.productName(),
            type: faker.commerce.product().toUpperCase(),
            version: "v1",
            event: faker.helpers.shuffle(['CREATED', 'UPDATED', 'PURCHASED'])[0],
          }),
        },
      ],
    });
  }, 3000)
};

run().catch(console.error);
