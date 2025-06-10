const express = require('express');
const router = express.Router();
const internacionController = require('../controller/internacionController');

router.get('/modificar', internacionController.listarInternaciones);
router.post('/:id/editar', internacionController.editarInternacion);
router.delete('/:id/eliminar', internacionController.eliminarInternacion);

module.exports = router;