const { Habitacion, Cama, AlaHospital, Internacion, Paciente } = require('../modelo'); 
const { Op } = require('sequelize');

exports.buscarHabitaciones = async (req, res) => {
  const { ala, tipo_habitacion, genero } = req.query;
 
  try {
    const habitaciones = await Habitacion.findAll({
      where: {
        ID_ala_hospital: ala,
      },
      include: [
        {
          model: Cama,
          as: 'camas',
          include: [
            {
              model: Internacion,
              as: 'internacion',
              required: false,
              include: [
                {
                  model: Paciente,
                  as: 'paciente',
                  attributes: ['Genero'],
                  required: false,
                }
              ]
            }
          ]
        }
      ]
    });
    habitaciones.forEach(h => {
      console.log("Habitación:", h.Numero);
      h.camas.forEach(c => {
        console.log(" - Cama:", c.nombre, 
          "Tiene internación:", !!c.internacion, 
          "Paciente:", c.internacion?.paciente?.genero);
      });
    });
    
    const filtradas = habitaciones.filter(habitacion => {
      const camas = habitacion.camas;

      const libres = camas.filter(c => !c.internacion).length;
      const ocupadas = camas.filter(c => c.internacion);
      const tipoNum = parseInt(tipo_habitacion);
      if (tipoNum === 1 && habitacion.camas_disponibles === 1) {
        // Habitaciones simples: al menos una cama libre
        return libres >= 1;
      }

      if (tipoNum === 2 && habitacion.camas_disponibles === 2) {
        // Habitaciones dobles: misma lógica que antes
        if (libres === 2) return true;

        if (libres === 1 && ocupadas.length === 1) {
          const generoPaciente = ocupadas[0].internacion?.paciente?.Genero;
          return generoPaciente === genero;
        }

        return false;
      }

      return false;
    });

    const respuesta = filtradas.map(habitacion => ({
      ID: habitacion.ID,
      Numero: habitacion.Numero,
      camas: habitacion.camas.map(cama => ({
        ID: cama.ID,
        nombre: cama.nombre,
        disponible: !cama.internacion
      }))
    }));
    habitaciones.forEach(h => {
    console.log("Habitación:", h.Numero);
    h.camas.forEach(c => {
      const genero = c.internacion?.paciente?.genero;
      console.log(` - Cama: ${c.nombre}, paciente: ${genero ?? 'NO DEFINIDO'}`);
    });
  });
    res.json(respuesta);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al buscar habitaciones' });
  }
};

exports.asignarHabitacion = async (req, res) => {
  const { ID_Paciente, ID_Cama, modoEdicion, ID_internacion} = req.body;
  try {
    const cama = await Cama.findByPk(ID_Cama);
    if (!cama || !cama.disponible) {
      return res.status(400).json({ error: 'Cama no disponible' });
    }
    console.log('Insertando internación con:', {
      ID_Paciente,
      ID_Habitacion: cama.ID_Habitacion,
      ID_Cama,
      FechaIngreso: new Date()
    });
    if (modoEdicion === 'true' && ID_internacion) {
      // Modo edición: actualizar internación existente
      const internacion = await Internacion.findByPk(ID_internacion);
      if (!internacion) return res.status(404).json({ error: 'Internación no encontrada' });

      // Marcar la cama anterior como disponible en la base de datos
      const camaAnterior = await Cama.findByPk(internacion.ID_Cama);
      if (camaAnterior) {
        camaAnterior.disponible = true;
        await camaAnterior.save();
      }

      // Asignar la nueva cama
      internacion.ID_Cama = ID_Cama;
      internacion.ID_Habitacion = cama.ID_Habitacion;
      await internacion.save();

      cama.disponible = false;
      await cama.save();

      return res.json({ success: true, mensaje: 'Internación modificada correctamente.' });
    } else {
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
    }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al asignar habitación' });
    }
  };
