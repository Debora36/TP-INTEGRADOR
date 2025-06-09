const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Internacion = sequelize.define('internacion', {
ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ID_Paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'paciente',
      key: 'ID'
    }
  },
  ID_Habitacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'habitacion',
      key: 'ID'
    }
  },
  ID_Cama: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cama',
      key: 'ID'
    }
  },
  FechaIngreso: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  FechaAlta: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'internacion',
  timestamps: false
});

module.exports = Internacion;