import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';

import { createUser, loginUser } from '../services/database/user.service';
import { BadRequestError } from '../errors/error-handlers';
import { signToken } from '../lib/jwt';
import { IUserInterface } from '../interfaces/user.interface';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

   if (!errors.isEmpty()) {
    throw new BadRequestError(errors.array()[0].msg, 'registerUser() controller');
  }
  let token;
  const user = await createUser(req.body) as unknown as IUserInterface;

  if (user) {
    token = signToken({
      email: user.email, id: user.id,
      password: ''
    });
  }
  req.currentUser = user;

  res.status(StatusCodes.CREATED).json({status: 'success', message: 'user created successfully', user, token});
};

export const authicateUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  const { email, password } = req.body;
   if (!errors.isEmpty()) {
    throw new BadRequestError(errors.array()[0].msg, 'loginUser() controller');
  }
  let token;
  const user = await loginUser(email, password) as unknown as IUserInterface;

  if (user) {
    token = signToken({
      email: user.email, id: user.id,
      password: ''
    });
  }

  res.status(StatusCodes.OK).json({status: 'success', message: 'user login successful', user, token});
};
