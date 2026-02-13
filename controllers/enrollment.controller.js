const enrollmentService = require('../services/enrollment.service');

const enrollInCourse = async (req, res) => {
    try {
        const userId = req.user.id;
        const courseId = req.params.courseId;

        const result = await enrollmentService.enrollInCourse(userId, courseId);
        res.status(201).json({
            message: 'Successfully enrolled in course!',
        });

        return result;
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        const myCourses = await enrollmentService.getEnrolledCourses(userId);

        res.status(200).json({
            count: myCourses.length,
            data: myCourses
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const unenrollFromCourse = async (req, res) => {
    try {
        const userId = req.user.id;
        const courseId = req.params.courseId;

        await enrollmentService.unenrollFromCourse(userId, courseId);

        res.status(200).json({
            message: 'Successfully unenrolled from the course'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getEnrolledStudents = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const students = await enrollmentService.getEnrolledStudents(courseId);

        res.status(200).json({
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    enrollInCourse,
    getEnrolledCourses,
    unenrollFromCourse,
    getEnrolledStudents
};
