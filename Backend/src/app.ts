import express, { Express } from "express";

const app: Express = express();
import start from "./server";

const BASE_PATH = '/api/v1';
//app.use(`${BASE_PATH}`, express.Router());

start(app);
