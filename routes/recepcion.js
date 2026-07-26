const express = require('express');
const router = express.Router();
const { verificarSesion, verificarRol } = require('../middleware/auth'); 
const recepcionistaController = require('../controller/recepcionistaController');

router.use(verificarSesion);
router.use(verificarRol('Recepcionista'));

router.get('/', recepcionistaController.mostrarRecepcion);

module.exports = router;