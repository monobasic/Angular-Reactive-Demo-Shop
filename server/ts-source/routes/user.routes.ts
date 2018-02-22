import * as express from 'express';
import * as jwt from 'express-jwt';
import { Router } from 'express';
import { adminAuth } from '../controller/admin-auth.controller';
import { register, login } from '../controller/authentication.controller';

const router = Router();

/* GET api listing. */
router.get('/', (req, res) => res.redirect('/api/user/profile'));

router.use('/admin-auth', adminAuth);

router.post('/register', register);

router.post('/login', login);

router.get('/profile', function getProfile(req, res, next) { res.json({message: 'get profile'}); res.end(); });

router.get('/orders', function getOrders(req, res, next) {res.json({message: 'getOrders'}); res.end(); });

router.get('/orders/:id', function getOrder(req, res, next) {
  console.log(req.payload);
  res.json({
    message: 'get order ' + req.params.id + ' for ' + req.payload._id
  });
  res.end();
});

router.post('/orders', function createOrder(req, res, next) {res.json({message: 'createOrder'}); res.end(); });

export default router;
