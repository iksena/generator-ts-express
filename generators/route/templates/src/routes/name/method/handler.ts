import { Handler } from 'express';

const <%= moduleName %>Handler: Handler = (req, res, next) => {
  const {
    logger,
  } = req.app.locals;

  try {
    res.json({ message: `<%= title %> service is healthy.` });

    return next();
  } catch (error) {
    logger.error(error, `Something is wrong with <%= title %> service.`);

    return next(error);
  }
};

export default <%= moduleName %>Handler;
