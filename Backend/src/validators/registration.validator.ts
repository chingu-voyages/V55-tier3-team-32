import { body } from 'express-validator';

export const registerValidator = [
  body('email')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[\W]/).withMessage('Password must contain at least one special character'),
];
