const { Internacion, Paciente, Cama, Obra_Social, Plan, Medicacion, Enfermero,
     PacienteAntecedentesFamiliares, PacienteAlergias, PacienteEnfermedades, 
     PacienteMedicacionHabitual, CatalogoAlergias, CatalogoPatologias, EvaluacionIngreso, 
     PacienteCirugias, AdministracionMedicacion, Tratamiento, TratamientoMedicacion, EvolucionMedica, Medico, sequelize} = require('../modelo');
const SignosVitales = require('../modelo/evolucion_signos_vitales');
// Buscar internación por número de cama
exports.buscarPorCama = async (req, res) => {
        const { numeroCama } = req.query;

        //Si entra por primera vez o el input está vacío
        if (!numeroCama || numeroCama.trim() === "") {
            return res.render('enfermeria', { 
                paciente: null, 
                internacion: null,
                numeroCama: '', 
                mensaje: null
            });
        }

        try {
            console.log(`Buscando cama: ${numeroCama}`);

            //Busca la cama por su el numero de cama
            const cama = await Cama.findOne({ where: { nombre: numeroCama } });

            if (!cama) {
                return res.render('enfermeria', { 
                    paciente: null, 
                    internacion: null,
                    numeroCama: numeroCama,
                    mensaje: `La cama ${numeroCama} no existe.`
                });
            }

            //Buscar internacion (sin fecha de alta)
            const internacion = await Internacion.findOne({
                where: { 
                    ID_Cama: cama.ID,
                    FechaAlta: null 
                },
                include: [
                    {
                        model: Paciente,
                        as: 'paciente',
                        include: [{ 
                            model: Obra_Social, 
                            as: 'obra_social'
                        }]
                    }
  
                ]
            });

            if (!internacion) {
                return res.render('enfermeria', { 
                    paciente: null, 
                    internacion: null,
                    numeroCama: numeroCama,
                    mensaje: `La cama ${numeroCama} está vacía.` 
                });
            }

            //Si se encontraron los datos de la internacion, renderizo la vista con los datos
            res.render('enfermeria', { 
                paciente: internacion.paciente, 
                internacion: internacion, 
                numeroCama: numeroCama,
                mensaje: null
            });

        } catch (error) {
            console.error('Error grave buscando cama:', error);
            res.status(500).render('enfermeria', { 
                paciente: null, 
                internacion: null,
                mensaje: 'Error del servidor al buscar datos.' 
            });
          }
  };

//Mostrar historial medico
exports.mostrarHistorialMedico = async (req, res) => {
  const { idInternacion } = req.params;
  const { mensaje, errores } = req.query;
  try {
  const internacion = await Internacion.findByPk(idInternacion, {
    include: [{
      model:Paciente,
      as: 'paciente',
      include: [
        {model: CatalogoAlergias, as: 'alergias'},
        {model: CatalogoPatologias, as: 'patologias'},
        {model: PacienteAntecedentesFamiliares, as:'antecedentes_familiares',
          include: [{ 
                model: CatalogoPatologias,
                as: 'Patologia'
            }]
        },
        {model: PacienteMedicacionHabitual, as:'medicacion_habitual',
          include:[{
            model: Medicacion,
            as: 'Medicacion'
          }]
        },
        { model: PacienteCirugias, as: 'cirugias' },
        {model: Obra_Social, as: 'obra_social'},
        {model: Plan, as: 'plan_detalle' } 
      ]
    }]
  });
  const todasAlergias = await CatalogoAlergias.findAll();
  const todasPatologias = await CatalogoPatologias.findAll();
  const listaMedicamentos = await Medicacion.findAll();

  res.render('historia', {
    internacion,
    paciente: internacion.paciente,
    todasAlergias,
    todasPatologias,
    listaMedicamentos: listaMedicamentos,
    mensaje: mensaje || null, 
    errores: errores || null
  });
}catch (error) {
    console.error('Error al mostrar historial médico:', error);
    res.status(500).send('Error al cargar formulario');
};
};

