const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollment.controller');
const { authMiddleware, adminMiddleware, studentMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

//Student routes
router.post('/enroll/:courseId', studentMiddleware, enrollmentController.enrollInCourse);
router.get('/enrolled', studentMiddleware, enrollmentController.getEnrolledCourses);
router.delete('/unenroll/:courseId', studentMiddleware, enrollmentController.unenrollFromCourse);

//Admin routes
router.get('/course/:courseId', adminMiddleware, enrollmentController.getEnrolledStudents);

module.exports = router;
