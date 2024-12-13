const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Redirigir al Microservicio de Gestión de Acceso
app.use('/auth', createProxyMiddleware({ 
    target: 'http://localhost:3002',
    changeOrigin: true
}));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`API Gateway corriendo en el puerto ${PORT}`);
});
