import Express, { Application } from 'express';
import BodyParser from 'body-parser';
import Bunyan, { LoggerOptions } from 'bunyan';
import Cors from 'cors';
<%_ if (hasDb) { _%>
import { Client, ClientConfig } from 'pg';
<%_ } _%>

import config from '../config';
import middlewares from './middlewares';
import routes from './routes';
<%_ if (repository) { _%>
import { <%= repository.title %>Repository } from './repositories';
<%_ } _%>

const {
  port,
  loggerOptions,
<%_ if (hasDb) { _%>
  resources: { db }
<%_ } _%>
} = config;
const { error: errorMiddleware, notFound } = middlewares;
const logger = Bunyan.createLogger(loggerOptions as LoggerOptions);

<%_ if (hasDb) { _%>
const initializePostgres = async (): Promise<unknown> => {
  const database = new Client(db as ClientConfig);

  try {
    await database.connect();
    logger.info(`Database ${db.database} is connected.`);

    return {
    <%_ if (repository) { _%>
      <%= repository.name %>: new <%= repository.title %>Repository(database, logger),
    <%_ } _%>
    };
  } catch (error) {
    logger.error(`Connection to database ${db.database} has failed.`);

    throw Error('Database has failed to connect');
  }
};
<%_ } _%>

const initializeExpress = async (): Promise<Application> => {
  const app = Express();

  app.use(Cors());
  app.use(BodyParser.urlencoded({ extended: true }));
  app.use(BodyParser.json());
  app.locals.config = config;
  app.locals.logger = logger;
  <%_ if (hasDb) { _%>
  app.locals.models = await initializePostgres();
  <%_ } _%>

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
