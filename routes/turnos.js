const express = require('express');
const router = express.Router();
const turnoController = require('../controller/turnos');
const{formularioTurnos}= require('../controller/turnos');
router.get('/formulario', formularioTurnos);
router.post('/crear', turnoController.crearTurno);
router.get('/buscar/:dni', turnoController.verTurnosPorDNI);
router.post('/presente/:id', turnoController.marcarComoPresente);

module.exports = router;