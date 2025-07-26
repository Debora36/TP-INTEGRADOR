const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const EvaluacionInicial = sequelize.define('EvaluacionInicial', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    internacion_id: { type: DataTypes.INTEGER, allowNull: false },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    //motivo_internacion: { type: DataTypes.STRING }, // ya está en la internación
    sintomas: { type: DataTypes.STRING },
    analgesico: { type: DataTypes.STRING },
    estado: { type: DataTypes.STRING }, // Enum: 'inconciente', 'poca movilidad', 'desorientado', 'conciente'.
    intensidad_dolor: { type: DataTypes.INTEGER }, // Escala 1-5
  }, {
    tableName: 'evaluacion_inicial',
    timestamps: true
  });
module.exports = EvaluacionInicial;