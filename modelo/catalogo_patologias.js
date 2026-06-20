const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const catalogo_patologias = sequelize.define('catalogo_patologias', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'catalogo_patologias',
  timestamps: false
});

module.exports = catalogo_patologias;