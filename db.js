const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sistemahospital', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});


module.exports = sequelize;