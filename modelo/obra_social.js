const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Obra_social = sequelize.define('obra_social', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'obra_social',
  timestamps: false
});

module.exports = Obra_social;