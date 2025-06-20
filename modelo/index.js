const Habitacion = require('./habitacion');
const Cama = require('./cama');
const AlaHospital = require('./ala_hospital');
const Internacion = require('./internacion');
const Paciente = require('./paciente');
const Medico = require('./medico');
const Turno = require('./turno');

// Habitacion ⇄ Cama
Habitacion.hasMany(Cama, { foreignKey: 'ID_Habitacion', as: 'camas' });
Cama.belongsTo(Habitacion, { foreignKey: 'ID_Habitacion', as: 'habitacion' });

// Ala ⇄ Habitacion
AlaHospital.hasMany(Habitacion, { foreignKey: 'ID_ala_hospital', as: 'habitaciones' });
Habitacion.belongsTo(AlaHospital, { foreignKey: 'ID_ala_hospital', as: 'ala' });

// Cama ⇄ Internacion
Cama.hasOne(Internacion, { foreignKey: 'ID_Cama', as: 'internacion' });
Internacion.belongsTo(Cama, { foreignKey: 'ID_Cama', as: 'cama' });

// Internacion ⇄ Paciente
Internacion.belongsTo(Paciente, { foreignKey: 'ID_Paciente', as: 'paciente' });
Paciente.hasMany(Internacion, { foreignKey: 'ID_Paciente', as: 'internacion' });

// Internacion ⇄ Habitacion
Internacion.belongsTo(Habitacion, { foreignKey: 'ID_Habitacion', as: 'habitacion' });
Habitacion.hasMany(Internacion, { foreignKey: 'ID_Habitacion', as: 'internaciones' });

Turno.associate && Turno.associate({ Paciente, Medico });
Paciente.associate && Paciente.associate({ Turno });
Medico.associate && Medico.associate({ Turno });

// Exportar todos los modelos
module.exports = {
  Habitacion,
  Cama,
  AlaHospital,
  Internacion,
  Paciente,
  Medico,
  Turno
};