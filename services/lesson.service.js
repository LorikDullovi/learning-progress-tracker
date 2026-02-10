const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

const addLesson = async (courseId, data) => {
    try {
        const newLesson = new Lesson({
            courseId,
            ...data
        });
        await newLesson.save();
        return newLesson;
    } catch (error) {
        throw error;
    }
};

const getLessonsByCourse = async (courseId) => {
    try {
        const lessons = await Lesson.find({ courseId }).sort({ orderNumber: 1 });
        return lessons;
    } catch (error) {
        throw error;
    }
};

const updateLesson = async (lessonId, data) => {
    try {
        const lesson = await Lesson.findByIdAndUpdate(lessonId, data, { new: true, runValidators: true });
        return lesson;
    } catch (error) {
        throw error;
    }
};

const deleteLesson = async (lessonId) => {
    try {
        const lesson = await Lesson.findByIdAndDelete(lessonId);
        return lesson;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    addLesson,
    getLessonsByCourse,
    updateLesson,
    deleteLesson
};
