const express = require('express');
const router = express.Router();
const { errorHandler } = require('../helper/error');
const { validator } = require('../validation/validator');
const {
  resetPasswordValidation,
  verifyEmailValidation,
  updatePasswordValidation,
} = require('../validation/authValidation');
const { ROLES } = require('../utils/enum');
const {
  resetPassword,
  verifyEmail,
  updatePassword,
} = require('../controller/authController');
const { authorization } = require('../middleware/authentication');

router.put(
  '/resetPassword',
  authorization([ROLES.ADMIN, ROLES.CUSTOMER]),
  validator.body(resetPasswordValidation),
  errorHandler(resetPassword),
);

router.post(
  '/verifyEmail',
  validator.body(verifyEmailValidation),
  errorHandler(verifyEmail),
);

router.put(
  '/updatePassword',
  validator.body(updatePasswordValidation),
  errorHandler(updatePassword),
);
module.exports = router;