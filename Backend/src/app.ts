import express, { Express } from 'express';

const app: Express = express();
import start from './server';

start(app);
