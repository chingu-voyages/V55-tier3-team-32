import express from 'express';

import { historyValidator } from '../validators/history.validator';
import { create, get, getAll } from '../controllers/history.controller';

const router = express.Router();

router.post('/', historyValidator, create);
router.get('/', get);
router.get('/:id', getAll);

export {router as historyRoutes};
