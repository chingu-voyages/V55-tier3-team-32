import { NextFunction, Request, Response } from 'express';

import { BadRequestError, NotAuthorizedError } from '../errors/error-handlers';
import { verifyToken } from '../lib/jwt';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new NotAuthorizedError('User not authorized', 'authenticateUser middleware');
  }

  try {
    const userPayload = verifyToken(token);

    if (userPayload) {
      req.currentUser = userPayload;
    }
  } catch (err) {
    throw new BadRequestError(`${err}`, 'authenticateUser middleware');
  }

  next();
};
