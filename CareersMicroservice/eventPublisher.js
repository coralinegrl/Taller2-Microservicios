const amqp = require('amqplib');

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
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