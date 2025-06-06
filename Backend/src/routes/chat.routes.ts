import express from 'express';

import { chatByid, sendChat } from '../controllers/chat.controller';
import { chatValidator } from '../validators/chat.validator';
import { getAllChats } from '../services/database/chat.service';

const router = express.Router();

router.post('/', chatValidator,  sendChat);
router.get('/:id',  chatByid);
router.get('/',  getAllChats);

export {router as chatRoutes};
