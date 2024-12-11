const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('../config/config'); // Importa la instancia de sequelize

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

sequelize.authenticate()
  .then(() => console.log('✅ Conexión con la base de datos exitosa.'))
  .catch((error) => console.error('❌ Error al conectar con la base de datos:', error));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
