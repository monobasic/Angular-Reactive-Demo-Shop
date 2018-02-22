import * as express from 'express';
import { Router } from 'express';

import { adminAuth } from '../controller/admin-auth.controller';
import { register, login } from '../controller/authentication.controller';
import orders from './orders.routes';

const router = Router();

router.use('/admin-auth', adminAuth);

router.use('/orders', orders);

/* GET api listing. */
router.get('/', (req, res) => res.redirect('/api/user/profile'));

router.post('/register', register);

router.post('/login', login);

router.get('/profile', function getProfile(req, res, next) {
  res.json({ message: 'get profile', payload: req.payload });
  res.end();
});

export default router;
