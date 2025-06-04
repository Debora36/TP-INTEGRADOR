const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Obra_social = sequelize.define('obra_social', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'obra_social',
  timestamps: false
});

module.exports = Obra_social;