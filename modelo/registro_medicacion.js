const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const RegistroMedicacion = sequelize.define('RegistroMedicacion', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    internacion_id: { type: DataTypes.INTEGER, allowNull: false },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    medicacion: { type: DataTypes.STRING }, // Nombre del medicamento administrado
    dosis: { type: DataTypes.STRING }, // Dosis administrada
    via_administracion: { type: DataTypes.STRING }, // Enum: 'oral', 'intravenosa', etc.
    fecha_hora_administracion: { type: DataTypes.DATE, allowNull: false }, // Fecha y hora de la administración
  }, {
    tableName: 'registro_medicacion',
    timestamps: true
  });
module.exports = RegistroMedicacion;