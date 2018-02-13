import productsController from '../controller/products.controller';
import ProductModel from '../model/product.model';

import * as express from 'express';
import { Router } from 'express';

const router = Router();

router.get('/', productsController.getProducts);
router.post('/',
  productsController.uploadImages,
  productsController.resizeImages,
  productsController.addProduct
);

router.get('/:id', productsController.getProduct);
router.delete('/:id', productsController.deleteProduct);

export default router;
