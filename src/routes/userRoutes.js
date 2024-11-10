import { Router } from "express";
import { isAuthenticated, userPermission } from "../middlewares/authn.js";
import { getUserProfile, loginUser, logoutUser, registerUser, updateUserProfile } from "../controllers/user.js"

const userRouter = Router()

// Routes
userRouter.post("/users/register", registerUser);

userRouter.post("/users/login", loginUser);

userRouter.get("/users/me", isAuthenticated, userPermission("get_profile"), getUserProfile);

userRouter.patch("/users/me", isAuthenticated, userPermission("update_profile"), updateUserProfile);

userRouter.post("/users/logout", isAuthenticated, logoutUser);

export default userRouter
