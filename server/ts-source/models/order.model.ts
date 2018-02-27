import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

export const orderSchema = new mongoose.Schema(
  {
    user: { type: Object },
    customer: { type: Object },
    items: { type: Array },
    paymentMethod: { type: String },
    shippingMethod: { type: String }
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model('Orders', orderSchema);
