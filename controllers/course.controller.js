const courseService = require('../services/course.service');

const getAllCourses = async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createCourse = async (req, res) => {
    const data = req.body;
    const user = req.user;
    try {
        const courseData = {
            ...data,
            createdBy: user.id
        };
        const newCourse = await courseService.createCourse(courseData);
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const updateData = req.body;
        const course = await courseService.updateCourse(courseId, updateData);
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const result = await courseService.deleteCourse(courseId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllCourses,
    createCourse,
    updateCourse,
    deleteCourse
};
