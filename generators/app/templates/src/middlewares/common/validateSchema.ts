import { Handler } from 'express';
import { BadRequest } from 'http-errors';
import { Schema } from 'joi';

const validateSchema = (schema: Schema): Handler => (req, res, next) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return next(new BadRequest(validationResult.error.message));
  }

  return next();
};

export default validateSchema;
