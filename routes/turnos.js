const express = require('express');
const router = express.Router();
const turnoController = require('../controller/turnos');
const{formularioTurnos}= require('../controller/turnos');
router.get('/formulario', formularioTurnos);
router.post('/crear', turnoController.crearTurno);
router.get('/buscar/:dni', turnoController.verTurnosPorDNI);
router.post('/eliminar/:id', turnoController.eliminarTurno);

module.exports = router;