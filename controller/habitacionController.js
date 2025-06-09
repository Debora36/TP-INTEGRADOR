const { Habitacion, Cama, AlaHospital, Internacion, Paciente } = require('../modelo'); 
const { Op } = require('sequelize');

exports.buscarHabitaciones = async (req, res) => {
  const { ala, tipo, genero } = req.query;
  try {
    const habitaciones = await Habitacion.findAll({
      where: { ID_ala_hospital: ala },
      include: [
        {
          model: Cama,
          as: 'camas',
          where: { disponible: true },
          required: false
        },
        {
          model: AlaHospital,
          as: 'ala'
        }
      ]
    });

    res.json(habitaciones);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al buscar habitaciones' });
  }
};

exports.asignarHabitacion = async (req, res) => {
  console.log('Datos del body:', req.body);
  const { ID_Paciente, ID_Cama } = req.body;
  try {
    const cama = await Cama.findByPk(ID_Cama);
    console.log('Cama encontrada:', cama?.toJSON?.());
    if (!cama || !cama.disponible) {
      return res.status(400).json({ error: 'Cama no disponible' });
    }

    await Internacion.create({
      ID_Paciente,
      ID_Habitacion: cama.ID_Habitacion,
      ID_Cama,
      FechaIngreso: new Date(),
      FechaAlta: null
    });
    console.log('Internacion:', Internacion);
    cama.disponible = false;
    await cama.save();
    
    res.json({ success: true, mensaje: 'Internación registrada exitosamente.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al asignar habitación' });
  }
};
