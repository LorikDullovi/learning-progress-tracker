const Progress = require('../models/Progress');
const Users = require('../models/Users');
const Lesson = require('../models/Lesson');
const Enrollment = require('../models/Enrollment');

const updateProgress = async (studentId, lessonId, status) => {
    try {
        // Step 1: Check if the user is a student
        const user = await Users.findById(studentId);
        if (!user || user.role === 'admin') {
            throw new Error('Only students are allowed to track lesson progress.');
        }

        // Step 2: Find the lesson and its course
        const lesson = await Lesson.findById(lessonId);
        if (!lesson) {
            throw new Error('Lesson not found');
        }

        // Step 3: Check if the student is enrolled in the course
        const enrollment = await Enrollment.findOne({
            studentId,
            courseId: lesson.courseId
        });

        if (!enrollment) {
            throw new Error('You must be enrolled in the course to track progress for this lesson.');
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
    updateProgress,
    getProgressByStudent,
    getProgressByLesson
};
