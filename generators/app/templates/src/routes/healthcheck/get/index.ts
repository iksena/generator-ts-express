import { Router } from 'express';

import getHealthcheckHandler from './handler';

const router = Router();

router.get(
  '/healthcheck',
  getHealthcheckHandler,
);

export default router;
