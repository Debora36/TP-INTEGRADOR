const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const paciente_antecedentes_familiares = sequelize.define('paciente_antecedentes_familiares', {
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
  },
  parentesco: {
    type: DataTypes.STRING(50), //Padre, Tía, etc.
    allowNull: false
  }
}, {
  tableName: 'paciente_antecedentes_familiares',
  timestamps: false
});

module.exports = paciente_antecedentes_familiares;