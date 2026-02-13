const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lesson.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

//Student routes
router.get('/course/:courseId', authMiddleware, lessonController.getLessons);

//Admin routes
router.post('/create/:courseId', authMiddleware, adminMiddleware, lessonController.createLesson);
router.put('/update/:id', authMiddleware, adminMiddleware, lessonController.updateLesson);
router.delete('/delete/:id', authMiddleware, adminMiddleware, lessonController.deleteLesson);

module.exports = router;
