const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const SignosVitales = sequelize.define('evolucion_signos_vitales', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ID'
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
  id_enfermero: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'ID_Enfermero',
    references: {
      model: 'enfermero',
      key: 'ID'
    }
  },
  fecha_hora: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'Fecha_Hora'
  },
  presion_arterial: {
    type: DataTypes.STRING(20),
    field: 'Presion_Arterial'
  },
  frecuencia_cardiaca: {
    type: DataTypes.INTEGER,
    field: 'Frecuencia_Cardiaca'
  },
  frecuencia_respiratoria: {
    type: DataTypes.INTEGER,
    field: 'Frecuencia_Respiratoria'
  },
  temperatura: {
    type: DataTypes.DECIMAL(4, 1),
    field: 'Temperatura'
  },
  observaciones: {
    type: DataTypes.TEXT,
    field: 'Observaciones'
  }
}, {
  tableName: 'evolucion_signos_vitales',
  timestamps: false
});

module.exports = SignosVitales;