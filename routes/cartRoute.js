const express = require('express');
const router = express.Router();
const { errorHandler } = require('../helper/error');
const { validator } = require('../validation/validator');
const { ROLES } = require('../utils/enum');
const { authorization } = require('../middleware/authentication');
const {
  addCartController,
  updateCartController,
  deleteCartController,
  viewCartController,
} = require('../controller/cartController');
const {
  addCartValidation,
  updateCartValidation,
  viewCartValidation,
} = require('../validation/cartValidation');

router.post(
  '/addCart',
  authorization([ROLES.CUSTOMER]),
  validator.body(addCartValidation),
  errorHandler(addCartController),
);

router.put(
  '/updateCart/:id',
  authorization([ROLES.CUSTOMER]),
  validator.body(updateCartValidation),
  errorHandler(updateCartController),
);

router.delete(
  '/deleteCart/:id',
  authorization([ROLES.CUSTOMER]),
  errorHandler(deleteCartController),
);

router.post(
  '/viewCart',
  authorization([ROLES.CUSTOMER]),
  validator.body(viewCartValidation),
  errorHandler(viewCartController),
);
module.exports = router;
