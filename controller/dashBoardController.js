const {
  countOfUser,
  countOfTOtalOrder,
  countOfOrderStatus,
  countOfTOtalProducts,
} = require('../service/dashBoardService');

module.exports = {
  countOfUserController: (req, res, next) => {
    return countOfUser(req, res, next);
  },

  countOfTOtalOrderController: (req, res, next) => {
    return countOfTOtalOrder(req, res, next);
  },

  countOfOrderStatusController: (req, res, next) => {
    return countOfOrderStatus(req, res, next);
  },

  countOfTOtalProductsController: (req, res, next) => {
    return countOfTOtalProducts(req, res, next);
  },
};
