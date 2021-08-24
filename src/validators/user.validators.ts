import { Joi } from 'express-validation'

export const acceptOrReject = {
    body: Joi.object({
        id: Joi.number().required(),
        status: Joi.number().required()
    })
}

