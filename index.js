import express from "express";
// import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./src/routes/user.js";


// Connect to database
mongoose.connect(process.env.MONGO_URI)

// Create an express app
const app = express();

// Use middlewares
app.use(express.json());
app.use(cors());

// Use routes
 app.use(userRouter)


// Listen for incoming requests
app.listen(6000, () => {
    console.log("App is listening on port 6000");
});