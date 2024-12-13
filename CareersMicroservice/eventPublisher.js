const amqp = require('amqplib');

let channel;

const connectRabbitMQ = async () => {
  const connection = await amqp.connect('amqp://localhost');
  channel = await connection.createChannel();
  console.log('Conectado a RabbitMQ');
};

const publishEvent = async (queue, message) => {
  if (!channel) {
    console.error('El canal RabbitMQ no está configurado');
    return;
  }
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  console.log(`Evento enviado a la cola ${queue}:`, message);
};

module.exports = { connectRabbitMQ, publishEvent };
