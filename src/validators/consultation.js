import Joi from "joi";

// Validate consultation booking
export const bookConsultationValidator = Joi.object({
    userId: Joi.string().required(),
    consultationType: Joi.string().required(),
    date: Joi.string().required(),
    status: Joi.string()
});

// Validate updateConsultationStatus
export const updateConsultationStatusValidator = Joi.object({
    consultationType: Joi.string().required(),
    date: Joi.string().required(),
    status: Joi.string()
});