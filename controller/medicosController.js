const { sequelize, Medico, Enfermero, EvolucionMedica, EstudioDiagnostico, Tratamiento, TratamientoMedicacion, Internacion, Paciente, Obra_Social, Turno,
    Medicacion, EvolucionSignosVitales, AdministracionMedicacion, CatalogoAlergias, CatalogoPatologias, PacienteAntecedentesFamiliares, Plan, PacienteMedicacionHabitual, PacienteCirugias, Cama} = require('../modelo'); // Asegúrate de que la ruta a 'modelo' sea correcta
const { Op } = require('sequelize');


exports.buscarPacienteMedico = async (req, res) => {
    const { numeroDNI } = req.query; 

    try {
        const idUsuarioLogueado = req.session.usuario ? req.session.usuario.id_usuario : null;
        const medicoActual = await Medico.findOne({ where: { ID_Usuario: idUsuarioLogueado } });

        if (!medicoActual) {
            return res.status(403).send("Usuario no identificado como médico.");
        }

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); //Las 00:00:00 de hoy
        
        const manana = new Date(hoy);
        manana.setDate(manana.getDate() + 1); //Las 00:00:00 de mañana

        //Busco los turnos de este médico que sean de hoy
        const turnos = await Turno.findAll({
            where: { 
                medico_id: medicoActual.id,
                fecha: {
                    [Op.gte]: hoy,// Mayor a hoy a las 00:00
                    [Op.lt]: manana//menor a las 00:00 del otro dia
                },
            },
            include: [{ model: Paciente, as: 'paciente' }],
            order: [['hora', 'ASC']]
        });

        const catalogoMedicamentos = await Medicacion.findAll(); 

        //Para que no rompa cuando ingreso y todavia no puse el dni
        if (!numeroDNI || String(numeroDNI).trim() === "") {
            return res.render('medicos', { 
                usuario: req.session.usuario,
                paciente: null, 
                internacion: null,
                turnos: turnos, 
                evoluciones: [], 
                estudios: [],
                tratamientos: [],
                catalogoMedicamentos: catalogoMedicamentos,
                mensaje: null 
            });
        }
        //Busco la internacion activa del paciente con ese dni
        const internacion = await Internacion.findOne({
            where: { FechaAlta: null },
            include: [{
                model: Paciente,
                as: 'paciente',
                where: { DNI: numeroDNI },
                include: ['obra_social', 'plan_detalle'] 
            }]
        });

        if (!internacion) {
            return res.render('medicos', { 
                usuario: req.session.usuario,
                paciente: null, internacion: null, turnos: turnos,
                evoluciones: [], estudios: [], tratamientos: [],
                catalogoMedicamentos: catalogoMedicamentos,
                mensaje: `No hay ningún paciente internado con el DNI ${numeroDNI}.` 
            });
        }
        //busco las evoluciones, estudios y tratamientos asociados a esa internacion
        const evoluciones = await EvolucionMedica.findAll({
            where: { id_internacion: internacion.ID || internacion.id },
            order: [['fecha', 'DESC']]
        });
        //Extraigo los ids de las evoluciones para buscar estudios y tratamientos relacionados
        const idsEvoluciones = evoluciones.map(evo => evo.id);
        
        const estudios = await EstudioDiagnostico.findAll({
            where: { ID_EvolucionMedica: idsEvoluciones }
        });

       const tratamientos = await Tratamiento.findAll({
            where: { id_evolucion_medica: idsEvoluciones },
            include: [{
                model: TratamientoMedicacion,
                as: 'medicaciones',
                include: [{
                    model: Medicacion, 
                    as: 'medicamento'
                }]
            }]
        });

        res.render('medicos', { 
            usuario: req.session.usuario,
            paciente: internacion.paciente, 
            internacion: internacion, 
            turnos: turnos, 
            evoluciones: evoluciones, 
            estudios: estudios,       
            tratamientos: tratamientos,
            catalogoMedicamentos: catalogoMedicamentos,
            mensaje: req.query.mensaje || null
        });

    } catch (error) {
        console.error('Error fatal buscando paciente:', error);
        res.status(500).render('medicos', { 
            usuario: req.session.usuario, paciente: null, internacion: null, turnos: [],
            evoluciones: [], estudios: [], tratamientos: [], catalogoMedicamentos: [],
            mensaje: 'Error del servidor al buscar datos.' 
        });
    }
};

exports.cargarResultadoEstudio = async (req, res) => {
    const { id_estudio, resultado_estudio, dni_paciente } = req.body;
    try {
        await EstudioDiagnostico.update(
            { resultado: resultado_estudio },
            { where: { id: id_estudio } }
        );
        res.redirect(`/medicos/buscar?numeroDNI=${dni_paciente}&mensaje=Resultado del estudio guardado con éxito`);
    } catch (error) {
        console.error("Error al guardar resultado:", error);
        res.redirect(`/medicos/buscar?numeroDNI=${dni_paciente}&errores=Error al guardar el resultado`);
    }
};

