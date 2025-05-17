import Joi from 'joi';

export default {
  headers: Joi.object({
    authorization: Joi.string()
      .regex(/^Bearer /)
      .required(),
  }).unknown(true),
};
