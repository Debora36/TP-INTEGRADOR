const { DataTypes } = require('sequelize');
const sequelize = require('../db');

  const Usuario = sequelize.define('Usuario', {
    nombre_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol: {
      type: DataTypes.ENUM('Recepcionista','Enfermero', 'Médico'),
      allowNull: false
    }
  }, {
    tableName: 'usuario',
    timestamps: false
  });

  module.exports = Usuario;


