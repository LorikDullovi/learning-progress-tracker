const express = require("express");
const app = express();
require('dotenv').config();
const connectDB = require('./db/connection');
connectDB();


const PORT = process.env.PORT || 3000;

app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});