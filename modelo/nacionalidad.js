const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Nacionalidad = sequelize.define('Nacionalidad', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'nacionalidad',
  timestamps: false
});

module.exports = Nacionalidad;