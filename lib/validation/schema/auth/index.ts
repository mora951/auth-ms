import Joi from 'joi';
import { OTP_LENGTH } from '../../../config/globals';

const signUpSchema = {
  body: Joi.object()
    .keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      username: Joi.string().alphanum().required(),
      password: Joi.string().required(),
    })
    .required()
    .unknown(false),
};

const verifyEmailSchema = {
  body: Joi.object()
    .keys({
      username: Joi.string().alphanum().required(),
      otp: Joi.string().length(OTP_LENGTH).required(),
    })
    .required()
    .unknown(false),
};

const signInSchema = {
  body: Joi.object()
    .keys({
      username: Joi.string().alphanum().required(),
      password: Joi.string().required(),
    })
    .required()
    .unknown(false),
};

export { signUpSchema, verifyEmailSchema, signInSchema };
