import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  uploadImages,
  resizeImages,
  createProduct,
  deleteProduct,
  log
} from '../controller/products.controller';
import ProductModel from '../model/product.model';

import * as express from 'express';
import { Router } from 'express';
import { catchErrors } from '../errorHandlers';

import * as jwt from 'express-jwt';
const auth = jwt({
  secret: process.env.SECRET,
  user: 'payload'
});

import * as Guard from 'express-jwt-permissions';
const guard = Guard();

const router = Router();

/**
 * public routes
 */
router.get('/', getProducts);
router.get('/:id', getProduct);

/**
 * from here on, you need admin-rights
 */
router.post(
  '/',
  // auth,
  // guard.check('admin'),
  uploadImages,
  resizeImages,
  createProduct,
  addProduct
);

router.delete(
  '/:id',
  // auth,
  // guard.check('admin'),
  deleteProduct
);

router.put(
  '/:id',
  // auth,
  // guard.check('admin'),
  uploadImages,
  log,
  resizeImages,
  createProduct,
  updateProduct
);

export default router;
