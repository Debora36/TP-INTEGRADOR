const Habitacion = require('./habitacion');
const Cama = require('./cama');
const AlaHospital = require('./ala_hospital');
const Internacion = require('./internacion');
const Paciente = require('./paciente');
// Asociaciones

// Una habitación tiene muchas camas
Habitacion.hasMany(Cama, {
  foreignKey: 'ID_Habitacion',
  as: 'camas'
});

// Una cama pertenece a una habitación
Cama.belongsTo(Habitacion, {
  foreignKey: 'ID_Habitacion',
  as: 'habitacion'
});

// Un ala hospitalaria tiene muchas habitaciones
AlaHospital.hasMany(Habitacion, {
  foreignKey: 'ID_ala_hospital',
  as: 'habitaciones'
});

// Una habitación pertenece a un ala hospitalaria
Habitacion.belongsTo(AlaHospital, {
  foreignKey: 'ID_ala_hospital',
  as: 'ala'
});

// Exportamos todos los modelos juntos
module.exports = {
  Habitacion,
  Cama,
  AlaHospital,
  Internacion,
  Paciente
};