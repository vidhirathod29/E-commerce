const express = require('express');
const router = express.Router();
const { errorHandler } = require('../helper/error');
const { validator } = require('../validation/validator');
const {
  addProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
  viewProduct,
  listOfProduct,
} = require('../controller/productController');
const { ROLES } = require('../utils/enum');
const {
  addProductValidation,
  updateProductValidation,
  viewProductValidation,
} = require('../validation/productValidation');
const { authorization } = require('../middleware/authentication');

router.post(
  '/addProduct',
  authorization([ROLES.ADMIN]),
  validator.body(addProductValidation),
  errorHandler(addProduct),
);

router.put(
  '/updateProduct/:id',
  authorization([ROLES.ADMIN]),
  validator.body(updateProductValidation),
  errorHandler(updateProduct),
);

router.delete(
  '/deleteProduct/:id',
  authorization([ROLES.ADMIN]),
  errorHandler(deleteProduct),
);

router.delete(
  '/deleteProductImage/:id',
  authorization([ROLES.ADMIN]),
  errorHandler(deleteProductImage),
);

router.get(
  '/viewProduct/:id',
  authorization([ROLES.ADMIN, ROLES.CUSTOMER]),
  validator.body(viewProductValidation),
  errorHandler(viewProduct),
);

router.post(
  '/listOfProduct',
  authorization([ROLES.ADMIN, ROLES.CUSTOMER]),
  errorHandler(listOfProduct),
);
module.exports = router;