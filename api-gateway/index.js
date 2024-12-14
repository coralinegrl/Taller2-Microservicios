const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

const PROTO_PATH = path.resolve(__dirname, '../CareersMicroservice/protos/career.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const careerProto = grpc.loadPackageDefinition(packageDefinition).career;
const client = new careerProto.CareerService(
    'localhost:50051',
    grpc.credentials.createInsecure()
);

// Middleware de prueba
app.use((req, res, next) => {
    console.log(`Solicitud recibida en API Gateway: ${req.method} ${req.originalUrl}`);
    next();
});

app.use('/auth', (req, res, next) => {
  console.log(`Solicitud Proxy a: ${req.method} ${req.originalUrl}`);
  next();
});

// Proxy hacia el Microservicio de Acceso
app.use('/auth', createProxyMiddleware({ 
    target: process.env.ACCESS_SERVICE_URL, 
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: { '^/auth': '/auth' }
}));
app.use('/auth', createProxyMiddleware({ 
  target: process.env.ACCESS_SERVICE_URL, 
  changeOrigin: true,
  logLevel: 'debug',
  pathRewrite: { '^/auth': '/auth' }
}));


// Rutas gRPC para el Microservicio de Carreras
app.use('/careers', createProxyMiddleware({ 
  target: process.env.CAREERS_SERVICE_URL, 
  changeOrigin: true,
  logLevel: 'debug',
  pathRewrite: { '^/careers': '/careers' }
}));

// Rutas gRPC para el Microservicio de Asignaturas
app.use('/subjects', createProxyMiddleware({ 
  target: process.env.CAREERS_SERVICE_URL, 
  changeOrigin: true,
  logLevel: 'debug',
  pathRewrite: { '^/subjects': '/subjects' }
}));

app.get('/', (req, res) => {
  res.send('API Gateway funcionando correctamente');
});

app.get('/careers/:id', (req, res) => {
    const { id } = req.params;
    client.GetCareer({ id }, (error, response) => {
      if (error) {
        console.error('Error en la llamada gRPC:', error);
        return res.status(500).send(error);
      }
      res.json(response);
    });
});



// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`API Gateway corriendo en el puerto ${PORT}`);
});
