const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const tratamiento_medicacion = sequelize.define('tratamiento_medicacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ID'
  },
  id_tratamiento: {
    type: DataTypes.INTEGER,
    field: 'ID_Tratamiento',
    references: {
      model: 'tratamiento',
      key: 'id'
    }
  },
  id_medicacion: {
    type: DataTypes.INTEGER,
    field: 'ID_Medicacion',
    references: {
      model: 'medicacion',
      key: 'ID'
    }
  },
  dosis: {
    type: DataTypes.STRING(50),
    field: 'Dosis'
  },
  frecuencia: {
    type: DataTypes.STRING(50),
    field: 'Frecuencia'
  }
}, {
  tableName: 'tratamientomedicacion',
  timestamps: false
});

module.exports = tratamiento_medicacion;