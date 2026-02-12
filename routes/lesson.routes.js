const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lesson.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');


// ============ STUDENT & ADMIN ROUTES ============
// GET /api/lessons/course/:courseId - Get all lessons for a specific course (any logged-in user)
router.get('/course/:courseId', authMiddleware, lessonController.getLessons);

// ============ ADMIN ONLY ROUTES ============
// POST /api/lessons/course/:courseId - Create a new lesson in a course (admin only)
router.post('/course/:courseId', authMiddleware, adminMiddleware, lessonController.createLesson);

// PUT /api/lessons/:id - Update a lesson by ID (admin only)
router.put('/update/:id', authMiddleware, adminMiddleware, lessonController.updateLesson);

// DELETE /api/lessons/:id - Delete a lesson by ID (admin only)
router.delete('/delete/:id', authMiddleware, adminMiddleware, lessonController.deleteLesson);

module.exports = router;
