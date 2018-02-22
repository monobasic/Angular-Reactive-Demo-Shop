import { find, findOne, save} from '../services/orders.service';

export const getOrders = (req, res, next) => {
  res.json({ message: 'getOrders', payload: req.payload });
  res.end();
};

export const getOrder = (req, res, next) => {
  console.log(req.payload);
  res.json({
    message: `get order ${req.params.id} for ${req.payload._id}`
  });
  res.end();
};

export const createOrder = (req, res, next) => {
  res.json({ message: 'createOrder', payload: req.payload });
  res.end();
};
