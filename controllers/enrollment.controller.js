const enrollmentService = require('../services/enrollment.service');

const enrollInCourse = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        const courseId = req.params.courseId;

        if (userRole === 'admin') {
            return res.status(403).json({
                message: 'Admins are not allowed to enroll in courses.'
            });
        }

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
        const userRole = req.user.role;

        if (userRole === 'admin') {
            return res.status(403).json({
                message: 'Admins do not have course enrollments.'
            });
        }

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
        const userRole = req.user.role;
        const courseId = req.params.courseId;

        if (userRole === 'admin') {
            return res.status(403).json({
                message: 'Admins are not allowed to unenroll from courses.'
            });
        }

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
