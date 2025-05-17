import { validate } from 'express-validation';
import { Router } from 'express';

import { checkVersion } from '../validation/version';
import { signUpSchema, verifyEmailSchema, signInSchema } from '../validation/schema/auth';
import { signIn, signUp } from '../controllers/account/auth';
import { verifyEmail } from '../controllers/account/verify';

const accountRoute = (router: Router) => {
  router.post(
    '/signup',
    // @ts-ignore comment
    validate(checkVersion),
    validate(signUpSchema),
    signUp,
  );

  router.post(
    '/email/verify',
    // @ts-ignore comment
    validate(checkVersion),
    validate(verifyEmailSchema),
    verifyEmail,
  );

  router.post(
    '/signin',
    // @ts-ignore comment
    validate(checkVersion),
    validate(signInSchema),
    signIn,
  );

  return router;
};

export default accountRoute;
