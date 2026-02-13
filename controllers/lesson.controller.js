const lessonService = require('../services/lesson.service');
const Enrollment = require('../models/Enrollment');

const getLessons = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.user.id;

        // Check if the student is enrolled
        const enrollment = await Enrollment.findOne({ studentId: userId, courseId });
        if (!enrollment) {
            return res.status(403).json({ message: 'You must be enrolled in this course to view its lessons.' });
        }

        const lessons = await lessonService.getLessonsByCourse(courseId);
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createLesson = async (req, res) => {
    try {
        const { courseId, title, content, orderNumber } = req.body;

        const finalCourseId = courseId || req.params.courseId;

        if (!finalCourseId) {
            return res.status(400).json({ message: 'Course ID is required' });
        }

        const lesson = await lessonService.addLesson(finalCourseId, { title, content, orderNumber });
        res.status(201).json(lesson);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Order number duplicate for this course' });
        }
        res.status(400).json({ message: error.message });
    }
};

const updateLesson = async (req, res) => {
    try {
        const lessonId = req.params.id;
        const data = req.body;
        const lesson = await lessonService.updateLesson(lessonId, data);
        if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
        res.status(200).json(lesson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteLesson = async (req, res) => {
    try {
        const lessonId = req.params.id;
        const result = await lessonService.deleteLesson(lessonId);
        if (!result) return res.status(404).json({ message: 'Lesson not found' });
        res.status(200).json({ message: 'Lesson deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getLessons,
    createLesson,
    updateLesson,
    deleteLesson
};
