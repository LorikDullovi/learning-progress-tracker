const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateRegistration, validateLogin } = require('../middleware/validator');


router.post('/register', validateRegistration, authController.registerUser);
router.post('/login', validateLogin, authController.loginUser);

module.exports = router; 