const express = require('express');
const router = express.Router();
const authController = require('../controller/login');

router.post('/login', authController.login);

module.exports = router;