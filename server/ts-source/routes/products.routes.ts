import productsController from '../controller/products.controller';
import ProductModel from '../model/product.model';

import * as express from 'express';
import { Router } from 'express';
import { catchErrors } from '../errorHandlers';
import { createProduct } from '../controller/products.controller';

const router = Router();

router.get('/', productsController.getProducts);
router.post(
  '/',
  // productsController.log,
  productsController.uploadImages,
  productsController.log,
  catchErrors(productsController.resizeImages),
  productsController.createProduct,
  catchErrors(productsController.addProduct)
);

router.put(
  '/:id',
  productsController.uploadImages,
  productsController.log,
  catchErrors(productsController.resizeImages),
  catchErrors(productsController.updateProduct)
);
router.get('/:id', catchErrors(productsController.getProduct));
router.delete('/:id', catchErrors(productsController.deleteProduct));

export default router;
