
const sequelize = require('../db');
//Importo los modelos
const Habitacion = require('./habitacion');
const Cama = require('./cama');
const AlaHospital = require('./ala_hospital');
const Internacion = require('./internacion');
const Paciente = require('./paciente');
const Medico = require('./medico');
const Enfermero = require('./enfermero');
const Turno = require('./turno');
const Especialidad = require('./especialidad');
const Usuario = require('./usuario');
const CatalogoAlergias = require('./catalogo_alergias');
const CatalogoPatologias = require('./catalogo_patologias');
const Medicacion = require('./medicacion');
const PacienteAlergias = require('./paciente_alergias');
const PacienteEnfermedades = require('./paciente_enfermedades');
const PacienteMedicacionHabitual = require('./paciente_medicacion_habitual');
const PacienteAntecedentesFamiliares = require('./paciente_antecedentes_familiares');
const EvolucionSignosVitales = require('./evolucion_signos_vitales');
const EvaluacionIngreso = require('./evaluacion_ingreso');
const EvolucionMedica = require('./evolucion_medica');
const Tratamiento = require('./tratamiento');
const TratamientoMedicacion = require('./tratamientomedicacion');
const AdministracionMedicacion = require('./administracion_medicacion');
const Obra_Social = require('./obra_social');
const Plan = require('./plan_obra_social');
const PacienteCirugias = require('./paciente_cirugias');

// Asociaciones

// Un paciente pertenece a una obra social
Paciente.belongsTo(Obra_Social, { foreignKey: 'ID_Obra_social', as: 'obra_social'});
Obra_Social.hasMany(Paciente, { foreignKey: 'ID_Obra_social' });

// Un paciente puede tener un plan dentro de la obra social
Paciente.belongsTo(Plan, { foreignKey: 'plan_id', as: 'plan_detalle'});

// Ala -> Habitación -> Cama
AlaHospital.hasMany(Habitacion, { foreignKey: 'ID_ala_hospital', as: 'habitaciones' });
Habitacion.belongsTo(AlaHospital, { foreignKey: 'ID_ala_hospital', as: 'ala' });

Habitacion.hasMany(Cama, { foreignKey: 'ID_Habitacion', as: 'camas' });
Cama.belongsTo(Habitacion, { foreignKey: 'ID_Habitacion', as: 'habitacion' });

// Internación
Cama.hasOne(Internacion, { foreignKey: 'ID_Cama', as: 'internacion' });
Internacion.belongsTo(Cama, { foreignKey: 'ID_Cama', as: 'cama' });

Paciente.hasMany(Internacion, { foreignKey: 'ID_Paciente', as: 'internaciones' });
Internacion.belongsTo(Paciente, { foreignKey: 'ID_Paciente', as: 'paciente' });

Habitacion.hasMany(Internacion, { foreignKey: 'ID_Habitacion', as: 'historial_internaciones' });
Internacion.belongsTo(Habitacion, { foreignKey: 'ID_Habitacion', as: 'habitacion' });

//Alergias (Muchos a Muchos)
Paciente.belongsToMany(CatalogoAlergias, { through: PacienteAlergias, foreignKey: 'id_paciente', otherKey: 'id_alergia', through: PacienteAlergias, as: 'alergias' });
CatalogoAlergias.belongsToMany(Paciente, { through: PacienteAlergias, foreignKey: 'id_alergia', otherKey: 'id_paciente' });

//Enfermedades Preexistentes (Muchos a Muchos)
Paciente.belongsToMany(CatalogoPatologias, { through: PacienteEnfermedades, foreignKey: 'id_paciente', otherKey: 'id_patologia', as: 'patologias' });
CatalogoPatologias.belongsToMany(Paciente, { through: PacienteEnfermedades, foreignKey: 'id_patologia', otherKey: 'id_paciente' });

//Antecedentes Familiares (Uno a Muchos directo a la tabla intermedia porque tiene info extra: parentesco)
Paciente.hasMany(PacienteAntecedentesFamiliares, { foreignKey: 'id_paciente', as: 'antecedentes_familiares' });
PacienteAntecedentesFamiliares.belongsTo(Paciente, { foreignKey: 'id_paciente' });
PacienteAntecedentesFamiliares.belongsTo(CatalogoPatologias, { foreignKey: 'id_patologia', as: 'Patologia' });

//Medicación Habitual (Muchos a Muchos con tabla Medicacion)
Paciente.hasMany(PacienteMedicacionHabitual, {foreignKey: 'id_paciente', as: 'medicacion_habitual'});
PacienteMedicacionHabitual.belongsTo(Paciente, {foreignKey: 'id_paciente'});

// Relación directa para acceder a la medicación habitual del paciente
PacienteMedicacionHabitual.belongsTo(Medicacion, { foreignKey: 'id_medicacion', as: 'Medicacion' });

// Cirugías (Uno a Muchos)
Paciente.hasMany(PacienteCirugias, { foreignKey: 'id_paciente', as: 'cirugias' });
PacienteCirugias.belongsTo(Paciente, { foreignKey: 'id_paciente', as: 'paciente' });

// Enfermeria
Internacion.hasMany(EvaluacionIngreso, { foreignKey: 'ID_Internacion', as: 'evaluaciones_ingreso' });
EvaluacionIngreso.belongsTo(Internacion, { foreignKey: 'ID_Internacion' });
EvaluacionIngreso.belongsTo(Enfermero, { foreignKey: 'ID_Enfermero' });

