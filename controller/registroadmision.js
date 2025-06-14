const { Paciente, Internacion, Cama, Habitacion} = require('../modelo');
const Ala = require('../modelo/ala_hospital');

exports.formularioAdmision = async (req, res) => {
  try {
    const alas = await Ala.findAll();
    res.render('admision', {
        ala_hospital: alas
    });
  } catch (error) {
    console.error('Error al cargar datos:', error);
    res.status(500).send('Error al cargar formulario');
  }
};
exports.editarDesdeModificar = async (req, res) => {
  try {
    const dni = req.query.dni;
    const fecha = req.query.fecha;
    if (!dni) return res.status(400).send("DNI no especificado.");

    const paciente = await Paciente.findOne({ where: { DNI: dni } });
    if (!paciente) return res.status(404).send("Paciente no encontrado.");

    const internacion = await Internacion.findOne({
      where: { ID_Paciente: paciente.id, FechaIngreso: fecha, FechaAlta: null },
      include: [
        {
          model: Paciente,
          as: 'paciente'
        },
        {
          model: Cama,
          as: 'cama',
          include: [
            {
              model: Habitacion,
              as: 'habitacion',
              include: [
                {
                  model: Ala,
                  as: 'ala',
                }
              ]
            }
          ]
        }
      ]
    });
    console.log("Internación encontrada:", internacion?.toJSON?.());
    if (!internacion) return res.status(404).send("Internación no encontrada.");

    const alas = await Ala.findAll();

    res.render('admision', {
      ala_hospital: alas,
      paciente: paciente,
      internacion: internacion,
      cama: internacion.cama,
      habitacion: internacion.cama.habitacion,
      ala: internacion.cama.habitacion.ala,
      modoEdicion: true
    });
  } catch (error) {
    console.error('Error en editarDesdeModificar:', error);
    res.status(500).send("Error al cargar datos para edición.");
  }
};