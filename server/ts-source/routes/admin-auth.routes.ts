import * as express from 'express';
import { Router } from 'express';

import { adminAuth } from '../controller/admin-auth.controller';

const router = Router();

router.get('/', adminAuth);

export default router;