Internacion.hasMany(EvolucionSignosVitales, { foreignKey: 'ID_Internacion', as: 'signos_vitales' });
EvolucionSignosVitales.belongsTo(Internacion, { foreignKey: 'ID_Internacion' });
EvolucionSignosVitales.belongsTo(Enfermero, { foreignKey: 'ID_Enfermero', as: 'enfermero' });

// Relación con Medicación Libre
Medicacion.hasMany(AdministracionMedicacion, { foreignKey: 'ID_Medicacion', as: 'administraciones' });
AdministracionMedicacion.belongsTo(Medicacion, { foreignKey: 'ID_Medicacion', as: 'medicamento_libre' });

// Relación directa con la Internación
Internacion.hasMany(AdministracionMedicacion, { foreignKey: 'ID_Internacion', as: 'historial_medicacion' });
AdministracionMedicacion.belongsTo(Internacion, { foreignKey: 'ID_Internacion', as: 'internacion' });

//Médico y Evoluciones
Internacion.hasMany(EvolucionMedica, { foreignKey: 'ID_Internacion', as: 'evoluciones_medicas' });
EvolucionMedica.belongsTo(Internacion, { foreignKey: 'ID_Internacion' });

Medico.hasMany(EvolucionMedica, { foreignKey: 'ID_Medico', as: 'evoluciones_realizadas' });
EvolucionMedica.belongsTo(Medico, { foreignKey: 'ID_Medico', as: 'medico' });


// Una Evolución genera Tratamientos
EvolucionMedica.hasMany(Tratamiento, { foreignKey: 'ID_EvolucionMedica', as: 'tratamientos' });
Tratamiento.belongsTo(EvolucionMedica, { foreignKey: 'ID_EvolucionMedica' });

// Un Tratamiento tiene medicamentos (Muchos a Muchos con detalles de dosis)
Tratamiento.belongsToMany(Medicacion, { through: TratamientoMedicacion, foreignKey: 'ID_Tratamiento', otherKey: 'ID_Medicacion', as: 'medicamentos_recetados' });
Medicacion.belongsToMany(Tratamiento, { through: TratamientoMedicacion, foreignKey: 'ID_Medicacion', otherKey: 'ID_Tratamiento' });
// Relación: Un Tratamiento tiene muchas medicaciones asociadas
Tratamiento.hasMany(TratamientoMedicacion, { foreignKey: 'ID_Tratamiento', as: 'medicaciones' });
TratamientoMedicacion.belongsTo(Tratamiento, { foreignKey: 'ID_Tratamiento', as: 'tratamiento_origen' });
// Relación: Esa tabla intermedia se conecta con el catálogo de Medicación
Medicacion.hasMany(TratamientoMedicacion, { foreignKey: 'ID_Medicacion', as: 'usos_en_tratamientos' });
TratamientoMedicacion.belongsTo(Medicacion, { foreignKey: 'ID_Medicacion', as: 'medicamento' });

// Administración de medicación (Enfermería ejecuta el tratamiento)
Tratamiento.hasMany(AdministracionMedicacion, { foreignKey: 'ID_Tratamiento', as: 'registros_administracion' });
AdministracionMedicacion.belongsTo(Tratamiento, { foreignKey: 'ID_Tratamiento' });
AdministracionMedicacion.belongsTo(Enfermero, { foreignKey: 'ID_Enfermero', as: 'enfermero'});
Enfermero.hasMany(AdministracionMedicacion, { foreignKey: 'ID_Enfermero', as: 'administraciones' });

// Turnos y Usuarios
Paciente.hasMany(Turno, { foreignKey: 'id_paciente', as: 'turnos' });
Turno.belongsTo(Paciente, { foreignKey: 'id_paciente', as: 'paciente' });

Medico.hasMany(Turno, { foreignKey: 'medico_id', as: 'turnos' });
Turno.belongsTo(Medico, { foreignKey: 'medico_id', as: 'medico' });

Usuario.hasOne(Medico, { foreignKey: 'ID_Usuario' });
Medico.belongsTo(Usuario, { foreignKey: 'ID_Usuario' });

Usuario.hasOne(Enfermero, { foreignKey: 'ID_Usuario' });
Enfermero.belongsTo(Usuario, { foreignKey: 'ID_Usuario' });

Especialidad.hasMany(Medico, { foreignKey: 'ID_especialidad' });
Medico.belongsTo(Especialidad, { foreignKey: 'ID_especialidad', as: 'especialidad' });


// Exportar todos los modelos
module.exports = {
  sequelize,
  Obra_Social,
  Plan,
  Habitacion,
  Cama,
  AlaHospital,
  Internacion,
  Paciente,
  Medico,
  Enfermero,
  Turno,
  Especialidad,
  Usuario,
  CatalogoAlergias,
  CatalogoPatologias,
  Medicacion,
  PacienteAlergias,
  PacienteEnfermedades,
  PacienteMedicacionHabitual,
  PacienteAntecedentesFamiliares,
  EvolucionSignosVitales,
  EvaluacionIngreso,
  EvolucionMedica,
  Tratamiento,
  TratamientoMedicacion,
  AdministracionMedicacion,
  PacienteCirugias
};