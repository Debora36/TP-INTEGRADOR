//modelos necesarios
const express = require('express');
const router = express.Router();
const Habitacion = require('../modelo/habitacion');
const Cama = require('../modelo/cama');
const Ala = require('../modelo/ala_hospital');
const Internacion = require('../modelo/internacion');
const Paciente = require('../modelo/paciente');

// Asociación
Habitacion.hasMany(Cama, { foreignKey: 'ID_Habitacion' });
Cama.belongsTo(Habitacion, { foreignKey: 'ID_Habitacion' });
Habitacion.belongsTo(Ala, { foreignKey: 'ID_Ala' });

// GET /habitaciones/buscar
router.get('/habitaciones/buscar', async (req, res) => {
  try {
    const { ala, tipo, genero } = req.query;

    const habitaciones = await Habitacion.findAll({
      where: {
        ID_Ala: ala,
        tipo: tipo // 1 = simple, 2 = doble
      },
      include: [
        {
          model: Cama,
          where: {},
          required: false
        },
        {
          model: Ala
        }
      ]
    });

    const resultado = habitaciones.map(h => ({
      numero: h.numero,
      camas: h.camas.map(c => ({
        id: c.ID,
        codigo: c.codigo,
        disponible: c.disponible
      }))
    }));

    res.json(resultado);
  } catch (error) {
    console.error('Error en /habitaciones/buscar:', error);
    res.status(500).json({ error: 'Error al buscar habitaciones' });
  }
});

// POST /asignar-habitacion
router.post('/asignar-habitacion', async (req, res) => {
  try {
    const { dni, cama } = req.body;

    const paciente = await Paciente.findOne({ where: { DNI: dni } });
    if (!paciente) return res.status(404).send('Paciente no encontrado.');

    const camaSeleccionada = await Cama.findByPk(cama);
    if (!camaSeleccionada || !camaSeleccionada.disponible) {
      return res.status(400).send('La cama seleccionada no está disponible.');
    }

    // Crear registro de internación (simplificado)
    await Internacion.create({
      ID_Paciente: paciente.ID,
      ID_Cama: camaSeleccionada.ID,
      fecha_ingreso: new Date()
    });

    // Marcar cama como ocupada
    await camaSeleccionada.update({ disponible: false });

    res.redirect('/'); // Redirigir a donde necesites
  } catch (error) {
    console.error('Error en POST /asignar-habitacion:', error);
    res.status(500).send('Error al asignar cama');
  }
});

module.exports = router;
