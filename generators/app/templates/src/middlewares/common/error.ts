import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (error, req, res, _) => {
  const errorResponse = {
    name: error.name || 'GeneralError',
    message: error.message || 'Something went wrong',
    statusCode: error.statusCode || 500,
  };

  return res.status(errorResponse.statusCode).json(errorResponse);
};

export default errorHandler;
