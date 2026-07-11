const express = require('express');
const router = express.Router();
const { verificarSesion, verificarRol } = require('../middleware/auth');
const turnoController = require('../controller/turnos');
const{formularioTurnos}= require('../controller/turnos');
router.use(verificarSesion);
router.use(verificarRol('Recepcionista'));
router.get('/formulario', formularioTurnos);
router.post('/crear', turnoController.crearTurno);
router.get('/buscar/:dni', turnoController.verTurnosPorDNI);
router.post('/presente/:id', turnoController.marcarComoPresente);

module.exports = router;