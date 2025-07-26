const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const HistorialMedico = sequelize.define('historialmedico', {
    ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ID_paciente: { type: DataTypes.INTEGER, allowNull: false },
    tipo_sangre: { type: DataTypes.STRING }, // Enum: 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
    enfermedades_previas: { type: DataTypes.TEXT },
    cirugias: { type: DataTypes.TEXT },
    alergias: { type: DataTypes.TEXT },
    medicamentos_actuales: { type: DataTypes.TEXT },
    antecedentes_familiares: { type: DataTypes.TEXT },
    Fumador: {type: DataTypes.CHAR(1)},
    Alcohol: {type: DataTypes.CHAR(1)},
    Drogas: {type: DataTypes.CHAR(1)},
    }, {
    tableName: 'historialmedico',
    timestamps: true
  });
module.exports = HistorialMedico;
