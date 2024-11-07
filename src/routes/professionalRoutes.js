import { Router } from 'express';
import { getAllProfessionals, getProfessionalProfile, loginProfessional, registerProfessional, updateProfessionalProfile } from "../controllers/professional.js"


const professionalRouter = Router()

// import { Router } from "express";
// import { userAvatarUpload } from "../middlewares/upload.js";
// import { hasPermission, isAuthenticated } from "../middlewares/auth.js"
// import { getProfile, loginVendor, logoutVendor, signupVendor, updateProfile } from "../controllers/vendor.js";
// import { getVendorAdverts } from "../controllers/userController.js";
// // import { getProfile, loginVendor,  } from "../controllers/vendor.js";

// const vendorRouter = Router()

// // Routes
// vendorRouter.post('/vendors/signup', signupVendor);

// vendorRouter.post('/vendors/login', loginVendor);

// vendorRouter.get('/vendors/logout', isAuthenticated, logoutVendor);

// vendorRouter.get('/vendors/me', isAuthenticated, hasPermission('get_profile'), getProfile);

// vendorRouter.get('/vendors/me/adverts', isAuthenticated, getVendorAdverts);

// vendorRouter.patch('/vendors/me', isAuthenticated, hasPermission('update_profile'), userAvatarUpload.single('image') ,updateProfile)

// // export router
// export default vendorRouter



// Register Professional
professionalRouter.post('/professionals/register', registerProfessional);

// Login Professional
professionalRouter.post('/professionals/login', loginProfessional);

// Get Professional Profile
professionalRouter.get('/professionals/:id', getProfessionalProfile);

// Update Professional Profile
professionalRouter.patch('/professionals/:id', updateProfessionalProfile);

// Get All Professionals
professionalRouter.get('/professionals', getAllProfessionals);

// // Update Professional Status (Admin Only)
// professionalRouter.patch('/professionals/:id/status', updateProfessionalStatus);

// // Add Rating and Feedback for Professional
// professionalRouter.post('/professionals/:id/rate', addProfessionalRating);

// // Search Professionals by Name
// professionalRouter.get('/professionls/search', searchProfessionalsByName);

export default professionalRouter;

// const professionalRoutes = require('./routes/professionalRoutes');
// app.use('/api/professionals', professionalRoutes);

