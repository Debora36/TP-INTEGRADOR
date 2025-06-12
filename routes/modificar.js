const express = require('express');
const router = express.Router();
const modificarController = require('../controller/modificarController');

router.get('/', (req, res) => {
  res.render('modificar', {
    internaciones: [],
    alas: [],
    habitaciones: [],
    camas: []
  });
});

router.post('/buscar', modificarController.buscarInternaciones);
router.post('/internacion/:id/editar', modificarController.editarInternacion);
router.post('/internacion/:id/eliminar', modificarController.eliminarInternacion);

module.exports = router;
