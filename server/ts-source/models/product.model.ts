import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

const productsSchema = new mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    priceNormal: { type: String },
    reduction: { type: Number },
    imageURLs: { type: Array },
    categories: Array,
    ratings: Array
  },
  { timestamps: true }
);

productsSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model('Product', productsSchema);

export default ProductModel;
