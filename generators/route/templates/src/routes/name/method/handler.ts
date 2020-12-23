import { Handler } from 'express';

const <%= moduleName %>Handler: Handler = (req, res, next) => {
  const {
    logger,
    config: { loggerOptions: { name } },
  } = req.app.locals;

  try {
    res.json({ message: `${name} service is healthy.` });

    return next();
  } catch (error) {
    logger.error(error, `Something is wrong with ${name} service.`);

    return next(error);
  }
};

export default <%= moduleName %>Handler;
