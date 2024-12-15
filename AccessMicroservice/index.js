const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');

// Cargar variables de entorno
dotenv.config();

// Inicializar la app
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Usar las rutas de autenticación con el prefijo '/auth'
app.use('/auth', authRoutes);


// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB conectado exitosamente'))
    .catch(err => console.error('Error conectando a MongoDB:', err));



// Iniciar el servidor
const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, () => {
    console.log(`Microservicio de Gestión de Acceso corriendo en el puerto ${PORT}`);
});

server.timeout = 10000; // Aumenta el timeout a 10 segundos

