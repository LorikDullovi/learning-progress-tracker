const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true // Assuming content is text/markdown
    },
    orderNumber: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// Compound index to ensure order number is unique per course
lessonSchema.index({ courseId: 1, orderNumber: 1 }, { unique: true });

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
