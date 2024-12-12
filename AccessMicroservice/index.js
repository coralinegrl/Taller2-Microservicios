const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Inicializar la app
const app = express();
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB conectado exitosamente'))
    .catch(err => console.error('Error conectando a MongoDB:', err));

// Importar rutas
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Microservicio de Gestión de Acceso corriendo en el puerto ${PORT}`);
});
