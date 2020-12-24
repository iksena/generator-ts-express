import { Handler, Router } from 'express';
import { NotFound } from 'http-errors';

const notFound = Router();

const notFoundHandler: Handler = (req, res, next) => {
  if (res.headersSent) {
    return next();
  }

  return next(new NotFound(`${req.method} ${req.url} not found`));
};

notFound.all('*', notFoundHandler);

export default notFound;
