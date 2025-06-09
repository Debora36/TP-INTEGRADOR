const express = require('express');
const router = express.Router();


// Ruta GET del formulario
const registroController = require('../controller/registropaciente');


router.get('/', registroController.formularioPaciente);
router.post('/nuevopaciente', registroController.crearPaciente);

// Buscar paciente por DNI
//router.post('/buscar', registroController.buscarPorDNI);
router.get('/buscar/:dni', registroController.buscarPorDNI);
router.get('/:dni', registroController.buscarPorDNI);
// Editar paciente
//router.post('/editar/:id', registroController.guardarEdicionPaciente);

// Eliminar paciente
//router.post('/eliminar/:id', registroController.eliminarPaciente);

module.exports = router;