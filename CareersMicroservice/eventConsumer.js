const amqp = require('amqplib');
const RABBITMQ_URL = 'amqp://admin:admin@localhost:5672/';

const startConsumer = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        const queue = 'user_registered';

        await channel.assertQueue(queue, { durable: false });
        console.log(`Esperando mensajes en la cola ${queue}`);

        channel.consume(queue, (msg) => {
            console.log(`Mensaje recibido: ${msg.content.toString()}`);
        }, { noAck: true });
    } catch (error) {
        console.error('Error al conectar con RabbitMQ:', error);
    }
};

startConsumer();
