const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true
    },
    status: {
        type: String,
        enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'],
        default: 'NOT_STARTED'
    },
    completedAt: {
        type: Date
    }
}, { timestamps: true });

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
