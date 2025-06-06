import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { createChat, getAllChats, getChat } from '../services/database/chat.service';

export const sendChat = async (req: Request, res: Response) => {
   const response = await createChat(req.body);

    return res.status(StatusCodes.OK).json({ response });
};

export const chatByid = async (req: Request, res: Response) => {
  const response = await getChat(req.params.id);

  return res.status(StatusCodes.OK).json({ response });
};

export const allChats = async (req: Request, res: Response) => {
  const response = await getAllChats(req.currentUser?.id || '');

  return res.status(StatusCodes.OK).json({ response });
};
