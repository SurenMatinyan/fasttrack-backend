import { Joi } from "express-validation";

export const searchUsersBySkills = {
    query: Joi.object({
        skills: Joi.string().required()
    })
}