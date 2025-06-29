// This file is where you set up and manage the connection between backend and database.

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    }
    catch(err){
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1); // Stop server if DB fails
    }
};

module.exports = connectDB;