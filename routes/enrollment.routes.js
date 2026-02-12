const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollment.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

//Student routes
router.post('/enroll/:courseId', enrollmentController.enrollInCourse);
router.get('/enrolled', enrollmentController.getEnrolledCourses);
router.delete('/unenroll/:courseId', enrollmentController.unenrollFromCourse);

//Admin routes
router.get('/course/:courseId', adminMiddleware, enrollmentController.getEnrolledStudents);

module.exports = router;
