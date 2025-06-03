import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';

import { BadRequestError } from '../errors/error-handlers';
import { IUserInterface } from '../interfaces/user.interface';
import { getHistory, getUserHistories, saveHistory } from '../services/database/history.service';

export const create = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

   if (!errors.isEmpty()) {
    throw new BadRequestError(errors.array()[0].msg, 'createHistory() controller');
  }

  const history = await saveHistory(req.body) as unknown as IUserInterface;

  res.status(StatusCodes.CREATED).json({status: 'success', message: 'history created successfully', history});
};

export const get = async (req: Request, res: Response): Promise<void> => {

  const history = await getHistory(req.params.id) as unknown as IUserInterface;

  res.status(StatusCodes.OK).json({status: 'success', message: 'history fetch successful', history});
};

export const getAll = async (req: Request, res: Response): Promise<void> => {

  if (!req.currentUser || !req.currentUser.email) {
    throw new BadRequestError('User not authorized', 'getAll() controller');
  }

  const histories = await getUserHistories(req.currentUser.email) as unknown as IUserInterface;

  res.status(StatusCodes.OK).json({status: 'success', message: 'histories fetch successful', histories});
};
