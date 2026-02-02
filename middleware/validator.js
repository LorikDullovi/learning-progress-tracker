const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const validateRegistration = [
    body('username')
        .trim() 
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long')
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
        .trim()
        .isLength({min : 0}).withMessage('Age can not write negative'),
    
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

module.exports = { validateRegistration, validateLogin };