import { find, findOne, save } from '../services/orders.service';

export const getOrders = async (req, res, next) => {
  const user = await find(req.user._id);

  if (user) {
    req.body.customer._id = user.id;
    req.body.customer.email = user.email || req.body.customer.email;
  }

  const items = req.body.items.map(item => {
    return {
      amount: item.amount,
      product: item.product.name
    };
  });

  const order = {
    customer: req.body.customer,
    items: items,
    paymentMethod: req.body.paymentMethod,
    shippingMethod: req.body.shippingMethod
  };

  res.json({ message: 'getOrders', user: 'user ' + user.id, payload: req.user , order});
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

export const getAllOrders = (req, res, next) => {
  res.json({ message: 'get all orders', payload: req.payload });
};

export const createOrder = (req, res, next) => {
  res.json({ message: 'create Order', payload: req.payload });
  res.end();
};

export const deleteOrder = (req, res, next) => {
  res.json({ message: 'delete Order', payload: req.payload });
  res.end();
};
