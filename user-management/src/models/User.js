const { DataTypes } = require('sequelize'); 
const sequelize = require('../../config/database'); // Asegúrate de usar la ruta correcta

// 💡 Aquí definimos el modelo 'User'
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  primer_apellido: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  segundo_apellido: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  correo_electronico: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  contraseña: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'User',  // Aquí puedes especificar explícitamente el nombre de la tabla
  timestamps: true
});

module.exports = User;
