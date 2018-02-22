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

const router = Router();

router.get('/', getProducts);
router.post('/',
  uploadImages,
  resizeImages,
  createProduct,
  addProduct
);

router.get('/:id', getProduct);
router.delete('/:id', deleteProduct);
router.put('/:id',
  uploadImages,
  log,
  resizeImages,
  createProduct,
  updateProduct
);


export default router;
