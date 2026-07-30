const {sequelize, Medico, Paciente, Internacion, Cama, Habitacion, AlaHospital, EvaluacionIngreso, EvolucionMedica, EvolucionSignosVitales, AdministracionMedicacion} = require('../modelo');

exports.mostrarRecepcion = async (req, res) => {
    try {
        const medicos = await Medico.findAll({ order: [['nombre', 'ASC']] });
        res.render('recepcion', { medicos });
    } catch (error) {
        console.error('Error al cargar médicos:', error);
        res.status(500).send('Error al cargar la vista de recepción');
    }
};

//registrar admision/internacion
exports.formularioAdmision = async (req, res) => {
  try {
    const alas = await AlaHospital.findAll();
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
    if (!dni) return res.redirect('/modificar?mensajeError=DNI no especificado.');

    const paciente = await Paciente.findOne({ where: { DNI: dni } });
    if (!paciente) return res.redirect('/modificar?mensajeError=Paciente no encontrado.');

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
                  model: AlaHospital,
                  as: 'ala',
                }
              ]
            }
          ]
        }
      ]
    });
    console.log("Internación encontrada:", internacion?.toJSON?.());
    if (!internacion) return res.redirect('/modificar?mensajeError=Esa internación ya fue dada de alta y no se puede editar.');

    const alas = await AlaHospital.findAll();

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
    res.redirect('/modificar?mensajeError=Error al cargar los datos para editar.');
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

//modificar internaciones
exports.buscarInternaciones = async (req, res) => {
  const { dni } = req.body;

  try {
    const alas = await AlaHospital.findAll({ attributes: ['id', 'nombre_ala'] });
    const habitaciones = await Habitacion.findAll({ attributes: ['id', 'numero'] });
    const camas = await Cama.findAll({ attributes: ['id', 'nombre'] });
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
      order: [['FechaIngreso', 'DESC']],  
      where: { ID_Paciente: paciente.id },
      attributes: ['ID', 'FechaIngreso', 'ID_Cama', 'FechaAlta'],
      include: [
        {
          model: Cama,
          as: 'cama',
          attributes: ['id', 'nombre'],
          include: [
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
        }
      ]
    });
    if (internaciones.length <= 0) {
      return res.render('modificar', {
        internaciones: [],
        alas,
        habitaciones,
        camas,
        DNI: dni,
        mensajeError: 'El paciente no tiene internaciones registradas.'
      });
    }

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
exports.eliminarInternacion = async (req, res) => {
  const { id } = req.params;
  const confirmar = req.query.confirmar === 'true';
  const t = await sequelize.transaction();

  try {
    const internacion = await Internacion.findOne({ where: { ID: id }, transaction: t });
    if (!internacion) {
      await t.rollback();
      return res.status(404).send('Internación no encontrada');
    }

    const [evaluaciones, evoluciones, signosVitales, administraciones] = await Promise.all([
      EvaluacionIngreso.count({ where: { ID_Internacion: id }, transaction: t }),
      EvolucionMedica.count({ where: { ID_Internacion: id }, transaction: t }),
      EvolucionSignosVitales.count({ where: { ID_Internacion: id }, transaction: t }),
      AdministracionMedicacion.count({ where: { ID_Internacion: id }, transaction: t })
    ]);

    const tieneRegistrosClinicos = evaluaciones > 0 || evoluciones > 0 || signosVitales > 0 || administraciones > 0;

    if (tieneRegistrosClinicos && !confirmar) {
      await t.rollback();
      return res.status(409).json({
        requiereConfirmacion: true,
        detalle: {
          evaluacionesIngreso: evaluaciones,
          evolucionesMedicas: evoluciones,
          signosVitales: signosVitales,
          administracionesMedicacion: administraciones
        }
      });
    }

    await Cama.update(
      { disponible: true },
      { where: { ID: internacion.ID_Cama }, transaction: t }
    );
    await Internacion.destroy({ where: { ID: id }, transaction: t });

    await t.commit();
    res.sendStatus(200);
  } catch (error) {
    await t.rollback();
    console.error('Error al eliminar internación:', error);
    res.status(500).send('Error al eliminar');
  }
};

//buscar y asignar habitaciones

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
              where: { FechaAlta: null },
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
    res.json(respuesta);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al buscar habitaciones' });
  }
};

exports.asignarHabitacion = async (req, res) => {
  const { ID_Paciente, ID_Cama, modoEdicion, ID_internacion} = req.body;
  const t = await sequelize.transaction();
  try {
    const cama = await Cama.findByPk(ID_Cama, { transaction: t });
    if (!cama || !cama.disponible) {
      await t.rollback();
      return res.status(400).json({ error: 'Cama no disponible' });
    }

    if (modoEdicion === 'true' && ID_internacion) {
      // Modo edición: actualizar internación existente
      const internacion = await Internacion.findByPk(ID_internacion, { transaction: t });
      if (!internacion) {
        await t.rollback();
        return res.status(404).json({ error: 'Internación no encontrada' });
      }

      // Marco la cama anterior como disponible
      await Cama.update(
        { disponible: true },
        { where: { id: internacion.ID_Cama }, transaction: t }
      );

      // Asigno la nueva cama a la internación
      await internacion.update(
        { ID_Cama},
        { transaction: t }
      );

      // Ocupo la cama nueva
      await cama.update({ disponible: false }, { transaction: t });

      await t.commit();
      return res.json({ success: true, mensaje: 'Internación modificada correctamente.' });
    } else {
      const nuevaInternacion = await Internacion.create({
        ID_Paciente,
        ID_Cama,
        FechaIngreso: new Date(),
        FechaAlta: null
      }, { transaction: t });

      await cama.update({ disponible: false }, { transaction: t });

      await t.commit();
      return res.json({ success: true, mensaje: 'Internación registrada exitosamente.', id: nuevaInternacion.ID });
    }
  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ error: 'Error al asignar habitación' });
  }
};