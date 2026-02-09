const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');


// ============ PUBLIC ROUTES ============
// GET /api/courses - Get all available courses (No login required)
router.get('/', courseController.getAllCourses);

// ============ ADMIN ONLY ROUTES ============
// POST /api/courses - Create a new course (admin only)
router.post('/create', authMiddleware, adminMiddleware, courseController.createCourse);

// PUT /api/courses/:id - Update a course by ID (admin only)
router.put('/update/:id', authMiddleware, adminMiddleware, courseController.updateCourse);

// DELETE /api/courses/:id - Delete a course by ID (admin only)
router.delete('/delete/:id', authMiddleware, adminMiddleware, courseController.deleteCourse);

module.exports = router;
