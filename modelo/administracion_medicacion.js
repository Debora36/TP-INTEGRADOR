const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const administracion_medicacion = sequelize.define('administracion_medicacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ID'
  },
  id_tratamiento: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'ID_Tratamiento',
    references: {
      model: 'tratamiento',
      key: 'id'
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
  ID_Internacion: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: { model: 'internacion', key: 'ID' }
  },
  ID_Medicacion: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: { model: 'medicacion', key: 'ID' }
  },
  tipo_administracion: {
        type: DataTypes.STRING,
        allowNull: false
  },
  fecha_hora: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'Fecha_Hora'
  },
  dosis_aplicada: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'Dosis_Aplicada'
  },
  notas: {
    type: DataTypes.STRING(200),
    allowNull: true,
    field: 'Notas'
  }
}, {
  tableName: 'administracion_medicacion',
  timestamps: false
});

module.exports = administracion_medicacion;