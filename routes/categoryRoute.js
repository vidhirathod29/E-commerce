const express = require('express');
const router = express.Router();
const { errorHandler } = require('../helper/error');
const {
  addUpdateCategory,
  deleteCategory,
  listOfCategory,
} = require('../controller/categoryController');
const { validator } = require('../validation/validator');
const {
  addCategoryValidation,
  updateCategoryValidation,
  listOfCategoryValidation,
} = require('../validation/categoryValidation');
const { ROLES } = require('../utils/enum');
const { authorization } = require('../middleware/authentication');

router.post(
  '/addCategory',
  authorization([ROLES.ADMIN]),
  validator.body(addCategoryValidation),
  errorHandler(addUpdateCategory),
);

router.put(
  '/updateCategory/:id',
  authorization([ROLES.ADMIN]),
  validator.body(updateCategoryValidation),
  errorHandler(addUpdateCategory),
);

router.delete(
  '/deleteCategory/:id',
  authorization([ROLES.ADMIN]),
  errorHandler(deleteCategory),
);

router.post(
  '/listOfCategory',
  authorization([ROLES.ADMIN, ROLES.CUSTOMER]),
  validator.body(listOfCategoryValidation),
  errorHandler(listOfCategory),
);

module.exports = router;