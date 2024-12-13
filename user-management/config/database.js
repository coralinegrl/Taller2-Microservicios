require('dotenv').config();
const { Sequelize } = require('sequelize');

// Crear una nueva instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nombre de la base de datos
  process.env.DB_USER,      // Usuario
  process.env.DB_PASS,      // Contraseña
  {
    host: process.env.DB_HOST,  // Host de la base de datos
    dialect: 'postgres',       // Dialecto
    logging: false,            // Opcional, desactiva los logs de las consultas SQL
  }
);

module.exports = sequelize;  // Asegúrate de exportar la instancia de Sequelize
