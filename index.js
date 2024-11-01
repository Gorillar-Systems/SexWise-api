import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Connect to database
mongoose.connect(process.env.MONGO_URI);
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database connection error', err));

// Create an express app
const app = express();

// Use middlewares
app.use(express.json());
app.use(cors());

// Use routes
app.use();
app.use();


// Listen for incoming requests
app.listen(6000, () => {
    console.log("App is listening on port 6000");
});