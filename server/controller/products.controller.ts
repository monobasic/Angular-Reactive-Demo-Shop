const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

import ProductModel from '../model/product.model';

const getProducts = () => {
  return ProductModel.find().exec();
};

const getSingleProduct = (id) => {
  return ProductModel.findOne({ id: id }).exec();
};

const addProduct = (product) => {
  const newProduct = new ProductModel(product);

  return newProduct.save();
};

const deleteProduct = (id, callback) => {
  const query = { _id: id };
};

export default {
  getProducts,
  getSingleProduct,
  addProduct: addProduct
};
