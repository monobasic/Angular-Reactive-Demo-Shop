import * as express from 'express';
import * as jwt from 'express-jwt';
import { Router } from 'express';
import { adminAuth } from '../controller/admin-auth.controller';
import { register, login } from '../controller/authentication.controller';

const router = Router();

router.use('/admin-auth', adminAuth);

router.post('/register', register);
router.post('/login', login);
router.get('/profile', function getProfile(req, res, next) { res.json({message: 'get profile'}); res.end(); });

router.get('/order', function getOrders(req, res, next) {res.json({message: 'getOrders'}); res.end(); });
router.get('/order/:id', function getOrder(req, res, next) {res.json({message: 'get order'}); res.end(); });
router.post('/order', function createOrder(req, res, next) {res.json({message: 'createOrder'}); res.end(); });

/* GET api listing. */
router.get('/', adminAuth);

export default router;
