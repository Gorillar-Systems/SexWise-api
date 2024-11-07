import { registerUserValidator, loginUserValidator } from "../validators/user.js";
import { UserModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mailTransporter } from "../utils/mail.js";

// Register User
export const registerUser = async (req, res, next) => {
    try {
        // Validate user input
        const { error, value } = registerUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // console.log(value)
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email: value.email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exist' });
        }

        // Hash their password
        const hashedPassword = bcrypt.hashSync(value.password, 10);

        // create new user
        const newUser = new UserModel({
            ...value,
            password: hashedPassword,
        });
        await newUser.save();
        console.log(newUser)
        // Send user confirmation email
        await mailTransporter.sendMail
            ({
                from: process.env.MAIL_USER,
                to: value.email,
                subject: "User signup",
                text: "User Registration Successfully"
            });
        // Respond to request
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Login User 
export const loginUser = async (req, res, next) => {
    try {
        // validate user input
        const { email, password } = loginUserValidator.validate(req.body);
        // Find the user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        // check password 
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token for user
        const token = jwt.sign({ id: user.id },
            JWT_PRIVATE_KEY, { expiresIn: '1h' });
        // Respond to request
        res.status(200).json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Get User's Profile
export const getUserProfile = async (req, res, next) => {
    try {
        // find authenticated user from database
        const user = await UserModel.findById(req.user.id).select({ password: false });
        // Respond to request
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update user's profile 
export const updateUserProfile = async (req, res, next) => {
    try {
        const { username, phoneNumber, profilePicture } = updateProfileValidator.validate({
            ...req.body,
            avatar: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        await UserModel.findByIdAndUpadate(req.user.id, value);
        res.json("User profile updated!");
    } catch (error) {
        next(error);
    }
}

// Delete user account
export const logoutUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ messsage: 'User not found' });
        }

        await user.remove();
        res.status(200).json({ message: 'User account deleted succeefully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};



// register a new user
// export const registerUser = async (req, res, next) => {
//     try {
//         // Validate user input
//         const { error, value } = registerUserValidator.validate(req.body);
//         if (error) {
//             return res.status(422).json(error);
//         }
//         // Check if user does not exist
//         const user = await UserModel.findOne({ email: value.email });
//         if (user) {
//             return res.status(409).json("User alraedy exist!");
//         }
//         // Hash their password
//         const hashedPassword = bcrypt.hashSync(value.password, 10);
//         // Save user into database
//         await UserModel.create({
//             ...value,
//             password: hashedPassword
//         });
//         // Send user confirmation email
//         await mailTransporter.sendMail({
//             to: value.email,
//             subject: "User Registration",
//             text: "Account registered successfully"
//         });
//         // Respond to request
//         res.json("User registered");
//     } catch (error) {
//         next(error);
//     }
// }

// export const loginUser = async (req, res, next) => {
//     try {
//         // Validate user input
//         const { error, value } = loginUserValidator.validate(req.body);
//         if (error) {
//             return res.status(422).json(error);
//         }
//         // Find one user with identifier
//         const user = await UserModel.findOne({ email: value.email });
//         if (!user) {
//             return res.status(404).json("User does not exist!");
//         }
//         // Compare their passwords
//         const correctPassword = bcrypt.compareSync(value.password, user.password);
//         if (!correctPassword) {
//             return res.status(401).json("Invalid credentials!");
//         }
//         // Sign a token for user
//         const token = jwt.sign(
//             { id: user.id },
//             process.env.JWT_PRIVATE_KEY,
//             { expiresIn: "24h" }
//         );
//         // Respond to request
//         res.json({
//             message: "User logged in!",
//             accessToken: token
//         });
//     } catch (error) {
//         next(error);
//     }
// }

// export const getProfile = async (req, res, next) => {
//     try {
//         console.log(req.auth);
//         // Find authenticated user from database
//         const user = await UserModel
//             .findById(req.auth.id)
//             .select({ password: false });
//         // Respond to request
//         res.json(user);
//     } catch (error) {
//         next(error);

//     }
// }

// export const getUserTodos = async (req, res, next) => {
//     try {
//         const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
//         // Fetch todos from database
//         const todos = await TodoModel
//             .find({
//                 ...JSON.parse(filter),
//                 user: req.auth.id
//             })
//             .sort(JSON.parse(sort))
//             .limit(limit)
//             .skip(skip);
//         // Return response
//         res.status(200).json(todos);
//     } catch (error) {
//         next(error);
//     }
// }

// export const logoutUser = (req, res, next) => {
//     res.json("User logged out");
// }

// export const updateProfile = async (req, res, next) => {
//     try {
//         // Validate user input
//         const { error, value } = updateProfileValidator.validate({
//             ...req.body,
//             avatar: req.file?.filename
//         });
//         if (error) {
//             return res.status(422).json(error);
//         }
//         await UserModel.findByIdAndUpdate(req.auth.id, value);
//         res.json("User profile updated");
//     } catch (error) {
//         next(error);

//     }
// }

// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { UserModel } from "../models/User"; // Adjust path as necessary

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Keep this in environment variables

// // Register a new user
// export const registerUser = async (req, res) => {
//     const { username, email, password, age, gender, sexualOrientation, country } = req.body;
//     try {
//         // Check if user already exists
//         const existingUser = await UserModel.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: "Email is already registered" });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const newUser = new UserModel({
//             username,
//             email,
//             password: hashedPassword,
//             age,
//             gender,
//             sexualOrientation,
//             country
//         });

//         await newUser.save();

//         res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//         res.status(500).json({ error: "Registration failed" });
//     }
// };

// // Login a user
// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await UserModel.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ error: "Invalid credentials" });
//         }

//         // Compare passwords
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ error: "Invalid credentials" });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

//         res.json({ message: "Login successful", token });
//     } catch (error) {
//         res.status(500).json({ error: "Login failed" });
//     }
// };

// // Get user profile
// export const getUserProfile = async (req, res) => {
//     try {
//         const userId = req.user.userId; // Assuming userId is set by authentication middleware
//         const user = await UserModel.findById(userId).select("-password"); // Exclude password

//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to retrieve user profile" });
//     }
// };

// // Update user profile
// export const updateUserProfile = async (req, res) => {
//     const { age, gender, sexualOrientation, country } = req.body;
//     try {
//         const userId = req.user.userId; // Assuming userId is set by authentication middleware
//         const updatedUser = await UserModel.findByIdAndUpdate(
//             userId,
//             { age, gender, sexualOrientation, country },
//             { new: true, runValidators: true }
//         ).select("-password");

//         if (!updatedUser) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         res.json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to update user profile" });
//     }
// };

// // Delete user account
// export const deleteUser = async (req, res) => {
//     try {
//         const userId = req.user.userId; // Assuming userId is set by authentication middleware
//         await UserModel.findByIdAndDelete(userId);

//         res.json({ message: "User account deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to delete user account" });
//     }
// };
