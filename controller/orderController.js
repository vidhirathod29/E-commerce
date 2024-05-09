const {
  placeOrder,
  updateOrderStatus,
  cancelOrder,
  listOfOrder,
  viewOrder
} = require('../service/orderService');

module.exports = {
  placeOrderController: (req, res, next) => {
    return placeOrder(req, res, next);
  },

  updateOrderStatusController: (req, res, next) => {
    return updateOrderStatus(req, res, next);
  },

  cancelOrderController: (req, res, next) => {
    return cancelOrder(req, res, next);
  },

  listOfOrderController: (req, res, next) => {
    return listOfOrder(req, res, next);
  },

  viewOrderController: (req, res, next) => {
    return viewOrder(req, res, next);
  },
};
