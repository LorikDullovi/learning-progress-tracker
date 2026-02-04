const express = require("express");
const app = express();
require('dotenv').config();
const connectDB = require('./db/connection');
connectDB();


const authRoutes = require('./routes/auth.routes');

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});