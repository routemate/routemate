const User = require('../models/userModel.js');

const orderController = {};

orderController.getOrders = (req, res, next) => {
  /*TODO:*/ const email = 'toBeChangedLater';
  User.findOne({ email }, 'orders')
    .then((orders) => {
      console.log(`All orders for ${email}:`, orders);
      res.locals.orders = orders;
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
  const { item, orderDate, vendor, trackingId, eta } = req.body;
  const newOrder = { item, orderDate, vendor, trackingId, eta };
  /*TODO:*/ const email = 'toBeChangedLater';
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

/*for updateOrders, destrcutured all order properties and stored in a new object, then pushed that object into db because taking the whole order object from the req.body will allow for someone to input garbage data in post request.*/

module.exports = orderController;

// item, orderDate, vendor, trackingId, eta
