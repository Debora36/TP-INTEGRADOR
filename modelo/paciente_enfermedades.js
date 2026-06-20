const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const paciente_enfermedades = sequelize.define('paciente_enfermedades', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'paciente',
      key: 'id'
    }
  },
  id_patologia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'catalogo_patologias', 
      key: 'id'
    }
  }
}, {
  tableName: 'paciente_enfermedades',
  timestamps: false
});

module.exports = paciente_enfermedades;