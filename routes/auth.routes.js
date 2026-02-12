const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateRegistration, validateLogin, validateChangePassword } = require('../middleware/validator');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/register', validateRegistration, authController.registerUser);
router.post('/login', validateLogin, authController.loginUser);
router.post('/change-password', authMiddleware, validateChangePassword, authController.changePassword);


module.exports = router; 