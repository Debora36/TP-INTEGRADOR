const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const Especialidad = sequelize.define('especialidad', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_especialidad: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'especialidad',
    timestamps: false
});
module.exports = Especialidad;