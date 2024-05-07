const express = require('express');
const router = express.Router();
const { errorHandler } = require('../helper/error');
const {
  addUpdateCategoryController,
  deleteCategoryController,
  listOfCategoryController,
} = require('../controller/categoryController');
const { validator } = require('../validation/validator');
const {
  addCategoryValidation,
  updateCategoryValidation,
} = require('../validation/categoryValidation');
const { listOfDataValidation } = require('../validation/listOfDataValidation');
const { ROLES } = require('../utils/enum');
const { authorization } = require('../middleware/authentication');

router.post(
  '/addCategory',
  authorization([ROLES.ADMIN]),
  validator.body(addCategoryValidation),
  errorHandler(addUpdateCategoryController),
);

router.put(
  '/updateCategory/:id',
  authorization([ROLES.ADMIN]),
  validator.body(updateCategoryValidation),
  errorHandler(addUpdateCategoryController),
);

router.delete(
  '/deleteCategory/:id',
  authorization([ROLES.ADMIN]),
  errorHandler(deleteCategoryController),
);

router.post(
  '/listOfCategory',
  authorization([ROLES.ADMIN, ROLES.CUSTOMER]),
  validator.body(listOfDataValidation),
  errorHandler(listOfCategoryController),
);

module.exports = router;