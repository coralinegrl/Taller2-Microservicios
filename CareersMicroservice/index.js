const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { connectRabbitMQ } = require('./eventPublisher');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

// Importar rutas
const careersRouter = require('./routes/careers');
const subjectsRouter = require('./routes/subjects');

// Inicializar aplicación
const app = express();

// Middleware para parsear JSON
app.use(bodyParser.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/carrerasDB')
    .then(() => console.log('MongoDB conectado exitosamente'))
    .catch(err => console.error('Error conectando a MongoDB:', err));


// Conectar a RabbitMQ
connectRabbitMQ().catch((err) => {
    console.error('Error conectando a RabbitMQ:', err);
  });
  
// Rutas
app.use('/careers', careersRouter); // Rutas de carreras
app.use('/subjects', subjectsRouter); // Rutas de asignaturas

// Iniciar el servidor
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Microservicio de Carreras corriendo en el puerto ${PORT}`);
});
