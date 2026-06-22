const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const evolucion_medica = sequelize.define('evolucion_medica', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ID' // En tu SQL es mayúscula
  },
  id_internacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'ID_Internacion',
    references: {
      model: 'internacion',
      key: 'ID'
    }
  },
  id_medico: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'ID_Medico',
    references: {
      model: 'medico',
      key: 'id'
    }
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'Fecha'
  },
  diagnostico_evolutivo: {
    type: DataTypes.TEXT,
    field: 'Diagnostico_Evolutivo'
  },
  observaciones: {
    type: DataTypes.TEXT,
    field: 'Observaciones'
  },
  plan_atencion: {
      type: DataTypes.TEXT,
      allowNull: true
    }
}, {
  tableName: 'evolucion_medica',
  timestamps: false
});

module.exports = evolucion_medica;