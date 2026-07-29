const express = require('express');
const router = express.Router();
const { verificarSesion, verificarRol } = require('../middleware/auth'); 
const recepcionistaController = require('../controller/recepcionistaController');

//aplico el middleware ruta por ruta
const proteger = [verificarSesion, verificarRol('Recepcionista')];

router.get('/recepcionista', proteger, recepcionistaController.mostrarRecepcion);
//Admisión de pacientes
router.get('/admision', proteger, recepcionistaController.formularioAdmision);
router.get('/admision/editar', proteger, recepcionistaController.editarDesdeModificar);
router.post('/admision/urgencia', proteger, recepcionistaController.crearPacienteUrgencia);

//Habitaciones y camas
router.get('/habitaciones/buscar', proteger, recepcionistaController.buscarHabitaciones);
router.post('/habitaciones/asignar-habitacion', proteger, recepcionistaController.asignarHabitacion);

//Buscar, modificar y eliminar internaciones
router.get('/Modificar', proteger, (req, res) => {
  res.render('modificar', {
    internaciones: [],
    alas: [],
    habitaciones: [],
    camas: []
  });
});
router.post('/Modificar/buscar', proteger, recepcionistaController.buscarInternaciones);
router.post('/Modificar/internacion/:id/eliminar', proteger, recepcionistaController.eliminarInternacion);


module.exports = router;