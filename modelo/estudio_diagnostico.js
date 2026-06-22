const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const EstudioDiagnostico = sequelize.define('estudio_diagnostico', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ID_EvolucionMedica: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'evolucion_medica',
            key: 'id'
        }
    },
    tipo_estudio: {
        type: DataTypes.STRING(100),
        allowNull: false
        // Ej: 'Radiografía', 'Laboratorio', 'Tomografía'
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fecha_solicitud: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    resultado: {
        type: DataTypes.TEXT,
        allowNull: true // Puede estar nulo al principio hasta que lleguen los resultados
    }
}, {
    tableName: 'estudio_diagnostico',
    timestamps: false
});

module.exports = EstudioDiagnostico;