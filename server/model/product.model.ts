import * as mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  id: { type: Number},
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  priceNormal: { type: String },
  reduction: { type: Number},
  imageURLs: { type: Array},
  categories: Array
});

const ProductModel = mongoose.model('Product', productsSchema);

export default ProductModel;
