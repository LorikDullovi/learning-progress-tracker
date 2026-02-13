const progressService = require('../services/progress.service');

const updateLessonProgress = async (req, res) => {
    try {
        const studentId = req.user.id;
        const lessonId = req.params.lessonId;
        const { status } = req.body;

        if (!['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const progress = await progressService.updateProgress(studentId, lessonId, status);
        res.status(200).json(progress);
    } catch (error) {
        if (error.message.includes('Only students') || error.message.includes('enrolled')) {
            return res.status(403).json({ message: error.message });
        }
        if (error.message.includes('not found')) {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

const getMyProgress = async (req, res) => {
    try {
        const studentId = req.user.id;

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
