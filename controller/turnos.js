const { Turno, Paciente, Medico } = require('../modelo');

exports.formularioTurnos = async (req, res) => {
  try {
  const medicos = await Medico.findAll();
  console.log('Médicos cargados:');
  res.render('recepcion', {
    medico: medicos,
    data: {}
  });

} catch (error) {
  console.error('Error al cargar datos del formulario:', error);
  res.status(500).send('Error al cargar formulario');
}
};


exports.crearTurno = async (req, res) => {
  try {
    const { dni_paciente, medico, fecha, hora } = req.body;
    
    const paciente = await Paciente.findOne({ where: { DNI: dni_paciente } });
    const medicoDB = await Medico.findByPk(medico);
    if (!paciente || !medicoDB) return res.status(404).send('Paciente o médico no encontrado');

    const nuevoTurno = await Turno.create({
      id_paciente: paciente.id,
      medico_id: medicoDB.id,
      fecha,
      hora
    });

    res.status(201).json(nuevoTurno);
  } catch (error) {
    console.error('Error al crear turno:', error);
    res.status(500).send('Error al crear turno');
  }
};

exports.verTurnosPorDNI = async (req, res) => {
  try {
    const { dni } = req.params;
    const paciente = await Paciente.findOne({ where: { DNI: dni } });

    if (!paciente) return res.status(404).send('Paciente no encontrado');

    const proximoTurno = await Turno.findOne({
      where: { id_paciente: paciente.id },
      include: [{ model: Medico }],
      order: [['fecha', 'ASC'], ['hora', 'ASC']]
    });

    if (!proximoTurno) return res.status(404).send('No se encontraron turnos');

    res.json(proximoTurno);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener turnos');
  }
};


exports.eliminarTurno = async (req, res) => {
  try {
    const { id } = req.params;
    await Turno.destroy({ where: { id: id } });
    res.redirect('/recepcionista');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar turno');
  }
};