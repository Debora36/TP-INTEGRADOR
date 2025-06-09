const express = require('express');
const router = express.Router();
const registroController = require('../controller/registroadmision');

router.get('/', registroController.formularioAdmision);
module.exports = router;