exports.guardarEvolucion = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const {
            internacion_id,
            observaciones,
            diagnostico_evolutivo,
            plan_atencion,
            estudios,
            tratamientos
        } = req.body;

        //identifico al médico que está logueado
        const idUsuarioLogueado = req.session.usuario ? req.session.usuario.id_usuario : null;
        const medicoActual = await Medico.findOne({ 
            where: { ID_Usuario: idUsuarioLogueado },
            transaction: t
        });

        //creo la evolucion mnedica
        const nuevaEvolucion = await EvolucionMedica.create({
            id_internacion: internacion_id, 
            id_medico: medicoActual.id,     
            observaciones: observaciones,
            diagnostico_evolutivo: diagnostico_evolutivo, 
            plan_atencion: plan_atencion,
            fecha_hora: new Date()
        }, { transaction: t });//uso transaction para que si algo falla no se guarde nada

        //guardar estudios asociados a la evolucion
        if (estudios) {
            const listaEstudios = Object.values(estudios).map(item => ({//convierto el objeto en un array para iterar
                ID_EvolucionMedica: nuevaEvolucion.id,
                tipo_estudio: item.tipo,
                descripcion: item.descripcion
            }));
            // uso el metodo bulkCreate de sequalize para guardar todos los estudios de una vez
            await EstudioDiagnostico.bulkCreate(listaEstudios, { transaction: t });
        }

        //guardar tratamientos asociados a la evolucion
        if (tratamientos) {
            const arrayTratamientos = Object.values(tratamientos);
            
            for (const item of arrayTratamientos) {
                const nuevoTratamiento = await Tratamiento.create({
                    id_evolucion_medica: nuevaEvolucion.id,
                    descripcion: item.descripcion,
                    duracion: item.duracion || null, 
                    tipo_tratamiento: item.tipo 
                }, { transaction: t });

                // Si es farmacológico, guardar el medicamento
                if (item.tipo === 'Farmacológico' && item.med_id) {
                    await TratamientoMedicacion.create({
                        id_tratamiento: nuevoTratamiento.id,
                        id_medicacion: item.med_id,
                        dosis: item.dosis,             
                        frecuencia: item.frecuencia          
                    }, { transaction: t });
                }
            }
        }

        //confirmo la transacción
        await t.commit();
        
        const internacion = await Internacion.findByPk(internacion_id, {
            include: [{ model: Paciente, as: 'paciente' }] 
        });
        
        res.redirect(`/medicos/buscar?numeroDNI=${internacion.paciente.DNI}&mensaje=Evolución médica guardada correctamente`);

    } catch (error) {
        await t.rollback();
        console.error('Error fatal en transacción de evolución:', error);
        res.redirect(`/medicos?errores=Error interno al guardar los datos: ${error.message}`);
    }
};

exports.verSignosVitales = async (req, res) => {
    try {
        const idInternacion = req.params.id;
        
        //Datos de la internación y paciente
        const internacion = await Internacion.findByPk(idInternacion, {
            include: [{ model: Paciente, as: 'paciente' }]
        });

        if (!internacion) return res.status(404).send("Internación no encontrada");

        const signos = await EvolucionSignosVitales.findAll({
            where: { id_internacion: idInternacion },
            order: [['fecha_hora', 'DESC']]
        });

        res.render('medicos_signos_vitales', { 
            usuario: req.session.usuario, 
            internacion, 
            signos 
        });

    } catch (error) {
        console.error("Error al buscar signos vitales:", error);
        res.status(500).send("Error interno del servidor");
    }
};

exports.verMedicacionAdministrada = async (req, res) => {
    try {
        const idInternacion = req.params.id;
        
        const internacion = await Internacion.findByPk(idInternacion, {
            include: [{ model: Paciente, as: 'paciente' }]
        });

        if (!internacion) return res.status(404).send("Internación no encontrada");

        const medicaciones = await AdministracionMedicacion.findAll({
            where: { ID_Internacion: idInternacion },
            include: [
                { model: Medicacion, as: 'medicamento_libre' },
                { model: Enfermero, as: 'enfermero' }
            ],
            order: [['fecha_hora', 'DESC']],
        });

        res.render('medicos_medicacion_admin', { 
            usuario: req.session.usuario, 
            internacion, 
            medicaciones,
        });

    } catch (error) {
        console.error("Error al buscar medicación administrada:", error);
        res.status(500).send("Error interno del servidor");
    }
};

