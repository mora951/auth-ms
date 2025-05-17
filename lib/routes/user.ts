import { Router } from 'express';
import { getAllUsers } from '../controllers/users/get';

const userRoute = (router: Router) => {
  router.get('/all', getAllUsers);

  return router;
};

export default userRoute;
