const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const { authMiddleware, adminMiddleware, studentMiddleware } = require('../middleware/authMiddleware');

//Student routes
router.post('/my-profile', authMiddleware, studentMiddleware, profileController.createMyProfile);
router.get('/my-profile', authMiddleware, studentMiddleware, profileController.getMyProfile);
router.put('/my-profile', authMiddleware, studentMiddleware, profileController.updateMyProfile);

//Admin routes
router.get('/all-profiles', authMiddleware, adminMiddleware, profileController.getAllProfiles);
router.get('/all-profiles/:id', authMiddleware, adminMiddleware, profileController.getProfileByUserId);

module.exports = router;
