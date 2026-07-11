// routes/paciente.js
const express = require('express');
const router = express.Router();
const { verificarSesion, verificarRol } = require('../middleware/auth');
const registroController = require('../controller/registropaciente');
router.use(verificarSesion);
router.use(verificarRol('Recepcionista'));
router.get('/:dni', registroController.buscarPorDNI); // /modelo/paciente/:dni
// Ruta para modificar paciente
router.post('/editar/:id', registroController.actualizarPaciente);

// Ruta para eliminar paciente
router.post('/eliminar/:id', registroController.eliminarPaciente);

// Ruta para asociar paciente a una internación
router.post('/asociarPaciente', registroController.asociarPaciente);
module.exports = router;