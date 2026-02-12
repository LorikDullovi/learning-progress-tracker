const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

/**
 * Enroll a student in a course
 */
const enrollInCourse = async (studentId, courseId) => {
    try {
        // Step 1: Check if the course actually exists
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }

        // Step 2: Check if the user is ALREADY enrolled
        const existingEnrollment = await Enrollment.findOne({ studentId, courseId });
        if (existingEnrollment) {
            throw new Error('You are already enrolled in this course');
        }

        // Step 3: Create the new Enrollment record
        const newEnrollment = new Enrollment({
            studentId,
            courseId,
            enrolledAt: new Date()
        });

        // Step 4: Save to database
        await newEnrollment.save();

        // Step 5: Return the enrollment with course details
        await newEnrollment.populate('courseId', 'title description');
        return newEnrollment;
    } catch (error) {
        throw error;
    }
};

/**
 * Get all courses a student is enrolled in
 */
const getEnrolledCourses = async (studentId) => {
    try {
        // Find all enrollments for this user
        const enrollments = await Enrollment.find({ studentId })
            .populate('courseId', 'title description createdAt')
            .sort({ enrolledAt: -1 });

        return enrollments;
    } catch (error) {
        throw error;
    }
};

/**
 * Unenroll (Remove Enrollment)
 */
const unenrollFromCourse = async (studentId, courseId) => {
    try {
        // Find and delete the enrollment
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

// Removed updateStatus as status field is gone from Enrollment model


/**
 * Admin: Get all students enrolled in a specific course
 */
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

