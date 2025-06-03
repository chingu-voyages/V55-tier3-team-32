import express, { Express } from 'express';

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserInterface;
    }
  }
}
const app: Express = express();
import start from './server';
import { IUserInterface } from './interfaces/user.interface';

start(app);
