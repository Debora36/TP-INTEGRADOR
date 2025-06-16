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
exports.crearPacienteUrgencia = async (req, res) => {
  try {
    // Generamos un DNI único temporal
    const dniFalso = Math.floor(10000000 + Math.random() * 90000000);
    const paciente = await Paciente.create({
      Nombre: 'Paciente',
      Apellido: 'Desconocido',
      DNI: dniFalso,
      Genero: 'H',
      FechaNacimiento: new Date(2000, 0, 1),
      Telefono: '+0000000000',
      Email: '',
      Contacto_emergencia: '+0000000000',
      Direccion: 'Desconocida',
      ID_Nacionalidad: 1  
    });

    res.json(paciente);
  } catch (error) {
    console.error('Error creando paciente de urgencia:', error);
    res.status(500).json({ error: 'Error creando paciente de urgencia' });
  }
};