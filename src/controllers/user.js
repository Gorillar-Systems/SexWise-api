import { userModel } from "../models/userModel2.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginUserValidator, registerUserValidator } from "../validators/user.js";
import { mailTransporter } from "../utils/mail.js";
import mongoose from "mongoose";

// Register User
export const registerUser = async (req, res, next) => {
    try {
        // Validate user input
        const { error, value } = registerUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Check if user already exists
        const user = await userModel.findOne({ email: value.email });
        if (user) {
            return res.status(409).json("User already exist!");
        }
        // Hash their password
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        // Save user into database
        const newUser = await userModel.create({
            ...value,
            password: hashedPassword
        });
        // Send user confirmation email
        await mailTransporter.sendMail({
            from: process.env.USER_EMAIL,
            to: value.email,
            subject: "User Registration",
            text: "User registerd successfully!"
        });
        //Respond to request
        const token = jwt.sign(
            { id: newUser.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: "24h" });
        // Respond to request

        const { password, ...rest } = newUser._doc;
        const response = {
            user: rest,
            token
        }
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
}

// User login
export const loginUser = async (req, res, next) => {
    try {
        // Validate user input
        const { error, value } = loginUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Check if user exists
        const user = await userModel.findOne({ email: value.email });
        if (!user) {
            return res.status(404).json("User does not exist!");
        }
        // Compare their passwords
        const correctPassword = bcrypt.compareSync(value.password, user.password);
        if (!correctPassword) {
            return res.status(401).json("Incorrect Password!");
        }
        // Generate a token for user
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: "2h" });
        // Respond to request
        const { password, ...rest } = user._doc;
        const response = {
            user: rest,
            token
        }
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

// Get user's profile
export const getUserProfile = async (req, res, next) => {
    try {
        // Find authenticated user from database
        const user = await userModel
            .findById(req.auth.id).select("-password");
        //Respond to request
        if (!user) {
            return res.status(404).json("User not found!");
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

// Update user's profile
export const updateUserProfile = async (req, res, next) => {
    try {
        //    // Validate user input
        //    const { error, value } = updateUserProfileValidator.validate({
        //     ...req.body,
        //     profilePicture: req.file?.filename
        //    });
        // Hash password in the body if any
        if (req.body?.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        //    if (error) {
        //     return res.status(422).json(error);
        //    }
        // Update user profile
        await userModel.findByIdAndUpdate(req.auth.id, req.body);
        // Respond to request
        res.json("User profile updated!");
    } catch (error) {
        next(error);
    }
}

export const logoutUser = (req, res, next) => {
    res.json("User logged out");
}