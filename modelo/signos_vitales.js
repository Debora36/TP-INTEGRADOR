const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const SignosVitales = sequelize.define('SignosVitales', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    internacion_id: { type: DataTypes.INTEGER, allowNull: false },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    presion_arterial: { type: DataTypes.STRING },
    frecuencia_cardiaca: { type: DataTypes.STRING },
    frecuencia_respiratoria: { type: DataTypes.STRING },
    temperatura: { type: DataTypes.STRING },
    color_piel: { type: DataTypes.STRING }, // Enum: 'normal', 'rosado', etc.
    respuesta_estimulos: { type: DataTypes.INTEGER }, // Escala 1-5
  }, {
    tableName: 'signos_vitales',
    timestamps: true
  });
module.exports = SignosVitales;