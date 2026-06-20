const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const paciente_medicacion_habitual = sequelize.define('paciente_medicacion_habitual', {
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
  id_medicacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'medicacion', 
      key: 'ID' 
    }
  },
  dosis_diaria: {
    type: DataTypes.STRING(100)
  },
  frecuencia: {
    type: DataTypes.STRING(100)
  }
}, {
  tableName: 'paciente_medicacion_habitual',
  timestamps: false
});

module.exports = paciente_medicacion_habitual;