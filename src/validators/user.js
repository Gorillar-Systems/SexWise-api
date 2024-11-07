import Joi from "joi";

// validate register
export const registerUserValidator = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("user"),
    birthCertificateNumber: Joi.string().required()
});

// validate login
export const loginUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

// validate updateDashboard
export const updateProfileValidator = Joi.object({
    name: Joi.string(),
    avatar: Joi.string()
});