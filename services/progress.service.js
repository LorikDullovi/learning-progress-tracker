const Progress = require('../models/Progress');
const Users = require('../models/Users');

const updateProgress = async (studentId, lessonId, status) => {
    try {
        // Check if the user is a student
        const user = await Users.findById(studentId);
        if (!user || user.role === 'admin') {
            throw new Error('Only students are allowed to track lesson progress.');
        }

        const updateData = { status };
        if (status === 'COMPLETED') {
            updateData.completedAt = new Date();
        }

        const progress = await Progress.findOneAndUpdate(
            { studentId, lessonId },
            updateData,
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return progress;
    } catch (error) {
        throw error;
    }
};

const getProgressByStudent = async (studentId) => {
    try {
        const progress = await Progress.find({ studentId })
            .populate('lessonId', 'title courseId orderNumber')
            .sort({ updatedAt: -1 });
        return progress;
    } catch (error) {
        throw error;
    }
};

const getProgressByLesson = async (studentId, lessonId) => {
    try {
        const progress = await Progress.findOne({ studentId, lessonId });
        return progress;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    updateProgress,
    getProgressByStudent,
    getProgressByLesson
};
