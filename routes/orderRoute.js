const express = require('express');
const router = express.Router();
const { errorHandler } = require('../helper/error');
const {
  placeOrderController,
  updateOrderStatusController,
  cancelOrderController,
  listOfOrderController,
  viewOrderController,
} = require('../controller/orderController');
const { validator } = require('../validation/validator');
const {
  placeOrderValidation,
  updateOrderStatusValidation,
} = require('../validation/orderValidation');
const { listOfDataValidation } = require('../validation/listOfDataValidation');
const { ROLES } = require('../utils/enum');
const { authorization } = require('../middleware/authentication');

router.post(
  '/placeOrder',
  authorization([ROLES.CUSTOMER]),
  validator.body(placeOrderValidation),
  errorHandler(placeOrderController),
);

router.put(
  '/updateOrderStatus/:id',
  authorization([ROLES.ADMIN]),
  validator.body(updateOrderStatusValidation),
  errorHandler(updateOrderStatusController),
);

router.delete(
  '/cancelOrder/:id',
  authorization([ROLES.ADMIN]),
  errorHandler(cancelOrderController),
);

router.post(
  '/listOfOrder',
  authorization([ROLES.ADMIN, ROLES.CUSTOMER]),
  validator.body(listOfDataValidation),
  errorHandler(listOfOrderController),
);

router.get(
  '/viewOrder/:id',
  authorization([ROLES.ADMIN, ROLES.CUSTOMER]),
  errorHandler(viewOrderController),
);
module.exports = router;
