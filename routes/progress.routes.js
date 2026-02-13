const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progress.controller');
const { authMiddleware, adminMiddleware, studentMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

//Student routes
router.post('/create/:lessonId', studentMiddleware, progressController.createLessonProgress);
router.put('/update/:lessonId', studentMiddleware, progressController.updateLessonProgress);
router.get('/', studentMiddleware, progressController.getMyProgress);

//Admin routes      
router.get('/student/:studentId', adminMiddleware, progressController.getStudentProgressAdmin);

module.exports = router;
