const express = require('express');
const router = express.Router();
const { verificarSesion, verificarRol } = require('../middleware/auth');
router.use(verificarSesion);
router.use(verificarRol('Recepcionista'));
// Ruta GET del formulario
const registroController = require('../controller/registropaciente');


router.get('/', registroController.formularioPaciente);
router.post('/nuevopaciente', registroController.crearPaciente);

module.exports = router;