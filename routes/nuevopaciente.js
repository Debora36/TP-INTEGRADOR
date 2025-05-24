const express = require('express');
const router = express.Router();
const registroController = require('../controller/registropaciente');

router.get('/', registroController.formularioPaciente);
module.exports = router;