import { Secret } from './../../node_modules/@types/jsonwebtoken/index.d';
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import codes from '../utils/server-codes';
import { makeError } from '../errors/errorHandler';
import serverMessages from '../utils/server-messages';

const { FORBIDDEN, BAD_REQUEST, SERVER_ERROR } = codes;
const { INVALID_TOKEN, TOKEN_NOT_FOUND } = serverMessages;

const validateToken = (req: any, res: Response, next: NextFunction) => {
  try {
    const { JWT_SECRET } = process.env;
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split('Bearer ')[1];

      jwt.verify(token, <Secret>JWT_SECRET, (err: any, payload: any) => {
        if (err) {
          throw makeError(INVALID_TOKEN, FORBIDDEN);
        } else {
          req.user = payload;
          next();
        }
      });
    } else {
      throw makeError(TOKEN_NOT_FOUND, BAD_REQUEST);
    }
  } catch (error: any) {
    res.statusCode = error.status || SERVER_ERROR;
    res.send(error);
  }
};

export { validateToken };
