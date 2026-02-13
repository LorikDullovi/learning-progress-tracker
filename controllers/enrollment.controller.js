const enrollmentService = require('../services/enrollment.service');

// ==========================================
// 1. Enroll User in Course
// Endpoint: POST /api/enrollments/:courseId
// ==========================================
const enrollInCourse = async (req, res) => {
    try {
        // Step 1: Get Data from Request
        const userId = req.user.id;                 // From Auth Token
        const courseId = req.params.courseId;       // From URL

        // Step 2: Call Service to Enroll
        const result = await enrollmentService.enrollInCourse(userId, courseId);

        // Step 3: Send Success Response
        res.status(201).json({
            message: 'Successfully enrolled in course!',
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// ==========================================
// 2. Get Users Enrolled Courses
// Endpoint: GET /api/enrollments
// ==========================================
const getEnrolledCourses = async (req, res) => {
    try {
        // Step 1: Get User ID from Token
        const userId = req.user.id;

        // Step 2: Get List from Service
        const myCourses = await enrollmentService.getEnrolledCourses(userId);

        // Step 3: Send Response
        res.status(200).json({
            count: myCourses.length,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// ==========================================
// 3. Unenroll from Course
// Endpoint: DELETE /api/enrollments/:courseId
// ==========================================
const unenrollFromCourse = async (req, res) => {
    try {
        // Step 1: Get Data
        const userId = req.user.id;
        const courseId = req.params.courseId;

        // Step 2: Delete via Service
        await enrollmentService.unenrollFromCourse(userId, courseId);

        // Step 3: Success Response
        res.status(200).json({
            message: 'Successfully unenrolled from the course'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// ==========================================
// 4. Admin: Get Students Enrolled in Course
// Endpoint: GET /api/enrollments/course/:courseId
// ==========================================
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
