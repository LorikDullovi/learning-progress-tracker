const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const validateRegistration = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long')
        .escape(),

    body('surname')
        .trim()
        .notEmpty().withMessage('Surname is required')
        .isLength({ min: 2 }).withMessage('Surname must be at least 2 characters long')
        .escape(),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('password')
        .trim()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

    body('age')
        .isInt({ min: 0 }).withMessage('Age must be a positive number'),

    handleValidationErrors
];

const validateLogin = [
    body('email')
        .trim()
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required'),

    handleValidationErrors
];

const validateChangePassword = [
    body('oldPassword')
        .notEmpty().withMessage('Old Password is required'),

    body('newPassword')
        .isLength({ min: 8 }).withMessage('New Password must be at least 8 characters long'),

    handleValidationErrors
];

module.exports = { validateRegistration, validateLogin, validateChangePassword };