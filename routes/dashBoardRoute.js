const express = require('express');
const router = express.Router();
const { errorHandler } = require('../helper/error');
const { ROLES } = require('../utils/enum');
const { authorization } = require('../middleware/authentication');
const {
  countOfUserController,
  countOfTOtalOrderController,
  countOfOrderStatusController,
  countOfTOtalProductsController,
} = require('../controller/dashBoardController');

router.get(
  '/countOfUser',
  authorization([ROLES.ADMIN]),
  errorHandler(countOfUserController),
);

router.get(
  '/countOfTotalOrder',
  authorization([ROLES.ADMIN]),
  errorHandler(countOfTOtalOrderController),
);

router.get(
  '/countOfOrderStatus',
  authorization([ROLES.ADMIN]),
  errorHandler(countOfOrderStatusController),
);

router.get(
  '/countOfTotalProducts',
  authorization([ROLES.ADMIN]),
  errorHandler(countOfTOtalProductsController),
);

module.exports = router;
