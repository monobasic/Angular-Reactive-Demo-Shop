import * as express from 'express';
import { Router } from 'express';

import { auth } from '../controller/auth.controller';
const router = Router();

/* GET api listing. */
router.get('/', auth);

export default router;
