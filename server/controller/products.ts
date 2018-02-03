import ProductModel from '../model/product.model';

const getProducts = () => {
  return ProductModel.find().exec();
};

const addProduct = (newProduct) => {
  return newProduct.save();
};

const deleteProduct = (id, callback) => {
  const query = { _id: id };
};

export default {
  getProducts: getProducts,
  addProduct: addProduct
};
