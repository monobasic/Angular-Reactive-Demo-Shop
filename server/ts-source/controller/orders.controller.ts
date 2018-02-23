import { find, findOne, save } from '../services/orders.service';

export const getOrders = (req, res, next) => {
  res.json({ message: 'getOrders', payload: req.payload });
  res.end();
};

export const getOrder = (req, res, next) => {
  console.log(req.payload);
  console.log(req.params.id);
  req.payload = {};
  req.payload._id = req.params.id;

  res.json({
    message: `get order ${req.params.id} for ${req.payload._id}`
  });
  res.end();
};

export const createOrder = (req, res, next) => {
  res.json({ message: 'create Order', payload: req.payload });
  res.end();
};

export const deleteOrder = (req, res, next) => {
  res.json({ message: 'delete Order', payload: req.payload });
  res.end();
};
