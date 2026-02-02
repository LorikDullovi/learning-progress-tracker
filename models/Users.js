//Here is the model for users in the application please i want username email password age profilePicture role and date of registration fields and role and createdat and updatedat should be handled automatically by mongoose.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
    email: {
    type: String,
    required: true,
    unique: true,
  },
    password: {
    type: String,
    required: true
  },
    age: {
    type: Number,
    min: 0
    },
    profilePicture: {
    type: String,
    default: ''
    },
    role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;