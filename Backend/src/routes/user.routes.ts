import express from 'express';

import { registerValidator } from '../validators/registration.validator';
import { authicateUser, registerUser } from '../controllers/user.controller';

const router = express.Router();

router.post('/register', registerValidator, registerUser);
router.post('login', registerValidator, authicateUser);

export {router as userRoutes};
