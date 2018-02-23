import * as express from 'express';
import { Router } from 'express';
import {
  getOrders,
  getOrder,
  createOrder
} from '../controller/orders.controller';

import * as Guard from 'express-jwt-permissions';
const guard = Guard();

import * as jwt from 'express-jwt';
const auth = jwt({
  secret: process.env.SECRET,
  user: 'payload'
});

const router = Router();

router.get('/', auth, getOrders);

router.get('/:id', auth, getOrder);

router.post('/', auth, createOrder);

export default router;
