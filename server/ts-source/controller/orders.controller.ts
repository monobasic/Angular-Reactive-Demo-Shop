import * as orderService from '../services/orders.service';
import * as userService from '../services/user.service';

export const getOrders = async (req, res, next) => {
  const user = await userService.findOne({_id: req.user._id});

  const orders = await orderService.findForUser(user);
  console.log(orders);

  res.json({
    message: 'getOrders',
    user: 'user ' + user.id,
    orders: orders
  });
  res.end();
};

export const getOrder = (req, res, next) => {
  req.payload = {};
  req.payload._id = req.params.id;

  res.json({
    message: `get order ${req.params.id} for ${req.payload._id}`
  });
  res.end();
};

export const getAllOrders = async (req, res, next) => {
  const orders = await orderService.findAll();

  res.json({ message: 'get all orders', payload: req.payload, orders: orders });
  res.end();
};

export const createOrder = async (req, res, next) => {
  const order = req.body;
  let orderToSave;

  const user = await userService.findOne({ _id: req.user._id });
  if (user) {
    orderToSave = saveWithUser(order, user, orderToSave, res);
    return;
  } else {

  order.user = {};
  order.user.id = 'unregistred';
  order.user.email = 'unregistred';
  orderToSave = await orderService.save(order);
  res.json({ message: 'created Order', order: orderToSave, user: req.user });
  res.end();
}
};

export const deleteOrder = (req, res, next) => {
  res.json({ message: 'delete Order', payload: req.payload });
  res.end();
};

async function saveWithUser(order, user, orderToSave, res) {
  order.user = {};
  order.user.id = user.id;
  order.user.email = user.email;

  orderToSave = await orderService.save(order);

  user.orders.push(orderToSave._id);

  orderService.saveOrderOnUser(user);

  res.json({ message: 'created order for user ' + orderToSave.user.id, order: orderToSave });
  res.end();
}

