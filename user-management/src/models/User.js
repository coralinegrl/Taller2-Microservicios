const { DataTypes } = require('sequelize'); 
const sequelize = require('../../config/config'); // Asegúrate de usar la ruta correcta

// 💡 Aquí definimos el modelo 'User'
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  primer_apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  segundo_apellido: {
    type: DataTypes.STRING
  },
  correo_electronico: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = User;
