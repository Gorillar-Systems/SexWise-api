import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import consultationRouter from "./src/routes/consultationRoutes.js";
import professionalRouter from "./src/routes/professionalRoutes.js";
import userRouter from "./src/routes/userRoutes.js";

// Connect to database
await mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database connected successfully"))
.catch((error) => console.log("Error connecting to database", error));
// Create an express app
const app = express();

// Use middlewares
app.use(express.json());
app.use(cors());

// Use routes
app.use(userRouter)
app.use(professionalRouter);
app.use(consultationRouter);

const PORT = process.env.PORT

// Listen for incoming requests
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});