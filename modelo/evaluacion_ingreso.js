const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const EvaluacionIngreso = sequelize.define('EvaluacionIngreso', {
    ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ID_Internacion: { type: DataTypes.INTEGER, allowNull: false },
    ID_Enfermero: { type: DataTypes.INTEGER, allowNull: false },
    Fecha_Hora: { type: DataTypes.DATE, allowNull: false },
    Motivo_Principal: { type: DataTypes.TEXT },
    Sintomas_Desc: { type: DataTypes.STRING },
    Prioridad: { type: DataTypes.STRING },  // Escala 1-5
    Plan_Cuidados_Preliminar: { type: DataTypes.TEXT },
  }, {
    tableName: 'evaluacion_ingreso',
    timestamps: false
  });
module.exports = EvaluacionIngreso;