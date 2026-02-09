const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    studentId: { // Corresponds to student_id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: { // Corresponds to course_id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    enrolledAt: { // Corresponds to enrolled_at
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Compound index to ensure a student can only enroll once per course
enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
