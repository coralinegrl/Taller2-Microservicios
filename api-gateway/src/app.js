require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();
app.use(bodyParser.json());

// Registrar las rutas
app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` API Gateway corriendo en el puerto ${PORT}`);
});
