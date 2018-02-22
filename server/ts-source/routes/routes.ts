import * as express from 'express';
import { Router } from 'express';
import * as jwt from 'express-jwt';

import api from './api.routes';
import users from './user.routes';
import products from './/products.routes';
import adminAuth from './/admin-auth.routes';

const router = Router();

const auth = jwt({
  secret: process.env.SECRET,
  userProperty: 'payload'
});

// api routes.
router.use('/api', api);
router.use('/api/user', auth, users);
router.use('/api/products', products);

export default router;
