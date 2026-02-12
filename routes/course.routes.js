const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');


//Public routes
router.get('/', courseController.getAllCourses);

//Admin only routes
router.post('/create', authMiddleware, adminMiddleware, courseController.createCourse);
router.put('/update/:id', authMiddleware, adminMiddleware, courseController.updateCourse);
router.delete('/delete/:id', authMiddleware, adminMiddleware, courseController.deleteCourse);

module.exports = router;
