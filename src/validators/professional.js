import Joi from "joi";

// Validate registerProfessional
export const registerProfessionalValidator = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    sex: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    licenseNumber: Joi.number().required()
}).unknown();

// Validate login
export const loginProfessionalValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

// Validate getProfessionalProfile
export const getProfessionalProfileValidator = Joi.object({
    email: Joi.string(),
    password: Joi.string()
});

// Validate updateProfessionalProfile
export const updateProfessionalProfileValidator = Joi.object({
    fullName: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    phoneNumber: Joi.number(),
    services: Joi.string(),
    profilePicture: Joi.string()
});

