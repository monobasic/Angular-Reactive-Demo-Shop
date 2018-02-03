import productsController from '../controller/products';
import ProductModel from '../model/product.model';

import * as express from 'express';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res, next) => {
  console.log('getting products remotely');

  try {
    const products = await productsController.getProducts();
/*
    const response = {
      products,
      success: true
    };
*/
    res.write(JSON.stringify(products, null, 2));
    res.end();

  } catch (error) {
      const response = {
        success: false,
        message: `Failed to load products. Error: ${error}`
      };

      res.json(JSON.stringify(response));

    res.end();
  }
});

router.post('/', async (req, res, next) => {
  const newProduct = new ProductModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageURLs: req.body.imageURLs,
    sizes: req.body.sizes,
    colors: req.body.colors,
    categoryIDs: req.body.categoryIDs
  });

  try {
    const dbResponse = await productsController.addProduct(newProduct);

    const answer = {
      success: true,
      message: `Added successfully item with id ${dbResponse.id}`
    };

    res.json(answer);
    res.end();
  } catch (error) {
    const answer = {
      success: false,
      message: `Failed to create a new list. Error: ${error}`
    };
    res.json(answer);
    res.end();
  }

});

router.delete('/:id', (req, res, next) => {
  res.send(req.params.id + ' to delete...');
});

export default router;
