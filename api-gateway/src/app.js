const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const logMiddleware = require('./middlewares/logMiddleware');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

require('dotenv').config();
app.use(express.json());
app.use(bodyParser.json());

// Middleware para logging
app.use(logMiddleware);

// Rutas principales
app.use('/', routes);

app.use('/access', createProxyMiddleware({
  target: 'http://localhost:3003',  // Verifica que la URL sea correcta
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying request to: ${proxyReq.url}`);
  },
  onError: (err, req, res) => {
    console.error(`Proxy error: ${err.message}`);
    res.status(500).send('Proxy Error');
  },
}));


app.use((req, res, next) => {
  console.log(`Middleware general: ${req.method} ${req.originalUrl}`);
  next();
});



app.use('/auth/login', (req, res, next) => {
  console.log(`Solicitud a /auth/login recibida en API Gateway`);
  console.log(`Redirigiendo a: ${process.env.ACCESS_SERVICE_URL}/auth/login`);
  next();
});


app.use('/auth', (req, res, next) => {
  console.log(`Redirigiendo solicitud a ${process.env.ACCESS_SERVICE_URL}${req.url}`);
  next();
});

// Proxy hacia el Microservicio de Acceso
app.use('/auth', createProxyMiddleware({ 
  target: process.env.ACCESS_SERVICE_URL, 
  changeOrigin: true,
  logLevel: 'debug',
  pathRewrite: { '^/auth/login': '/auth/login','^/auth': '/auth' },
  timeout: 5000, // 5 segundos de espera
  proxyTimeout: 5000, // 5 segundos de espera
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxy request hacia: ${process.env.ACCESS_SERVICE_URL}${req.url}`);
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`Proxy response con status: ${proxyRes.statusCode}`);
  },
  onError: (err, req, res) => {
    console.error('Error en el proxy:', err);
    res.status(500).send('Error en el proxy');
  }
}));


// Proxy hacia el Microservicio de Carreras
app.use('/careers', createProxyMiddleware({ 
    target: process.env.CAREERS_SERVICE_URL, 
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: { '^/careers': '/careers' }
}));

// Proxy hacia el Microservicio de Asignaturas
app.use('/subjects', createProxyMiddleware({ 
    target: process.env.CAREERS_SERVICE_URL, 
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: { '^/subjects': '/subjects' }
}));


module.exports = app;
