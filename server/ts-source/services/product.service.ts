import ProductModel from '../model/product.model';

export const find = () => {
  return ProductModel.find().exec();
};

export const findOne = (id) => {
  return ProductModel.findOne({ id: id }).exec();
};

export const save = (product) => {
  console.log('SAVE PRODUCT', product);

  const newProduct = new ProductModel(product);

  return newProduct.save();
};

export const update = (product) => {
  return ProductModel.findOneAndUpdate({ id: product.id }).exec();
};

export const remove = (id, callback) => {
  const query = { _id: id };
};

