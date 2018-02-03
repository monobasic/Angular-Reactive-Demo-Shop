import * as mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  imageURLs: { type: Array},
  sizes: { type: Array},
  colors: { type: Array},
  categoryIDs: Array
});

const ProductModel = mongoose.model('Product', productsSchema);

export default ProductModel;
