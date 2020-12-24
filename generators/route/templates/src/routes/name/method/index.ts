import { Router } from 'express';

import <%= moduleName %>Handler from './handler';

const router = Router();

router.<%= method %>('/<%= name %>', <%= moduleName %>Handler);

export default router;
