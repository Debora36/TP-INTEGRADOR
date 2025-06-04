const express = require('express');
const router = express.Router();
const PlanObraSocial = require('../modelo/plan_obra_social');

router.get('/api/planes/:obraId', async (req, res) => {
  try {
    const planes = await PlanObraSocial.findAll({
      where: { obra_social_id: req.params.obraId },
      attributes: ['id', 'nombre_plan']
    });
    res.json(planes);
  } catch (error) {
    console.error('Error al obtener los planes:', error);
    res.status(500).json({ error: 'Error al obtener los planes' });
  }
});

module.exports = router;