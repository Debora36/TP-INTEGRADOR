const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Habitacion = sequelize.define('habitacion', {
ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ID_ala_hospital: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ala_hospital',
      key: 'ID'
    }
  },
  Numero: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  camas_disponibles: {
    type: DataTypes.TINYINT,
    allowNull: false,
  }
}, {
  tableName: 'habitacion',
  timestamps: false
});

module.exports = Habitacion;