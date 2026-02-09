const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: { // Corresponds to created_by in user request
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

// Virtual for lessons
courseSchema.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'courseId'
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
