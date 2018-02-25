import * as orderService from '../services/orders.service';
import * as userService from '../services/user.service';

export const getOrders = async (req, res, next) => {
  try {
    const user = await userService.findOne({ _id: req.user._id });

    const orders = await orderService.findForUser(user);

    res.json({
      message: 'getOrders',
      user: 'user ' + user.id,
      orders: orders
    });
    res.end();
  } catch (error) {
    handleOrderError(error, res);
  }
};

export const getOrder = (req, res, next) => {
  try {
    req.payload = {};
    req.payload._id = req.params.id;

    res.json({
      message: `get order ${req.params.id} for ${req.payload._id}`
    });
    res.end();
  } catch (error) {
    handleOrderError(error, res);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.findAll();

    res.json({
      sucess: true,
      orders: orders
    });
    res.end();
  } catch (error) {
    handleOrderError(error, res);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const order = req.body;
    let orderToSave;

    if (req.user) {
      const user = await userService.findOne({ _id: req.user._id });
      saveWithUser(order, user, res);
      return;
    } else {
      order.user = {};
      order.user.id = 'unregistred';
      order.user.email = 'unregistred';
      orderToSave = await orderService.save(order);
      res.json({
        message: 'created Order',
        order: orderToSave,
        user: req.user
      });
      res.end();
    }
  } catch (error) {
    handleOrderError(error, res);
  }
};

export const deleteOrder = (req, res, next) => {
  try {
    res.json({ message: 'delete Order', payload: req.payload });
    res.end();
  } catch (error) {
    handleOrderError(error, res);
  }
};

async function saveWithUser(order, user, res) {
  try {
    order.user = {};
    order.user.id = user._id;
    order.user.email = user.email;

    const orderToSave = await orderService.save(order);

    user.orders.push(orderToSave._id);

    orderService.saveOrderOnUser(user);

    res.json({
      user: orderToSave.user,
      order: orderToSave,
      success: true
    });
    res.end();
  } catch (error) {
    handleOrderError(error, res);
  }
}

const handleOrderError = (error, res) => {
  res.status(503).json({
    message:
      'Could not connect to the database. This is likely a temporary problem. Try again.',
    error: JSON.stringify(error.message),
    succsess: false
  });
  res.end();
};
