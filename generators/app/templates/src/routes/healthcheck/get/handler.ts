import { Handler } from 'express';

const getHealthcheckHandler: Handler = (req, res, next) => {
  const {
    logger,
    config: { SERVICE_NAME },
  } = req.app.locals;

  try {
    res.json({ message: `${SERVICE_NAME} service is healthy.` });

    return next();
  } catch (error) {
    logger.error(error, `Something is wrong with ${SERVICE_NAME} service.`);

    return next(error);
  }
};

export default getHealthcheckHandler;
