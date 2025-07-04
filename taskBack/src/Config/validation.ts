import * as Joi from "joi";

// Scheme of validation for environment variables
export const validationSchema = Joi.object({
    URL_DATABASES: Joi.string().required()
})