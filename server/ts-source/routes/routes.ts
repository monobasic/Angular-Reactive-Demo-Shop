import * as express from 'express';
import { Router } from 'express';
import * as jwt from 'express-jwt';

import api from './api.routes';
import user from './user.routes';
import products from './/products.routes';

const router = Router();

const auth = jwt({
  secret: process.env.SECRET,
  userProperty: 'payload'
});

// api routes.
router.use('/api', api);
router.use('/api/user', auth, user);
router.use('/api/products', products);

export default router;
