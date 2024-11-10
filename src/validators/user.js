import Joi from "joi";

// validate user registration
export const registerUserValidator = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    sex: Joi.string().required(),
    role: Joi.string().valid("client"),
    dateOfBirth: Joi.string().required()
}).unknown();

// validate user login
export const loginUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

// validate user update
export const updateProfileValidator = Joi.object({
    userName: Joi.string(),
    profilePicture: Joi.string()
}).unknown();