const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateRegistration, validateLogin, validateChangePassword } = require('../middleware/validator');
const { authMiddleware } = require('../middleware/authMiddleware');

// ============ PUBLIC ROUTES (No login required) ============
// POST /api/auth/register - Create a new user account
router.post('/register', validateRegistration, authController.registerUser);

// POST /api/auth/login - Login and get JWT token
router.post('/login', validateLogin, authController.loginUser);

// ============ PROTECTED ROUTES (Login required) ============
// POST /api/auth/change-password - Change your password (must be logged in)
router.post('/change-password', authMiddleware, validateChangePassword, authController.changePassword);


module.exports = router; 