const progressService = require('../services/progress.service');

const updateLessonProgress = async (req, res) => {
    try {
        const studentId = req.user.id;
        const userRole = req.user.role;
        const lessonId = req.params.lessonId;
        const { status } = req.body;

        if (userRole === 'admin') {
            return res.status(403).json({ message: 'Admins are not allowed to track lesson progress.' });
        }

        if (!['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const progress = await progressService.updateProgress(studentId, lessonId, status);
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyProgress = async (req, res) => {
    try {
        const studentId = req.user.id;
        const userRole = req.user.role;

        if (userRole === 'admin') {
            return res.status(403).json({ message: 'Admins do not have course progress.' });
        }

        const progress = await progressService.getProgressByStudent(studentId);
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStudentProgressAdmin = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const progress = await progressService.getProgressByStudent(studentId);
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    updateLessonProgress,
    getMyProgress,
    getStudentProgressAdmin
};
