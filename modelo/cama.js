const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Cama = sequelize.define('cama', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ID_Habitacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'habitacion',
      key: 'ID'
    }
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'cama',
  timestamps: false
});

module.exports = Cama;