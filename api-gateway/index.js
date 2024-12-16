const app = require('./src/app'); // Importa la aplicación desde src/app.js
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();



const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`API Gateway corriendo en el puerto ${PORT}`);
});
