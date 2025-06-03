import { body } from 'express-validator';

export const historyValidator = [
  body('userId')
    .notEmpty().withMessage('userId is required'),

  body('query')
    .notEmpty().withMessage('query is required')
    .isString().withMessage('query must be a string'),

  body('response')
    .notEmpty().withMessage('response is required')
    .isString().withMessage('response must be a string'),
];
