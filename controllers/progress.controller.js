const progressService = require('../services/progress.service');

const createLessonProgress = async (req, res) => {
    try {
        const studentId = req.user.id;
        const lessonId = req.params.lessonId;
        const { status } = req.body;

        if (!['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const progress = await progressService.createProgress(studentId, lessonId, status);
        res.status(201).json(progress);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

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
        res.status(400).json({ message: error.message });
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
    createLessonProgress,
    updateLessonProgress,
    getMyProgress,
    getStudentProgressAdmin
};
