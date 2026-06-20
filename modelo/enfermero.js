const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Enfermero= sequelize.define('Enfermero', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  matricula: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  ID_Usuario:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'enfermero',
  timestamps: false
});

module.exports = Enfermero;