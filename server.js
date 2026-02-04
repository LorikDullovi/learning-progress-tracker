const express = require("express");
const app = express();
require('dotenv').config();
const connectDB = require('./db/connection');
connectDB();

// Routes
const authRoutes = require('./routes/auth.routes');

const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});