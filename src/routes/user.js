// import { Router } from "express";
// import { hasPermission, isAuthenticated }  from "../middlewares/auth.js";
// import { getUserProfile, loginUser, logoutUser, registerUser, updateUserProfile } from "../controllers/userController.js"
// import { userProfileUpload } from "../middlewares/uploads.js";

// const userRouter = Router()

// // Register Route
// userRouter.post('/users/register', registerUser);

// // Login Route
// userRouter.post('/users/login', loginUser);

// // Get User Profile (Protected Route)
// userRouter.get('/users/me', isAuthenticated, hasPermission('get_profile'), getUserProfile);

// // Update User Profile (Protected Route)
// userRouter.patch('/users/me',isAuthenticated, hasPermission('update_profile'), userProfileUpload, updateUserProfile);

// // Delete User Account (Protected Route)
// userRouter.post('users/logout', isAuthenticated, logoutUser);

// // export default userRouter
// export default userRouter






// // // routes/userRoutes.js

// // const express = require('express');
// // const router = express.Router();
// // const userController = require('../controllers/userController');
// // const auth = require('../middleware/auth'); // Middleware for authentication

// // // Register Route
// // router.post('/register', userController.register);

// // // Login Route
// // router.post('/login', userController.login);

// // // Get User Profile (Protected Route)
// // router.get('/profile', auth, userController.getUserProfile);

// // // Update User Profile (Protected Route)
// // router.put('/profile', auth, userController.updateUserProfile);

// // // Delete User Account (Protected Route)
// // router.delete('/delete', auth, userController.deleteUserAccount);

// // module.exports = router;
