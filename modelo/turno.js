const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Turno = sequelize.define('Turno', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'paciente',
      key: 'id'
    }
  },
  medico_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'medico',
      key: 'id'
    }
  },
  fecha: DataTypes.DATEONLY,
  hora: DataTypes.TIME
}, {
  tableName: 'turno',
  timestamps: false 
});

// Asociaciones
Turno.associate = models => {
  Turno.belongsTo(models.Paciente, { foreignKey: 'id_paciente' });
  Turno.belongsTo(models.Medico, { foreignKey: 'medico_id' });
};

module.exports = Turno;

 
