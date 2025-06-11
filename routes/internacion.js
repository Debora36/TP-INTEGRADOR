// Buscar habitaciones disponibles por ala y tipo
router.get('/habitaciones/buscar', async (req, res) => {
    const { ala, tipo, genero } = req.query;

    try {
        const habitaciones = await Habitacion.findAll({
            where: {
                ID_ala_hospital: ala,
                camas_disponibles: { [Op.gt]: 0 } // Sequelize operator
            }
        });

        res.json(habitaciones);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar habitaciones' });
    }
});

// Asignar habitación (POST del form)
router.post('/asignar-habitacion', async (req, res) => {
    const { dni, habitacion_id, cama_id, fechaIngreso } = req.body;

    try {
        const paciente = await Paciente.findOne({ where: { DNI: dni } });
        if (!paciente) return res.status(404).send('Paciente no encontrado');

        // Crear la internación
        await Internacion.create({
            ID_Paciente: paciente.id,
            ID_Habitacion: habitacion_id,
            FechaIngreso: fechaIngreso || new Date(),
            FechaAlta: null
        });

        // Disminuir una cama
        const habitacion = await Habitacion.findByPk(habitacion_id);
        if (habitacion.camas_disponibles > 0) {
            habitacion.camas_disponibles -= 1;
            await habitacion.save();
        }

        res.redirect('/internaciones'); // O como manejes tus rutas
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al asignar habitación');
    }
});

module.exports = router;