import { body } from 'express-validator';

export const chatValidator = [
  body('userId')
    .isUUID()
    .withMessage('userId must be a valid UUID'),

  body('title')
    .isString()
    .notEmpty()
    .withMessage('title is required'),

  body('history')
    .optional()
    .isArray()
    .withMessage('history must be an array'),

  body('history.*')
    .optional()
    .isObject()
    .withMessage('each history item must be a JSON object'),
];
