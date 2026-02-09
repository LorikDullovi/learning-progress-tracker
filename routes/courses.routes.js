const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/getAll', courseController.getAllCourses);
router.post('/add', authMiddleware, adminMiddleware, courseController.createCourse);
router.put('/update/:id', authMiddleware, adminMiddleware, courseController.updateCourse);
router.delete('/delete/:id', authMiddleware, adminMiddleware, courseController.deleteCourse);

module.exports = router;
