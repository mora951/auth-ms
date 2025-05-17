import { Request, Response } from 'express';

import { makeError } from '../../errors/errorHandler';
import codes from '../../utils/server-codes';
import serverMessages from '../../utils/server-messages';

import { getUserByProperty } from '../../services/user/get';
import strings from '../../config/strings';
import { removeUserDataByUsername, updateUserByUsername } from '../../services/user/update';

const { SERVER_ERROR, NOT_FOUND, SUCCESS_NO_CONTENT, UNAUTHORIZED, FORBIDDEN } = codes;

const { USER_NOT_FOUND, INVALID_OTP, EMAIL_ALREADY_VERIFIED } = serverMessages;

const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { username, otp } = req.body;

    const user = await getUserByProperty('username', username);

    if (!user) {
      throw makeError(USER_NOT_FOUND, NOT_FOUND);
    }

    if (!user.otp) {
      console.error(EMAIL_ALREADY_VERIFIED);

      throw makeError(EMAIL_ALREADY_VERIFIED, FORBIDDEN);
    } else if (user?.otp === otp) {
      await updateUserByUsername(username, { emailVerified: true });

      await removeUserDataByUsername(username, ['otp']);

      console.log('Otp verified successfully');
    } else {
      console.log(INVALID_OTP);

      throw makeError(INVALID_OTP, UNAUTHORIZED);
    }

    res.statusCode = SUCCESS_NO_CONTENT;
    res.end();
  } catch (error: any) {
    const errorStatus = error.status || SERVER_ERROR;

    res.statusCode = errorStatus;
    res.send(makeError(error.message, errorStatus));
  }
};

export { verifyEmail };
