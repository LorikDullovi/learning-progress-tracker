const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progress.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authMiddleware);

// ============ STUDENT ROUTES ============
// POST /api/progress/:lessonId - Mark a lesson as completed or update progress status
router.post('/:lessonId', progressController.updateLessonProgress);

// GET /api/progress - Get all my lesson progress (see which lessons I've completed)
router.get('/', progressController.getMyProgress);

// ============ ADMIN ONLY ROUTES ============
// GET /api/progress/student/:studentId - View a specific student's progress (admin only)
router.get('/student/:studentId', adminMiddleware, progressController.getStudentProgressAdmin);

module.exports = router;
