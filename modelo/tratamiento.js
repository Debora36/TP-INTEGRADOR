const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const tratamiento = sequelize.define('tratamiento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_evolucion_medica: {
    type: DataTypes.INTEGER,
    field: 'ID_EvolucionMedica', 
    references: {
      model: 'evolucion_medica',
      key: 'ID'
    }
  },
  id_medico: {
    type: DataTypes.INTEGER,
    field: 'ID_Medico',
    references: {
      model: 'medico',
      key: 'id'
    }
  },
  descripcion: {
    type: DataTypes.STRING(50),
    field: 'Descripcion'
  },
  duracion: {
    type: DataTypes.STRING(50),
    field: 'Duracion'
  },
  tipo_tratamiento: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
  estado: {
      type: DataTypes.STRING(20),
      defaultValue: 'Activo'
  }
}, {
  tableName: 'tratamiento',
  timestamps: false
});

module.exports = tratamiento;