const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const Users = require('../models/Users');

const enrollInCourse = async (studentId, courseId) => {
    try {
        //Check if the user is a student
        const user = await Users.findById(studentId);
        if (!user || user.role === 'admin') {
            throw new Error('Only students are allowed to enroll in courses.');
        }

        //Check if the course actually exists
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }

        //Check if the user is ALREADY enrolled
        const existingEnrollment = await Enrollment.findOne({ studentId, courseId });
        if (existingEnrollment) {
            throw new Error('You are already enrolled in this course');
        }

        const newEnrollment = new Enrollment({
            studentId,
            courseId,
            enrolledAt: new Date()
        });

        await newEnrollment.save();

        await newEnrollment.populate('courseId', 'title description');
        return newEnrollment;
    } catch (error) {
        throw error;
    }
};


const getEnrolledCourses = async (studentId) => {
    try {
        const enrollments = await Enrollment.find({ studentId })
            .populate('courseId', 'title description createdAt')
            .sort({ enrolledAt: -1 });

        return enrollments;
    } catch (error) {
        throw error;
    }
};


const unenrollFromCourse = async (studentId, courseId) => {
    try {
        const deletedEnrollment = await Enrollment.findOneAndDelete({
            studentId: studentId,
            courseId: courseId
        });

        if (!deletedEnrollment) {
            throw new Error('Enrollment not found. Cannot unenroll.');
        }

        return deletedEnrollment;
    } catch (error) {
        throw error;
    }
};

const getEnrolledStudents = async (courseId) => {
    try {
        const enrollments = await Enrollment.find({ courseId })
            .populate('studentId', 'name surname email age role')
            .sort({ enrolledAt: -1 });

        return enrollments;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    enrollInCourse,
    getEnrolledCourses,
    unenrollFromCourse,
    getEnrolledStudents
};

