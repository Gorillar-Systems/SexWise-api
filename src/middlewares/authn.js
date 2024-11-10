import { expressjwt } from "express-jwt";
import { professionalModel } from "../models/professionalModel.js";
import { userModel } from "../models/userModel2.js";
import { permissions } from "../utils/rbac.js";

// Middleware to check if user is authenticated
export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ["HS256"]
});

export const hasPermission = (action) => {
    return async (req, res, next) => {
        try {
            // Retrieve the authenticated professional
            const professional = await professionalModel.findById(req.auth.id);
            // Check if professional exist
            if (!professional) {
                return res.status(404).json({ message: "Professional not found!" });
            }
            // Check if professional has a role
            if (!professional.role) {
                return res.status(400).json({ message: "Professional role not defined!" });
            }
console.log("Generated token for professional:", {
    id: professional.id,
    role: professional.role
})
// Use professional role to define the permission
const permission = permissions.find(value => value.role === professional.role);
if (!permission) {
    return res.status(404).json({
        message: `No permissions found for role: ${professional.role}`
    });
}
// Check if professional has the required permission
if (!permission.actions.includes(action)) {
    return res.status(403).json({
        message: `Action "${action}" not allowed for role "${professional.role}"`
    });
}
// If all checks pass, proceed
next()   
} catch (error) {
    console.error('Permission check error:', error);
    return res.status(500).json({
        message: 'Error checking permissions',
        error: error.message
    });
}
    };
};

// Permission for user
export const userPermission = (action) => {
    return async (req, res, next) => {
        try {
            // Find user from database
            const user = await userModel.findById(req.auth.id);
            // Use the user role to find their permission
            const permission = permissions.find((value )=> value.role === user.role);
            if (!permission) {
                return res.status(403).json("No permission found!");
            }
            // Check if permission actions include actions
            if (permission.actions.includes(action)) {
                next();
            } else {
                res.status(403).json("Action not allowed!");
            }
        } catch (error) {
            next(error);
        }
    }
}

