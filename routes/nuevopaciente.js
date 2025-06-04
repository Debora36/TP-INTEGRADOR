const express = require('express');
const router = express.Router();


// Ruta GET del formulario
const registroController = require('../controller/registropaciente');


router.get('/registro', registroController.formularioPaciente);
router.post('/nuevopaciente', registroController.crearPaciente);


module.exports = router;