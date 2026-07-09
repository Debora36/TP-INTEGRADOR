const express = require('express');
const router = express.Router();
const medicosController = require('../controller/medicosController'); 

// Cuando el médico entra a la sección principal
router.get('/', medicosController.buscarPacienteMedico);
router.get('/buscar', medicosController.buscarPacienteMedico);
router.post('/guardarEvolucion', medicosController.guardarEvolucion);
router.post('/cargarResultadoEstudio', medicosController.cargarResultadoEstudio);
router.get('/signos-vitales/:id', medicosController.verSignosVitales);
router.get('/medicacion-administrada/:id', medicosController.verMedicacionAdministrada);
router.get('/historial/:id', medicosController.verHistoriaGeneral);
router.post('/actualizarHistoria', medicosController.actualizarHistoria);
router.post('/cambiar-estado-tratamiento/:id', medicosController.cambiarEstadoTratamiento);

module.exports = router;