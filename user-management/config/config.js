require('dotenv').config();

const { Sequelize } = require('sequelize');

// 💡 Inicializar la instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario
  process.env.DB_PASS, // Contraseña
  {
    host: process.env.DB_HOST, // Servidor (debe ser "db" si usas Docker)
    dialect: 'postgres', // Dialecto (PostgreSQL)
    logging: false, // Evita los logs de SQL en consola
  }
);

module.exports = sequelize;
