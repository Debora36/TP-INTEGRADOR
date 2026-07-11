const express = require('express');
const router = express.Router();
const { verificarSesion, verificarRol } = require('../middleware/auth');
const habitacionController = require('../controller/habitacionController');
router.use(verificarSesion);
router.use(verificarRol('Recepcionista'));
router.get('/buscar', habitacionController.buscarHabitaciones);
router.post('/asignar-habitacion', habitacionController.asignarHabitacion);


module.exports = router;