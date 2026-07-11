const express = require('express');
const router = express.Router();
const { verificarSesion, verificarRol } = require('../middleware/auth');
const modificarController = require('../controller/modificarController');
router.use(verificarSesion);
router.use(verificarRol('Recepcionista'));
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
