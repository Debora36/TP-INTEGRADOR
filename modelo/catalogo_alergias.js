const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Catalogo_alergias = sequelize.define('Catalogo_alergias', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'catalogo_alergias',
  timestamps: false
});

module.exports = Catalogo_alergias;