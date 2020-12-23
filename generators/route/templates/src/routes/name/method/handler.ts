import { Handler } from 'express';

const <%= moduleName %>Handler: Handler = (req, res, next) => {
  const { logger } = res.app.locals;

  try {
    res.json({ message: `<%= title %> service is healthy.` });

    next();
  } catch (error) {
    logger.error(error, `Something is wrong with <%= title %> service.`);

    next(error);
  }
};

export default <%= moduleName %>Handler;
