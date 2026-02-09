const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// ============ STUDENT ROUTES (Login Required) ============
// POST /api/profiles/me - Create my profile
router.post('/me', authMiddleware, profileController.createMyProfile);

// GET /api/profiles/me - Get my own profile
router.get('/me', authMiddleware, profileController.getMyProfile);

// PUT /api/profiles/me - Update my own profile
router.put('/me', authMiddleware, profileController.updateMyProfile);

// ============ ADMIN ONLY ROUTES ============
// GET /api/profiles - Get all profiles (admin only)
router.get('/', authMiddleware, adminMiddleware, profileController.getAllProfiles);

// GET /api/profiles/:userId - Get ANY user's profile by their ID (admin only)
// Note: Students cannot access this. They must use /me
router.get('/:userId', authMiddleware, adminMiddleware, profileController.getProfileByUserId);

module.exports = router;
