const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const PlanObraSocial = sequelize.define('plan_obra_social', {
  nombre_plan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  obra_social_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'obra_social',
      key: 'id'
    }
  }
}, {
  tableName: 'plan_obra_social',
  timestamps: false
});

module.exports = PlanObraSocial;