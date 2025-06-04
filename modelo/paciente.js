const { DataTypes } = require('sequelize');
const sequelize = require('../db');

  const Paciente = sequelize.define('paciente', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DNI: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    FechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Genero: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    Contacto_emergencia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ID_Nacionalidad: {
        type: DataTypes.INTEGER,
      allowNull: false
    },
    ID_Obra_social: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numero_afiliado: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'paciente',
    timestamps: false
  });

  module.exports = Paciente;