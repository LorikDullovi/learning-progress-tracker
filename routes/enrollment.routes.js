const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollment.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authMiddleware);

// ============ STUDENT ROUTES ============
// POST /api/enrollments/:courseId - Enroll in a course (student enrolls themselves)
router.post('/enroll/:courseId', enrollmentController.enrollInCourse);

// GET /api/enrollments - Get all my enrolled courses (see what courses I'm enrolled in)
router.get('/enrolled', enrollmentController.getEnrolledCourses);

// DELETE /api/enrollments/:courseId - Unenroll from a course (leave a course)
router.delete('/unenroll/:courseId', enrollmentController.unenrollFromCourse);

// ============ ADMIN ROUTES ============
// GET /api/enrollments/course/:courseId - Get all students enrolled in a specific course (Admin Only)
router.get('/course/:courseId', adminMiddleware, enrollmentController.getEnrolledStudents);

module.exports = router;
