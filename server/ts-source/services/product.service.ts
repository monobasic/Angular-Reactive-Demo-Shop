import ProductModel from '../model/product.model';

export const find = () => {
  return ProductModel.find().exec();
};

export const findOne = (id) => {
  return ProductModel.findOne({ id: id }).exec();
};

export const save = (product) => {
  const newProduct = new ProductModel(product);

  return newProduct.save();
};

export const remove = (id, callback) => {
  const query = { _id: id };
};

