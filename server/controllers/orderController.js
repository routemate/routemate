const User = require('../models/userModel.js');

const orderController = {};

orderController.getOrders = (req, res, next) => {
  const token = req.cookies.token;
  const secret = 'mushrathahmedjihue';

  const decoded = jwt.verify(token, secret);
  const email = decoded.email;

  console.log('decoded', decoded);

  User.findOne({ email })
    .then((user) => {
      console.log(`All orders for ${email}:`, user.orders);
      console.log(`NAME:`, user.name);

      res.locals.orders = user.orders;
      res.locals.name = user.name;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next({
        log: 'Error in orderController.getOrders findOne',
        status: 500,
        message: { err: 'Error attaining orders' },
      });
    });
};

orderController.updateOrders = (req, res, next) => {
  const { item, orderDate, vendor, trackingId, eta, status } = req.body;
  const newOrder = { item, orderDate, vendor, trackingId, eta, status };

  res.cookie();
  User.updateOne({ email }, { $push: { orders: newOrder } })
    .then(next)
    .catch((err) => {
      console.log(err);
      return next({
        log: 'Error in orderController.updateOrders',
        status: 500,
        message: { err: 'Error updating user orders' },
      });
    });
};

module.exports = orderController;
