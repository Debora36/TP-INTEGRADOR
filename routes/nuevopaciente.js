const express = require('express');
const router = express.Router();


// Ruta GET del formulario
const registroController = require('../controller/registropaciente');


router.get('/', registroController.formularioPaciente);
router.post('/nuevopaciente', registroController.crearPaciente);

// Buscar paciente por DNI
router.get('/buscar/:dni', registroController.buscarPorDNI);
router.get('/:dni', registroController.buscarPorDNI);


module.exports = router;