const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('his', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});


module.exports = sequelize;