const { Internacion, Paciente, Cama, Habitacion, AlaHospital } = require('../modelo');

exports.buscarInternaciones = async (req, res) => {
  const { dni } = req.body;

  try {
    const paciente = await Paciente.findOne({ where: { DNI: dni } });
    
    if (!paciente) {
      return res.render('modificar', {
        internaciones: [],
        alas: [],
        habitaciones: [],
        camas: [],
        dni,
        mensajeError: 'El DNI no pertenece a un paciente registrado.'
      });
    }
    const internaciones = await Internacion.findAll({
        
      where: { ID_Paciente: paciente.id },
      attributes: ['ID', 'FechaIngreso', 'ID_Cama', 'ID_Habitacion'],
      include: [
        {
          model: Cama,
          as: 'cama',
          attributes: ['id', 'nombre']
        },
        {
          model: Habitacion,
          as: 'habitacion', 
          attributes: ['id', 'Numero', 'ID_ala_hospital'],
          include: [
            {
              model: AlaHospital,
              as: 'ala', 
              attributes: ['id', 'nombre_ala']
            }
          ]
        }
      ]
    });

    const alas = await AlaHospital.findAll({ attributes: ['id', 'nombre_ala'] });
    const habitaciones = await Habitacion.findAll({ attributes: ['id', 'numero'] });
    const camas = await Cama.findAll({ attributes: ['id', 'nombre'] });

    res.render('modificar', {
      internaciones,
      alas,
      habitaciones,
      camas,
      DNI: dni
    });
  } catch (error) {
    console.error('Error al buscar internaciones:', error);
    res.status(500).render('error', {
      mensaje: 'Error al buscar internaciones',
      error: error.message
    });
  }
};

exports.editarInternacion = async (req, res) => {
  const { id } = req.params;
  const { ID_Cama, ID_Habitacion, FechaIngreso } = req.body;

  try {
    const internacion = await Internacion.findOne({ where: { ID: id } });
    if (!internacion) return res.status(404).send('Internación no encontrada');
    await Cama.update(
      { disponible: true },
      { where: { ID: internacion.ID_Cama } }
    );
    internacion.ID_Cama = ID_Cama;
    internacion.ID_Habitacion = ID_Habitacion;
    internacion.FechaIngreso = FechaIngreso;
    await internacion.save();
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al editar internación:', error);
    res.status(500).send('Error del servidor');
  }
};

exports.eliminarInternacion = async (req, res) => {
  const { id } = req.params;
  try {
    const internacion = await Internacion.findOne({ where: { ID: id } });
    
    if (!internacion) {
      return res.status(404).send('Internación no encontrada');
    }

    // Liberar la cama asociada
    await Cama.update(
      { disponible: true },
      { where: { ID: internacion.ID_Cama } }
    );
    await Internacion.destroy({ where: { ID: id } });
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al eliminar internación:', error);
    res.status(500).send('Error al eliminar');
  }
};