const express = require('express');
const router = express.Router();
const { verificarSesion, verificarRol } = require('../middleware/auth');
const enfermeriaController = require('../controller/enfermeriaController');
router.use(verificarSesion);
router.use(verificarRol('Enfermero'));
router.get('/buscar', enfermeriaController.buscarPorCama);


router.post('/historia/actualizar', enfermeriaController.actualizarHistoria);
router.get('/historia/:idInternacion', enfermeriaController.mostrarHistorialMedico);

router.post('/guardarEvaluacion', enfermeriaController.guardarEvaluacionInicial);
router.get('/evaluacion/:idInternacion', enfermeriaController.mostrarFormularioEvaluacion);

router.get('/signos/:idInternacion', enfermeriaController.mostrarFormularioSignos);
router.post('/guardarSignos', enfermeriaController.guardarSignos);
router.post('/signos/eliminar/:id', enfermeriaController.eliminarSignos);

router.get('/administrar/:idInternacion', enfermeriaController.mostrarAdministracion);

router.post('/guardarAdministracion', enfermeriaController.guardarAdministracion);
router.post('/administrar/eliminar/:id', enfermeriaController.eliminarRegistro);
module.exports = router;