import http from 'http';

import 'express-async-errors';
import { Application, Request, Response, json, urlencoded, NextFunction } from 'express';
import cookieSession from 'cookie-session';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';
import { StatusCodes } from 'http-status-codes';

import { config } from './config';
import { CustomError, IErrorResponse } from './errors/error-handlers';
import { userRoutes } from './routes/user.routes';
import { databaseConnection } from './database';

  const start = (app: Application) => {
    securityMiddleware(app);
    standardMiddleware(app);
    routesMiddleware(app);
    errorHandler(app);
    startServer(app);
  };

 const securityMiddleware = (app: Application) =>  {
    app.set('trust proxy', 1);
    app.use(
      cookieSession({
        name: 'session',
        keys: [`${config.SECRET_KEY_ONE}`],
        maxAge: 24 * 7 * 3600000,
        secure: config.NODE_ENV !== 'development',
        ...(config.NODE_ENV !== 'development' && {
          sameSite: 'none'
        })
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(cors({
      origin: config.CLIENT_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    }));
};

  const standardMiddleware = (app: Application) => {
    app.use(compression());
    app.use(json({ limit: '200mb' }));
    app.use(urlencoded({ extended: true, limit: '200mb' }));
  };

  const routesMiddleware = (app: Application) => {
    const BASE_PATH = '/api/v1';
    app.use(`${BASE_PATH}/users`, userRoutes);
  };

  const errorHandler = (app: Application) => {
    app.use('*', (req: Request, res: Response, next: NextFunction) => {
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      res.status(StatusCodes.NOT_FOUND).json({ message: `The endpoint called does not exist.${fullUrl}` });
      next();
    });

    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(error.serializeErrors());
      }

      next();
    });
  };

  const startServer = async(app: Application): Promise<void> => {
    try {
      const httpServer: http.Server = new http.Server(app);
      httpServer.listen(config.SERVER_PORT, () => {
        console.log(`server running on port ${config.SERVER_PORT}`);
        databaseConnection();
      });
    } catch (error) {
      console.log('error', error);
    }
  };


export default start;
