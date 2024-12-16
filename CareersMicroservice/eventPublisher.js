const amqp = require('amqplib');
const RABBITMQ_URL = 'amqp://admin:admin@localhost:5672/';
let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log('Conectado a RabbitMQ');
    } catch (err) {
        console.error('Error conectando a RabbitMQ:', err);
    }
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

connectRabbitMQ();

module.exports = { publishEvent, connectRabbitMQ };
