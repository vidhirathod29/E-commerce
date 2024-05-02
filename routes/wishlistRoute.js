const express = require('express');
const router = express.Router();
const { errorHandler } = require('../helper/error');
const { validator } = require('../validation/validator');
const { authorization } = require('../middleware/authentication');
const {
  addWishlistController,
  deleteWishlistController,
  listOfWishlistController,
} = require('../controller/wishlistController');
const {
  addWishlistValidation,
  listOfWishlistValidation,
} = require('../validation/wishlistValidation');
const { ROLES } = require('../utils/enum');

router.post(
  '/addWishlist',
  authorization([ROLES.CUSTOMER]),
  validator.body(addWishlistValidation),
  errorHandler(addWishlistController),
);

router.delete(
  '/deleteWishlist/:id',
  authorization([ROLES.CUSTOMER]),
  errorHandler(deleteWishlistController),
);

router.post(
  '/listOfWishlist',
  authorization([ROLES.CUSTOMER]),
  validator.body(listOfWishlistValidation),
  errorHandler(listOfWishlistController),
);

module.exports = router;
