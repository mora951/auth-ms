import cors from 'cors';
import bodyParser from 'body-parser';
import express, { Router } from 'express';
import { validate } from 'express-validation';
import { bearerCheck } from '../validation/auth';
import { validateToken } from '../middlewares/validate';
import { checkVersion } from '../validation/version';
import codes from '../utils/server-codes';

const { SUCCESS } = codes;

const authenticatedRouter: Function = () => {
  const router = Router({ mergeParams: true });

  router.use(cors());
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json({ limit: '5mb' }));
  router.use(express.static('public'));

  router.all(
    '/*splat',
    <any>validate(bearerCheck),
    validateToken,
    <any>validate(checkVersion),
    (req, res, next) => {
      res.statusCode = SUCCESS;
      next();
    },
  );

  return router;
};

export default authenticatedRouter;
