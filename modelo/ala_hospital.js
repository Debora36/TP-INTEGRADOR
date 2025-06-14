const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const AlaHospital = sequelize.define('ala_hospital', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_ala: {
    type: DataTypes.STRING,
    allowNull: false
  },
  piso: {
    type: DataTypes.TINYINT,
    allowNull: false
  }
}, {
  tableName: 'ala_hospital',
  timestamps: false
});

module.exports = AlaHospital;