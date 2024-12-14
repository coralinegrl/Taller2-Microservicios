const amqp = require('amqplib');

const startConsumer = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
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
