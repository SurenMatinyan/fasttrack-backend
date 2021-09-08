import { Joi } from 'express-validation'
import { UserRole } from '../enum/user.role'


export const registration = {
    body: Joi.object({
        name: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        role: Joi.string().custom((value, helpers) => value === UserRole.staff || value === UserRole.instructur || value === UserRole.student ? value : helpers.error("any.invalid")).required(),
        skills: Joi.array().empty(),
        password: Joi.string().min(5).required()
      })
}

export const authorization = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
}