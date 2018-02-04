import productsController from '../controller/products.controller';
import ProductModel from '../model/product.model';

import * as express from 'express';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res, next) => {
  console.log('getting products remotely');

  try {
    const products = await productsController.getProducts();

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

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await productsController.getSingleProduct(id);

    res.write(JSON.stringify(product, null, 2));
    res.end();
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res, next) => {
  const product = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageURLs: req.body.imageURLs,
    sizes: req.body.sizes,
    colors: req.body.colors,
    categoryIDs: req.body.categoryIDs
  };

  try {
    const dbResponse = await productsController.addProduct(product);

    const answer = {
      success: true,
      message: `Added successfully item with id ${dbResponse.id}`
    };

    res.json(answer);
    res.end();
  } catch (error) {
    const answer = {
      success: false,
      message: `Failed to create a new product. Error: ${error}`
    };
    res.json(answer);
    res.end();
  }
});

router.delete('/:id', (req, res, next) => {
  res.send(req.params.id + ' to delete...');
});

export default router;
