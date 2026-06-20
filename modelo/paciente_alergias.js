const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const PacienteAlergias = sequelize.define('PacienteAlergias', {
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
  id_alergia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'catalogo_alergias',
      key: 'id'
    }
  }
}, {
  tableName: 'paciente_alergias',
  timestamps: false
});

module.exports = PacienteAlergias;