import Joi from "joi";

// Validate consultation booking
export const bookConsultationValidator = Joi.object({
    userId: Joi.string().required(),
    consultationType: Joi.string().required(),
    date: Joi.string().required(),
    status: Joi.string()
}).unknown();

// Validate updateConsultationStatus
export const updateConsultationDetailsValidator = Joi.object({
    consultationType: Joi.string(),
    date: Joi.string(),
    status: Joi.string()
}).unknown();