const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const medicacion = sequelize.define('medicacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ID'
  },
  nombre: {
    type: DataTypes.STRING(30),
    field: 'Nombre'
  },
  descripcion: {
    type: DataTypes.TEXT,
    field: 'Descripcion'
  },
  presentacion: {
    type: DataTypes.ENUM('Comprimido', 'Capsula', 'Inyectable', 'Jarabe', 'Aerosol', 'Otro'),
    field: 'Presentacion'
  }
}, {
  tableName: 'medicacion',
  timestamps: false
});

module.exports = medicacion;