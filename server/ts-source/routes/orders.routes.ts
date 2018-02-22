import * as express from 'express';
import { Router } from 'express';
import { getOrders, getOrder, createOrder } from '../controller/orders.controller';

const router = Router();

router.get('/', getOrders);

router.get('/:id', getOrder);

router.post('/', createOrder);

export default router;
