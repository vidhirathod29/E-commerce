const express = require('express');
const router = express.Router();
const { errorHandler } = require('../helper/error');
const { validator } = require('../validation/validator');
const {
  addProductController,
  updateProductController,
  deleteProductController,
  deleteProductImageController,
  viewProductController,
  listOfProductController,
} = require('../controller/productController');
const { ROLES } = require('../utils/enum');
const {
  addProductValidation,
  updateProductValidation,
} = require('../validation/productValidation');
const { listOfDataValidation } = require('../validation/listOfDataValidation');
const { authorization } = require('../middleware/authentication');

router.post(
  '/addProduct',
  authorization([ROLES.ADMIN]),
  validator.body(addProductValidation),
  errorHandler(addProductController),
);

router.put(
  '/updateProduct/:id',
  authorization([ROLES.ADMIN]),
  validator.body(updateProductValidation),
  errorHandler(updateProductController),
);

router.delete(
  '/deleteProduct/:id',
  authorization([ROLES.ADMIN]),
  errorHandler(deleteProductController),
);

router.delete(
  '/deleteProductImage/:id',
  authorization([ROLES.ADMIN]),
  errorHandler(deleteProductImageController),
);

router.get(
  '/viewProduct/:id',
  authorization([ROLES.ADMIN, ROLES.CUSTOMER]),
  errorHandler(viewProductController),
);

router.post(
  '/listOfProduct',
  authorization([ROLES.ADMIN, ROLES.CUSTOMER]),
  validator.body(listOfDataValidation),
  errorHandler(listOfProductController),
);
module.exports = router;
