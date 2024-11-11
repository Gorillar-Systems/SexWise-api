import { Router } from 'express';
import { bookConsultation, cancelConsultation, getConsultationDetails, updateConsultationDetails } from '../controllers/consultation.js';
import { isAuthenticated } from '../middlewares/authn.js';

const consultationRouter = Router();

// Book a Consultation
// consultationRouter.post('/consultations', isAuthenticated, hasPermission("book_consultation"), bookConsultation);
consultationRouter.post('/consultations', isAuthenticated, bookConsultation);

// Get Consultation Details
consultationRouter.get('/consultations/:consultationId', isAuthenticated, getConsultationDetails);

// Update Consultation Status
// consultationRouter.patch('/consultations/:consultationId/status', isAuthenticated, hasPermission("update_consultation"), updateConsultationStatus);
consultationRouter.patch('/consultations/:consultationId', isAuthenticated, updateConsultationDetails);

// Cancel a Consultation (User)
consultationRouter.patch('/consultations/:consultationId/cancel', isAuthenticated, cancelConsultation);

// List Professional’s Consultations
// consultationRouter.get('/consultations/:professionalId', getProfessionalConsultations);

// Get Consultation History
// consultationRouter.get('/consultations/history', getConsultationHistory);

// Reschedule Consultation
// consultationRouter.patch('/consultations/:consultationId/reschedule', rescheduleConsultation);

export default consultationRouter;

