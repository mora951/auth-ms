import Joi from 'joi';

export default {
  headers: Joi.object({
    accept: Joi.string()
      .regex(/^\bapplication\/vnd\.auth\b/)
      .required(),
  }).unknown(true),
};