exports.cambiarEstadoTratamiento = async (req, res) => {
    try {
        const idTratamiento = req.params.id;
        const { nuevoEstado, dniPaciente } = req.body; 

        await Tratamiento.update(
            { estado: nuevoEstado },
            { where: { id: idTratamiento } }
        );

        res.redirect(`/medicos/buscar?numeroDNI=${dniPaciente}&mensaje=Tratamiento marcado como ${nuevoEstado}`);

    } catch (error) {
        console.error("Error al cambiar el estado del tratamiento:", error);
        const dni = req.body.dniPaciente || '';
        res.redirect(`/medicos/buscar?numeroDNI=${dni}&errores=Error al actualizar el tratamiento`);
    }
};

exports.verHistoriaGeneral = async (req, res) => {
    const idInternacion = req.params.id; 
    const { mensaje, errores } = req.query;

    try {
        const internacion = await Internacion.findByPk(idInternacion, {
            include: [{
                model: Paciente,
                as: 'paciente',
                include: [
                    { model: CatalogoAlergias, as: 'alergias' },
                    { model: CatalogoPatologias, as: 'patologias' },
                    { 
                        model: PacienteAntecedentesFamiliares, as: 'antecedentes_familiares',
                        include: [{ model: CatalogoPatologias, as: 'Patologia' }]
                    },
                    { 
                        model: PacienteMedicacionHabitual, as: 'medicacion_habitual',
                        include: [{ model: Medicacion, as: 'Medicacion' }]
                    },
                    { model: PacienteCirugias, as: 'cirugias' },
                    { model: Obra_Social, as: 'obra_social' },
                    { model: Plan, as: 'plan_detalle' } 
                ]
            }]
        });

        const todasAlergias = await CatalogoAlergias.findAll();
        const todasPatologias = await CatalogoPatologias.findAll();
        const listaMedicamentos = await Medicacion.findAll();

        res.render('medicos_historial', {
            usuario: req.session.usuario,
            internacion,
            paciente: internacion.paciente,
            todasAlergias,
            todasPatologias,
            listaMedicamentos: listaMedicamentos,
            mensaje: mensaje || null, 
            errores: errores || null
        });

    } catch (error) {
        console.error('Error al mostrar historial médico:', error);
        res.status(500).send('Error al cargar la historia clínica general');
    }
};

exports.actualizarHistoria = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id_internacion, id_paciente, medicamentos, antecedentes, alergias, patologias, cirugias } = req.body;
        const paciente = await Paciente.findByPk(id_paciente, { transaction: t });

        if (!paciente) {
            throw new Error("El paciente no fue encontrado en la base de datos.");
        }
        
        //Medicacion habitual
        await PacienteMedicacionHabitual.destroy({
            where: { id_paciente: id_paciente },
            transaction: t
        });

        if (medicamentos) {
            const listaParaGuardar = Object.values(medicamentos).map(item => ({
                id_paciente: id_paciente,
                id_medicacion: item.id,
                dosis_diaria: item.dosis,
                frecuencia: item.frecuencia
            }));
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

        if (cirugias) {
            const listaCirugias = Object.values(cirugias).map(item => ({
                id_paciente: id_paciente,
                cirugia: item.nombre,
                fecha: item.fecha ? item.fecha : null, 
                observaciones: item.observaciones ? item.observaciones : null
            }));
            await PacienteCirugias.bulkCreate(listaCirugias, { transaction: t });
        }
        
        await paciente.setAlergias(alergias || [], { transaction: t });
        await paciente.setPatologias(patologias || [], { transaction: t });
  
        await t.commit(); // Confirmo la transacción si todo sale bien
        
        res.redirect(`/medicos/historial/${id_internacion}?mensaje=Historia Actualizada Correctamente`);

    } catch (error) {
        await t.rollback();//Cancela el proceso en caso de error
  
        const rutaRedireccion = req.body.id_internacion 
            ? `/medicos/historia-general/${req.body.id_internacion}` 
            : '/medicos/buscar';
            
        res.redirect(`${rutaRedireccion}?errores=Error interno al guardar los datos`);
    }
};

exports.procesarAlta = async (req, res) => {
    const { id_internacion } = req.body;
    try {
        const internacion = await Internacion.findByPk(id_internacion);
        
        if (!internacion) {
            return res.status(404).send('Error: Internación no encontrada');
        }

        //asigno la fecha de alta
        internacion.FechaAlta = new Date();
        await internacion.save();

        //libero la cama
        if (internacion.ID_Cama) {
            const cama = await Cama.findByPk(internacion.ID_Cama);
            if (cama) {
                cama.disponible = 1;
                await cama.save();
            }
        }

        res.redirect('/medicos/buscar');

    } catch (error) {
        console.error('Error al procesar el alta médica:', error);
        res.status(500).send('Hubo un error al procesar el alta del paciente.');
    }
};