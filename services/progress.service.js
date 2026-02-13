const Progress = require('../models/Progress');
const Users = require('../models/Users');
const Lesson = require('../models/Lesson');
const Enrollment = require('../models/Enrollment');

const createProgress = async (studentId, lessonId, status) => {
    try {

        const lesson = await Lesson.findById(lessonId);
        if (!lesson) throw new Error('Lesson not found');

        const enrollment = await Enrollment.findOne({ studentId, courseId: lesson.courseId });
        if (!enrollment) throw new Error('You must be enrolled to track progress.');

        const existingProgress = await Progress.findOne({ studentId, lessonId });
        if (existingProgress) {
            throw new Error('Progress already exists. Use update instead.');
        }

        const progress = new Progress({
            studentId,
            lessonId,
            status,
            completedAt: status === 'COMPLETED' ? new Date() : null
        });

        await progress.save();
        return progress;
    } catch (error) {
        throw error;
    }
};

const updateProgress = async (studentId, lessonId, status) => {
    try {
        const progress = await Progress.findOne({ studentId, lessonId });
        if (!progress) {
            throw new Error('Progress record not found. Use create instead.');
        }

        progress.status = status;
        if (status === 'COMPLETED') {
            progress.completedAt = new Date();
        }

        await progress.save();
        return progress;
    } catch (error) {
        throw error;
    }
};

const getProgressByStudent = async (studentId) => {
    try {
        // Step 1: Get all enrolled course IDs for this student
        const enrollments = await Enrollment.find({ studentId }).select('courseId');
        const enrolledCourseIds = enrollments.map(e => e.courseId);

        // Step 2: Find all progress records
        const progress = await Progress.find({ studentId })
            .populate({
                path: 'lessonId',
                select: 'title courseId orderNumber'
            })
            .sort({ updatedAt: -1 });

        // Step 3: Filter progress to only include lessons from enrolled courses
        const filteredProgress = progress.filter(p =>
            p.lessonId && enrolledCourseIds.some(id => id.equals(p.lessonId.courseId))
        );

        return filteredProgress;
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
    createProgress,
    updateProgress,
    getProgressByStudent,
    getProgressByLesson
};
