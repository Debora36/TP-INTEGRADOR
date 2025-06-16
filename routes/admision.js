const express = require('express');
const router = express.Router();
const registroController = require('../controller/registroadmision');
const { editarDesdeModificar } = require('../controller/registroadmision');
router.get('/', registroController.formularioAdmision);
router.get('/editar', editarDesdeModificar);
router.post('/urgencia', registroController.crearPacienteUrgencia);
module.exports = router;
