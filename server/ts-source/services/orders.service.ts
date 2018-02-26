import * as mongoose from 'mongoose';

import { UserModel } from '../models/user.model';
import { OrderModel } from '../models/order.model';

export const findForUser = async (user) => {
  return OrderModel.find({'user.email': user.email}).exec();
};

export const findAll = async () => {
  return OrderModel.find({});
};

export const findOne = (id) => {
  return OrderModel.findById(id);
};

export const save = async (order) => {
  const orderToSave = new OrderModel(order);
  return await orderToSave.save();
};

export const saveOrderOnUser = (user) => {
  return UserModel.findByIdAndUpdate(user._id, {
    orders: user.orders
  }).exec();
};

export default {
  findForUser,
  findOne,
  saveOrderOnUser,
  save
};
