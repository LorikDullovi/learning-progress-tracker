const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progress.controller');
const { authMiddleware, adminMiddleware, studentMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

//Student routes
router.post('/:lessonId', studentMiddleware, progressController.createLessonProgress);
router.get('/', studentMiddleware, progressController.getMyProgress);

//Admin routes      
router.get('/student/:studentId', adminMiddleware, progressController.getStudentProgressAdmin);

module.exports = router;
