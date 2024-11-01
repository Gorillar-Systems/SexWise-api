// import { createAdvert, updateAdvert, deleteAdvert, getAdvertsByCategory, searchAdverts, getAdverts, getAdvert, countAdverts } from '../controllers/advertController.js';
// import { Router } from 'express';
// import { isAuthenticated, hasPermission } from '../middlewares/auth.js';
// import { advertIconUpload } from '../middlewares/upload.js';

// const router = Router();

// // Route to get adverts by category
// router.get('/adverts/category/:category', getAdvertsByCategory);

// // Private routes (Vendor only)
// router.post('/adverts', isAuthenticated, hasPermission('create_advert'), advertIconUpload, createAdvert );

// router.patch('/adverts/:id', isAuthenticated, hasPermission('update_advert'), advertIconUpload, updateAdvert); // Vendors update
// router.delete('/adverts/:id', deleteAdvert); // Vendors delete

// // Public routes
// router.get('/adverts', getAdverts);

// router.get('/adverts/count', countAdverts);

// router.get('/adverts/search', searchAdverts, getAdverts); // Any user

// router.get('/adverts/:id', getAdvert); // Any user

// export default router;