//Actualizar historia clínica
exports.actualizarHistoria = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id_internacion, id_paciente, medicamentos, antecedentes, alergias, patologias } = req.body;
        const paciente = await Paciente.findByPk(id_paciente, { transaction: t });

        if (!paciente) {
            throw new Error("El paciente no fue encontrado en la base de datos.");
        }
        
        //Medicacion habitual

        //Se borra lo viejo
        await PacienteMedicacionHabitual.destroy({ 
            where: { id_paciente: id_paciente },
            transaction: t
        });

        //si hay datos
        if (medicamentos) {
            const listaParaGuardar = Object.values(medicamentos).map(item => ({
                id_paciente: id_paciente,
                id_medicacion: item.id,
                dosis_diaria: item.dosis,
                frecuencia: item.frecuencia
            }));
            //bulkCreate para insertar varios registros de una vez
            await PacienteMedicacionHabitual.bulkCreate(listaParaGuardar, { transaction: t });
        }

        //Antecedentes familiares

        await PacienteAntecedentesFamiliares.destroy({ 
            where: { id_paciente: id_paciente },
            transaction: t 
        });

        if (antecedentes) {
            const listaAntecedentes = Object.values(antecedentes).map(item => ({
                id_paciente: id_paciente,
                id_patologia: item.id,
                parentesco: item.parentesco
            }));

            await PacienteAntecedentesFamiliares.bulkCreate(listaAntecedentes, { transaction: t });
        }

        //Cirugias previas
        await PacienteCirugias.destroy({ 
            where: { id_paciente: id_paciente },
            transaction: t 
        });

        const { cirugias } = req.body;

        if (cirugias) {
            const listaCirugias = Object.values(cirugias).map(item => ({
                id_paciente: id_paciente,
                cirugia: item.nombre,
                fecha: item.fecha ? item.fecha : null, 
                observaciones: item.observaciones ? item.observaciones : null
            }));
            await PacienteCirugias.bulkCreate(listaCirugias, { transaction: t });
        }
        
        //Actualiza las tablas intermedias de alergias y patologias
        await paciente.setAlergias(alergias || [], { transaction: t });
        await paciente.setPatologias(patologias || [], { transaction: t });
  
        await t.commit();// Si todo salió bien, confirmamos los cambios

        
        //redicciona con mensaje de exito
        res.redirect(`/enfermeria/historia/${id_internacion}?mensaje=Historia Actualizada Correctamente`);

    } catch (error) {
        await t.rollback();
        console.error('Error al actualizar historia:', error);
        
        // redirige con mensaje de error
        const rutaRedireccion = req.body.id_internacion 
            ? `/enfermeria/historia/${req.body.id_internacion}` 
            : '/enfermeria/buscar';
            
        res.redirect(`${rutaRedireccion}?errores=Error interno al guardar los datos`);
    }
};

