const express = require('express');
const router = express.Router();
const habitacionController = require('../controller/habitacionController');

router.get('/buscar', habitacionController.buscarHabitaciones);
router.post('/asignar-habitacion', habitacionController.asignarHabitacion);


module.exports = router;