const {
  addCart,
  updateCart,
  deleteCart,
  viewCart,
} = require('../service/cartService');

module.exports = {
  addCartController: (req, res, next) => {
    return addCart(req, res, next);
  },

  updateCartController: (req, res, next) => {
    return updateCart(req, res, next);
  },

  deleteCartController: (req, res, next) => {
    return deleteCart(req, res, next);
  },

  viewCartController: (req, res, next) => {
    return viewCart(req, res, next);
  },
};