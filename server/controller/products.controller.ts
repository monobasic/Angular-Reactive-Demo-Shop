import { find, findOne, save, remove } from '../services/product.service';

import ProductModel from '../model/product.model';

export const getProducts = async (req, res, next) => {
  console.log('getting products remotely');

  try {
    const products = await find();

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
};

export const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await findOne(id);

    res.write(JSON.stringify(product, null, 2));
    res.end();
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (req, res, next) => {
  const product = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    priceNormal: req.body.priceNormal,
    reduction: req.body.reduction,
    imageURLs: req.body.imageURLs,
    categories: req.body.categoryIDs
  };

  try {
    const dbResponse = await save(product);

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
};

export const deleteProduct = (req, res, next) => {
  res.send(req.params.id + ' to delete...');
};

export default {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct
};
