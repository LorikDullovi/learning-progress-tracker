const Course = require('../models/Course');
const User = require('../models/Users');

const createCourse = async (courseData) => {
    try {
        const { studentIds, ...courseInfo } = courseData;

        // Validate that all provided studentIds belong to users with role 'student'
        if (studentIds && studentIds.length > 0) {
            const students = await User.find({
                _id: { $in: studentIds },
                role: 'student'
            });

            if (students.length !== studentIds.length) {
                throw new Error('One or more student IDs are invalid or not students');
            }

            courseInfo.students = studentIds;
        }

        const newCourse = new Course(courseInfo);
        await newCourse.save();

        // Update each student's enrolledCourses array
        if (studentIds && studentIds.length > 0) {
            await User.updateMany(
                { _id: { $in: studentIds } },
                { $addToSet: { enrolledCourses: newCourse._id } }
            );
        }

        return newCourse;
    } catch (error) {
        throw error;
    }
};

const getAllCourses = async () => {
    try {
        const courses = await Course.find()
            .populate('createdBy', 'username email')
            .populate('students', 'username email');
        return courses;
    } catch (error) {
        throw error;
    }
};

const updateCourse = async (courseId, updateData) => {
    try {
        const { studentIds, ...courseInfo } = updateData;

        // If studentIds provided, validate they are students
        if (studentIds && studentIds.length > 0) {
            const students = await User.find({
                _id: { $in: studentIds },
                role: 'student'
            });

            if (students.length !== studentIds.length) {
                throw new Error('One or more student IDs are invalid or not students');
            }

            courseInfo.students = studentIds;
        }

        const course = await Course.findByIdAndUpdate(
            courseId,
            courseInfo,
            { new: true, runValidators: true }
        );

        if (!course) {
            throw new Error('Course not found');
        }

        // Update students' enrolledCourses if studentIds changed
        if (studentIds && studentIds.length > 0) {
            // Remove course from all users' enrolledCourses
            await User.updateMany(
                { enrolledCourses: courseId },
                { $pull: { enrolledCourses: courseId } }
            );

            // Add course to new students' enrolledCourses
            await User.updateMany(
                { _id: { $in: studentIds } },
                { $addToSet: { enrolledCourses: courseId } }
            );
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

        // Remove course from all students' enrolledCourses
        await User.updateMany(
            { enrolledCourses: courseId },
            { $pull: { enrolledCourses: courseId } }
        );

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
