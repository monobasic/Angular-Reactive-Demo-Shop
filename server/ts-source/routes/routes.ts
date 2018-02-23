import * as express from 'express';
import { Router } from 'express';

import * as jwt from 'express-jwt';
import * as Guard from 'express-jwt-permissions';

import api from '../routes/api.routes';

import { registerUser, loginUser, getProfile, updateUser, deleteUser } from '../controller/users.controller';
import { getOrders, getOrder, createOrder, deleteOrder } from '../controller/orders.controller';
import {
  getProducts,
  getProduct,
  uploadImages,
  resizeImages,
  createProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  log
} from '../controller/products.controller';

const router = Router();

const auth = jwt({
  secret: process.env.SECRET,
  user: 'payload'
});

const guard = Guard();

// api route, just send a sign of life
router.use('/api', api);

/**
 * USER ROUTES
 */
router.get('/api/user', (req, res) => res.redirect('/api/user/profile'));
router.get('/api/user/profile', auth, getProfile);

router.post('/api/user/register', registerUser);
router.post('/api/user/login', loginUser);

router.put('/api/user/:id', auth, updateUser);

router.delete('/api/user/:id', auth, guard.check('admin'), deleteUser);

/**
 * ORDER ROUTES
 */
router.get('/api/orders', auth, getOrders);
router.get('/api/orders/:id', auth, getOrder);

router.post('/api/orders', auth, createOrder);

router.delete('/api/orders/:id', auth, guard.check('admin'), deleteOrder);

/**
 * PRODUCT ROUTES
 */
router.get('/api/products', getProducts);
router.get('/api/products/:id', getProduct);

router.post('/api/products',
  auth,
  guard.check('admin'),
  uploadImages,
  resizeImages,
  createProduct,
  addProduct
);

router.put('/api/products/:id',
  auth,
  guard.check('admin'),
  uploadImages,
  log,
  resizeImages,
  createProduct,
  updateProduct
);

router.delete('/api/products/:id', deleteProduct);

export default router;
