import * as express from 'express';
import { Router } from 'express';
import * as jwt from 'express-jwt';

import { adminAuth } from '../controller/admin-auth.controller';
const router = Router();

const auth = jwt({
  secret: process.env.SECRET /*'MY_SECRET'*/,
  userProperty: 'payload'
});


/* GET api listing. */
router.get('/', /* auth,*/ adminAuth);

export default router;
