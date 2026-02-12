const express = require("express");
const app = express();
require('dotenv').config({ quiet: true });
const connectDB = require('./db/connection');
connectDB();

const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const courseRoutes = require('./routes/course.routes');
const lessonRoutes = require('./routes/lesson.routes');
const enrollmentRoutes = require('./routes/enrollment.routes');
const progressRoutes = require('./routes/progress.routes');

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes Mount Points
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/progress', progressRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});