// routes/paciente.js
const express = require('express');
const router = express.Router();
const registroController = require('../controller/registropaciente');

router.get('/:dni', registroController.buscarPorDNI); // /modelo/paciente/:dni
// Ruta para modificar paciente
router.post('/editar/:id', registroController.actualizarPaciente);

// Ruta para eliminar paciente
router.post('/eliminar/:id', registroController.eliminarPaciente);
module.exports = router;