import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import defaultRouter from './lib/routers/default';
import { ready as readyRoute } from './lib/routes/ready';
import accountRoute from './lib/routes/account';
import userRoute from './lib/routes/user';

dotenv.config();

import { connect } from './lib/db';
import authenticatedRouter from './lib/routers/authenticated';

const { ENV = 'dev', PORT = 5000 } = process.env;

connect();

const app = express();

app.use((req: any, res: Response, next: NextFunction) => {
  req.getVersion = function validateVer() {
    return req.headers.accept.split('version=')[1];
  };
  next();
});

app.use('/ready', readyRoute(defaultRouter()));
app.use('/account', accountRoute(defaultRouter()));
app.use('/users', userRoute(authenticatedRouter()));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  console.log(`Running in environment: ${ENV}`);
});
