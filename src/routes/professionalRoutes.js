import { Router } from 'express';
import { getAllProfessionals, getProfessionalProfile, loginProfessional, registerProfessional, updateProfessionalProfile } from "../controllers/professional.js"
import { isAuthenticated } from '../middlewares/auth.js';

const professionalRouter = Router()

// Register Professional
professionalRouter.post('/professionals/register', registerProfessional);

// Login Professional
professionalRouter.post('/professionals/login', loginProfessional);

// Get Professional Profile
professionalRouter.get('/professionals/me', isAuthenticated, getProfessionalProfile);

// Update Professional Profile
professionalRouter.patch('/professionals/me', isAuthenticated, updateProfessionalProfile);

// // Get All Professionals
// professionalRouter.get('/professionals', getAllProfessionals);

// // Update Professional Status (Admin Only)
// professionalRouter.patch('/professionals/:id/status', updateProfessionalStatus);

// // Add Rating and Feedback for Professional
// professionalRouter.post('/professionals/:id/rate', addProfessionalRating);

// // Search Professionals by Name
// professionalRouter.get('/professionls/search', searchProfessionalsByName);

export default professionalRouter;


