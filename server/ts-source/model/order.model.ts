import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

export const orderSchema = new mongoose.Schema({
  customer: { type: Object },
  items: { type: Array},
  paymentMethod: { type: String },
  shippingMethod: { type: String }
});

export const OrderModel = mongoose.model('Orders', orderSchema);
