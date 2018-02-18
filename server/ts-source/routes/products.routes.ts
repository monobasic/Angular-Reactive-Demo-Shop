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
  catchErrors(uploadImages),
  catchErrors(log),
  catchErrors(resizeImages),
  catchErrors(createProduct),
  catchErrors(addProduct)
);

router.get('/:id', catchErrors(getProduct));
router.delete('/:id', catchErrors(deleteProduct));
router.put('/:id',
  catchErrors(uploadImages),
  catchErrors(log),
  catchErrors(resizeImages),
  catchErrors(updateProduct)
);


export default router;
