const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware de prueba
app.use((req, res, next) => {
    console.log(`Solicitud recibida en API Gateway: ${req.method} ${req.originalUrl}`);
    next();
});

// Proxy hacia el Microservicio de Acceso
app.use('/auth', createProxyMiddleware({ 
    target: process.env.ACCESS_SERVICE_URL, 
    changeOrigin: true,
    logLevel: 'debug', // Nivel de depuración para ver más detalles
    pathRewrite: { '^/auth': '/auth' } // Asegura que el path no se altera
}));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`API Gateway corriendo en el puerto ${PORT}`);
});
