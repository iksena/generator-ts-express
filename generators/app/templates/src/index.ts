import Express, { Application } from 'express';
import BodyParser from 'body-parser';
import Bunyan, { LoggerOptions } from 'bunyan';
import Cors from 'cors';

import config from '../config';
import middlewares from './middlewares';
import routes from './routes';

const { port, loggerOptions } = config;
const { error: errorMiddleware, notFound } = middlewares;
const logger = Bunyan.createLogger(loggerOptions as LoggerOptions);

const initializeExpress = async (): Promise<Application> => {
  const app = Express();

  app.use(Cors());
  app.use(BodyParser.urlencoded({ extended: true }));
  app.use(BodyParser.json());
  app.locals.config = config;
  app.locals.logger = logger;

  routes.forEach((route) => app.use(route));

  app.use(notFound);
  app.use(errorMiddleware);

  return app;
};

const start = async () => {
  const app = await initializeExpress();

  app.listen(port, () => logger.info(`Listening to port ${port}`));
};

start();
