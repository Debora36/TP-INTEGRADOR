const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Medico = sequelize.define('Medico', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ID_especialidad: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  matricula: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  ID_Usuario:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'medico',
  timestamps: false
});

Medico.associate = models => {
  Medico.hasMany(models.Turno, { foreignKey: 'medico_id' });
};

module.exports = Medico;