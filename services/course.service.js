const Course = require('../models/Course');

const createCourse = async (courseData) => {
    try {
        const newCourse = new Course(courseData);
        await newCourse.save();
        return newCourse;
    } catch (error) {
        throw error;
    }
};

const getAllCourses = async () => {
    try {
        const courses = await Course.find()
            .populate('createdBy', 'name surname email');
        return courses;
    } catch (error) {
        throw error;
    }
};

const updateCourse = async (courseId, updateData) => {
    try {
        const course = await Course.findByIdAndUpdate(
            courseId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!course) {
            throw new Error('Course not found');
        }
        return course;
    } catch (error) {
        throw error;
    }
};

const deleteCourse = async (courseId) => {
    try {
        const course = await Course.findByIdAndDelete(courseId);

        if (!course) {
            throw new Error('Course not found');
        }
        return { message: 'Course deleted successfully' };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse
};

