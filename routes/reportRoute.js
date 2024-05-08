const express = require('express');
const router = express.Router();
const { errorHandler } = require('../helper/error');
const { validator } = require('../validation/validator');
const {
  orderReportController,
  productReportController,
} = require('../controller/reportController');
const { authorization } = require('../middleware/authentication');
const { ROLES } = require('../utils/enum');
const {
  orderReportValidation,
  productReportValidation,
} = require('../validation/reportValidation');

router.post(
  '/orderReport',
  authorization([ROLES.ADMIN]),
  validator.body(orderReportValidation),
  errorHandler(orderReportController),
);

router.post(
  '/productReport',
  authorization([ROLES.ADMIN]),
  validator.body(productReportValidation),
  errorHandler(productReportController),
);

module.exports = router;