//Mostrar formulario de evaluación inicial
exports.mostrarFormularioEvaluacion = async (req, res) => {
    const { idInternacion } = req.params;
    const { mensaje, errores } = req.query;
    try {
        //Buscar la internacion y el paciente
        const internacion = await Internacion.findByPk(idInternacion, {
            include: [{ 
                model: Paciente, 
                as: 'paciente',
                include: [
                    { model: CatalogoAlergias, as: 'alergias' },
                    { model: CatalogoPatologias, as: 'patologias' },
                    {model: Obra_Social, as: 'obra_social'},
                    {model: Plan, as: 'plan_detalle' }
                ]
            }]
        });
        if (!internacion) {
            return res.send("Error: No se encontró la internación");
        }

        const evaluacionExistente = await EvaluacionIngreso.findOne({
            where: { ID_Internacion: idInternacion }
        });

        const todasAlergias = await CatalogoAlergias.findAll();
        const todasPatologias = await CatalogoPatologias.findAll();

        //renderiza la vista
        res.render('evaluacion', {
            internacion: internacion,
            paciente: internacion.paciente,
            todasAlergias,
            todasPatologias,
            modoEdicion: !!evaluacionExistente,
            evaluacion: evaluacionExistente || {},
            mensaje: mensaje || null,
            errores: errores || null
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }
};

//Guardar evaluacion inicial
exports.guardarEvaluacionInicial = async (req, res) => {

    let t; 
    
    try {
        //transacción para asegurar que todas las operaciones relacionadas se completen correctamente
        t = await sequelize.transaction(); 

        //Recibo los datos del formulario
        const { 
            id_paciente, id_internacion, id_evaluacion, motivoIngreso,
            Sintomas, Prioridad, planCuidados, alergias, patologias
        } = req.body;

        const idUsuarioLogueado = req.session.usuario ? req.session.usuario.id_usuario : null;
        
        const enfermeroActual = await Enfermero.findOne({
            where: { ID_Usuario: idUsuarioLogueado },
            transaction: t
        });
        
        console.log("Enfermero actual encontrado:", enfermeroActual);
        
        if (!enfermeroActual) {
            await t.rollback();
            return res.status(403).send("Error: Tu usuario no tiene un perfil de enfermero asociado.");
        }

        const datosParaGuardar = {
            ID_Internacion: id_internacion,
            ID_Enfermero: enfermeroActual.id,
            Motivo_Principal: motivoIngreso,
            Sintomas_Desc: Sintomas,
            Prioridad: Prioridad,
            Plan_Cuidados_Preliminar: planCuidados || 'No especificado',
            Fecha_Hora: new Date() 
        };
        
        if (id_evaluacion) {
            // Modo edicion
            await EvaluacionIngreso.update(datosParaGuardar, {
                where: { ID: id_evaluacion },
                transaction: t
            });
        } else {
            // Modo creacion (la primera vez)
            await EvaluacionIngreso.create(datosParaGuardar, { 
                transaction: t
            });
        }

        if (id_paciente) {
            const paciente = await Paciente.findByPk(id_paciente, { transaction: t });
            
            if (paciente) {
                // Actualizo las tablas intermedias
                await paciente.setAlergias(alergias || [], { transaction: t });
                await paciente.setPatologias(patologias || [], { transaction: t });
                console.log("Alergias y Patologías del paciente actualizadas.");
            }
        } else {
            console.warn("No se proporcionó ID de paciente, no se actualizaron alergias ni patologías.");
        }
        
        // Guardar todo
        await t.commit();

        // Redirigir con msj éxito
        res.redirect(`/enfermeria/evaluacion/${id_internacion}?mensaje=Evaluacion Guardada`);

    } catch (error) {
        // Si algo falló, cancelo todo el borrador
        if (t) await t.rollback(); 
        console.error('Error al guardar evaluación:', error);
        
        // Volvemos a mostrar el formulario con los errores
        const todasAlergias = await CatalogoAlergias.findAll();
        const todasPatologias = await CatalogoPatologias.findAll();
        const internacion = await Internacion.findByPk(req.body.id_internacion, { include: ['paciente'] });

        res.render('evaluacion', {
            errores: ['Error al guardar: ' + error.message],
            internacion,
            paciente: internacion ? internacion.paciente : {},
            todasAlergias,
            todasPatologias,
            evaluacion: req.body, 
            modoEdicion: !!req.body.id_evaluacion
        });
    }
};


//GET mostrar formulario de signos vitales
exports.mostrarFormularioSignos = async (req, res) => {
    const {idInternacion} = req.params;
    const { mensaje, errores, edit} = req.query;
    try {
        //Busco la internación y los datos del paciente
        const internacion = await Internacion.findByPk(idInternacion, {
            include: [{ 
                model: Paciente, 
                as: 'paciente',
                include: [
                    {model: Obra_Social, as: 'obra_social'},
                    {model: Plan, as: 'plan_detalle' }
                ]
            }]
        });

        if (!internacion) {
            return res.status(404).send("Internación no encontrada");
        }
        
        const historialSignos = await SignosVitales.findAll({
            where: { id_internacion: idInternacion },
            order: [['fecha_hora', 'DESC']] //Los más recientes primero
        });

        let datosEdicion = {};
        if (edit) {
            const signoAEditar = await SignosVitales.findByPk(edit);
            if (signoAEditar) {
                datosEdicion = signoAEditar.toJSON();
                
                //Separo la cadena de observaciones para que los <select> de la vista se marquen solos
                if (datosEdicion.observaciones) {
                    const partes = datosEdicion.observaciones.split(' | ');
                    if (partes.length === 2) {
                        // Limpiamos los textos para quedarnos solo con el valor exacto
                        datosEdicion.color_piel = partes[0].replace('Piel: ', '').trim();
                        datosEdicion.respuesta_estimulos = partes[1].replace('Estímulos: ', '').trim();
                    }
                }
            }
        }

        //Renderizo la vista con los signos, si no hay le paso un array vacio
        res.render('signos-vitales', { 
            internacion: internacion,
            paciente: internacion.paciente,
            historialSignos: historialSignos || [] ,
            mensaje: mensaje || null,
            errores: errores ? [errores] : null,

            // Variables para rellenar el formulario
            id_signos: datosEdicion.id || '',
            presion_arterial: datosEdicion.presion_arterial || '',
            frecuencia_cardiaca: datosEdicion.frecuencia_cardiaca || '',
            frecuencia_respiratoria: datosEdicion.frecuencia_respiratoria || '',
            temperatura: datosEdicion.temperatura || '',
            color_piel: datosEdicion.color_piel || '',
            respuesta_estimulos: datosEdicion.respuesta_estimulos || ''
        });

    } catch (error) {
        console.error("Error al cargar signos vitales:", error);
        res.status(500).send("Error al cargar el formulario de Signos Vitales.");
    }
};

// POST Guardar signos
exports.guardarSignos = async (req, res) => {
    try {
        //recibo los datos del formulario
        const { 
            internacion_id, 
            id_signos, 
            presion_arterial, 
            frecuencia_cardiaca, 
            frecuencia_respiratoria, 
            temperatura, 
            color_piel, 
            respuesta_estimulos 
        } = req.body;

        if (!req.session.usuario) {
            return res.status(401).send("Debes iniciar sesión.");
        }
        // Validación
        if (!/^\d+$/.test(frecuencia_cardiaca)) {
            return res.redirect(`/enfermeria/signos/${internacion_id}?errores=La frecuencia cardíaca debe ser un número entero.`);
        }
        if (frecuencia_respiratoria && !/^\d+$/.test(frecuencia_respiratoria)) {
            return res.redirect(`/enfermeria/signos/${internacion_id}?errores=La frecuencia respiratoria debe ser un número entero.`);
        }
        if (!/^\d+(\.\d+)?$/.test(temperatura)) {
            return res.redirect(`/enfermeria/signos/${internacion_id}?errores=La temperatura debe ser un número válido.`);
}
        const idUsuarioLogueado = req.session.usuario.id_usuario;

        //Busco el ID_Enfermero asociado a este usuario
        const enfermeroActual = await Enfermero.findOne({
            where: { id_usuario: idUsuarioLogueado }
        });

        
        const datosParaBD = {
            id_internacion: internacion_id,
            id_enfermero: enfermeroActual.id,
            fecha_hora: new Date(),
            presion_arterial: presion_arterial || null,       
            frecuencia_cardiaca: frecuencia_cardiaca || null,
            frecuencia_respiratoria: frecuencia_respiratoria || null,
            temperatura: temperatura || null,
            // Concateno las opciones del select
            observaciones: `Piel: ${color_piel || 'N/A'} | Estímulos: ${respuesta_estimulos || 'N/A'}`
        };
        
        //Guardar o actualizar
        if (id_signos && id_signos !== '') {
            await SignosVitales.update(datosParaBD, { where: { id: id_signos } });
        } else {
            await SignosVitales.create(datosParaBD);
        }

        res.redirect(`/enfermeria/signos/${internacion_id}?mensaje=SignosVitalesGuardada`);
        
    } catch (error) {
        console.error("ERROR AL GUARDAR SIGNOS:", error);
        res.status(500).send("Error al guardar: " + error.message);
    }
};

// Eliminar un registro de signos vitales
exports.eliminarSignos = async (req, res) => {
    const { id } = req.params; // Atrapamos el ID del signo vital desde la URL
    const { internacion_id } = req.body; // Atrapamos el ID de internación para poder volver

    try {
        // Ejecutamos el borrado directo en la base de datos
        await SignosVitales.destroy({
            where: { id: id }
        });

        // Redirigimos con un mensaje de éxito por la URL
        res.redirect(`/enfermeria/signos/${internacion_id}?mensaje=Registro eliminado correctamente`);

    } catch (error) {
        console.error('Error al eliminar signos vitales:', error);
        
        // Si falla, volvemos enviando el error
        res.redirect(`/enfermeria/signos/${internacion_id || ''}?errores=No se pudo eliminar el registro`);
    }
};

// Mostrar formulario medicacion
exports.mostrarAdministracion = async (req, res) => {
    const { idInternacion } = req.params;
    const { mensaje, errores, edit} = req.query;

    try {

        const internacion = await Internacion.findByPk(idInternacion, {
            include: [{ 
                model: Paciente, 
                as: 'paciente',
                include: [
                    {model: Obra_Social, as: 'obra_social'},
                    {model: Plan, as: 'plan_detalle' }
                ]
            }]
        });

        if (!internacion) {
            return res.status(404).send("Internación no encontrada");
        }


        const evaluacion = await EvaluacionIngreso.findOne({
            where: { ID_Internacion: idInternacion }
        });

        const evoluciones = await EvolucionMedica.findAll({
            where: { id_internacion: internacion.ID || internacion.id } // Asegurate de usar el ID correcto
        });
        const idsEvoluciones = evoluciones.map(evo => evo.id);

        const tratamientos = await Tratamiento.findAll({
            where: { 
                id_evolucion_medica: idsEvoluciones,
                estado: 'Activo'
            },
            include: [
                {
                    model: TratamientoMedicacion,
                    as: 'medicaciones', 
                    include: [{ model: Medicacion, as: 'medicamento' }]
                },
                {
                    model: Medico,
                    as: 'medico' 
                }
            ]
        });


        const catalogoMedicamentos = await Medicacion.findAll();

        const historial = await AdministracionMedicacion.findAll({
            where: { ID_Internacion: idInternacion },
            include: [
                { model: Enfermero, as: 'enfermero' },
                { model: Medicacion, as: 'medicamento_libre' }
            ],
            order: [['Fecha_Hora', 'DESC']]
        });

        // LÓGICA DE EDICIÓN
        let datosEdicion = {};
        if (edit) {
            const registroAEditar = await AdministracionMedicacion.findByPk(edit);
            if (registroAEditar) datosEdicion = registroAEditar.toJSON();
        }

        res.render('administrar_medicacion', {
            internacion,
            paciente: internacion.paciente,
            evaluacion,
            tratamientos,
            catalogoMedicamentos,
            historial,
            mensaje: mensaje || null,
            errores: errores ? [errores] : null,
            
            // Variables para rellenar el formulario
            id_administracion: datosEdicion.id || '',
            tipo_administracion: datosEdicion.tipo_administracion || '',
            ID_Medicacion: datosEdicion.ID_Medicacion || '',
            dosis_aplicada: datosEdicion.dosis_aplicada || '',
            notas: datosEdicion.notas || ''
        });

    } catch (error) {
        console.error('Error al cargar la vista de administración:', error);
        res.status(500).send("Error del servidor al cargar los datos.");
    }
};


//GUARDAR NUEVA ADMINISTRACIÓN DE MEDICACIÓN
exports.guardarAdministracion = async (req, res) => {

    const { 
        id_administracion,
        internacion_id, 
        tipo_administracion, 
        ID_Medicacion, 
        dosis_aplicada, 
        notas 
    } = req.body;

    try {
        const idUsuarioLogueado = req.session.usuario ? req.session.usuario.id_usuario : null;
        const enfermeroActual = await Enfermero.findOne({ where: { ID_Usuario: idUsuarioLogueado } });
        
        if (!enfermeroActual) {
            return res.redirect(`/enfermeria/administrar/${internacion_id}?errores=Tu usuario no es un enfermero válido.`);
        }

        const datosParaBD = {
            ID_Internacion: internacion_id,
            id_enfermero: enfermeroActual.id,
            ID_Medicacion: ID_Medicacion,
            tipo_administracion: tipo_administracion, 
            dosis_aplicada: dosis_aplicada,
            notas: notas,
            fecha_hora: new Date()
        };

        // ACTUALIZAR O CREAR
        if (id_administracion && id_administracion !== '') {
            delete datosParaBD.fecha_hora; //mantengo la fecha
            await AdministracionMedicacion.update(datosParaBD, { where: { id: id_administracion } });
            return res.redirect(`/enfermeria/administrar/${internacion_id}?mensaje=Registro actualizado con éxito`);
        } else {
            await AdministracionMedicacion.create(datosParaBD);
        }
        return res.redirect(`/enfermeria/administrar/${internacion_id}?mensaje=Medicación registrada con éxito`);


    } catch (error) {
        console.error('Error al guardar la administración:', error);
        res.redirect(`/enfermeria/administrar/${internacion_id}?errores=Error interno al guardar el registro`);
    }
};

// Eliminar un registro de medicacion administrada
exports.eliminarRegistro = async (req, res) => {
    const { id } = req.params;
    const { internacion_id } = req.body;

    try {
        //borrado directo en la base de datos
        await AdministracionMedicacion.destroy({
            where: { id: id }
        });

        res.redirect(`/enfermeria/administrar/${internacion_id}?mensaje=Registro eliminado correctamente`);

    } catch (error) {
        console.error('Error al eliminar administración de medicación:', error);
        
        // Si falla, volvemos enviando el error
        res.redirect(`/enfermeria/administrar/${internacion_id || ''}?errores=No se pudo eliminar el registro`);
    }
};

