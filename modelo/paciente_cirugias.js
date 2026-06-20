const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const PacienteCirugias = sequelize.define('paciente_cirugias', {
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
    cirugia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY, // DATEONLY guarda solo la fecha (YYYY-MM-DD), sin la hora
        allowNull: true
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'paciente_cirugias',
    timestamps: false 
});

module.exports = PacienteCirugias;