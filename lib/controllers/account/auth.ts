import { Request, Response } from 'express';
import argon2 from 'argon2';

import { makeError } from '../../errors/errorHandler';
import codes from '../../utils/server-codes';
import serverMessages from '../../utils/server-messages';

import { addUser as addUserService } from '../../services/user/add';
import { checkUserIfAlreadyExistByProperty, getUserByProperty } from '../../services/user/get';
import sendEmail from '../../services/email/send';
import strings from '../../config/strings';
import { generateOtp } from '../../utils/random';
import { OTP_LENGTH } from '../../config/globals';
import { updateUserByUsername } from '../../services/user/update';
import { generateToken } from '../../utils/jwt';

const {
  SERVER_ERROR,
  SUCCESS_CREATED,
  CONFLICT,
  NOT_FOUND,
  UNAUTHORIZED,
  SUCCESS,
} = codes;

const {
  DUPLICATE_EMAIL,
  DUPLICATE_USERNAME,
  USER_NOT_FOUND,
  INVALID_CREDENTIALS,
} = serverMessages;

const { CONFIRM_EMAIL_TITLE, CONFIRM_EMAIL_CONTENT } = strings;

const signIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await getUserByProperty('username', username);

    if (!user) {
      throw makeError(USER_NOT_FOUND, NOT_FOUND);
    }

    const result = await argon2.verify(user.password || '', password);

    if (result) {
      if (!user.active) {
        await updateUserByUsername(username, { active: true });
      }

      const token = generateToken(user);

      res.statusCode = SUCCESS;
      res.send({
        token,
        data: { firstName: user.firstName, lastName: user.lastName, email: user.email },
      });
    } else {
      throw makeError(INVALID_CREDENTIALS, UNAUTHORIZED);
    }
  } catch (error: any) {
    const errorStatus = error.status || SERVER_ERROR;

    res.statusCode = errorStatus;
    res.send(makeError(error.message, errorStatus));
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    const emailAlreadyExists = await checkUserIfAlreadyExistByProperty('email', email);

    if (emailAlreadyExists) {
      res.statusCode = CONFLICT;
      res.send(makeError(DUPLICATE_EMAIL, CONFLICT));
      return;
    }

    const usernameAlreadyExists = await checkUserIfAlreadyExistByProperty('username', username);

    if (usernameAlreadyExists) {
      res.statusCode = CONFLICT;
      res.send(makeError(DUPLICATE_USERNAME, CONFLICT));
      return;
    }

    const hashedPassword = await argon2.hash(password);

    const otp: string = generateOtp(OTP_LENGTH);

    await addUserService({ ...req.body, hashedPassword, otp });

    sendEmail(email, CONFIRM_EMAIL_TITLE, CONFIRM_EMAIL_CONTENT(otp));

    res.statusCode = SUCCESS_CREATED;
    res.end();
  } catch (error: any) {
    const errorStatus = error.status || SERVER_ERROR;

    res.statusCode = errorStatus;
    res.send(makeError(error.message, errorStatus));
  }
};

export { signIn, signUp };
