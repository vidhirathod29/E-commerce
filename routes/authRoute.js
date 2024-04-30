const express = require('express');
const router = express.Router();
const { errorHandler } = require('../helper/error');
const { validator } = require('../validation/validator');
const {
  registrationValidation,
  loginValidation,
  updateValidation,
  resetPasswordValidation,
  verifyEmailValidation,
  updatePasswordValidation,
} = require('../validation/authValidation');
const { ROLES } = require('../utils/enum');
const {
  registrationController,
  loginController,
  updateProfileController,
  viewProfileController,
  resetPasswordController,
  verifyEmailController,
  updatePasswordController,
} = require('../controller/authController');
const { authorization } = require('../middleware/authentication');
const upload = require('../middleware/multer');

router.post(
  '/registration',
  upload.single('profile_image'),
  validator.body(registrationValidation),
  errorHandler(registrationController),
);

router.post(
  '/login',
  validator.body(loginValidation),
  errorHandler(loginController),
);

router.put(
  '/editProfile',
  authorization([ROLES.ADMIN, ROLES.CUSTOMER]),
  upload.single('profile_image'),
  validator.body(updateValidation),
  errorHandler(updateProfileController),
);

router.get(
  '/viewProfile',
  authorization([ROLES.ADMIN, ROLES.CUSTOMER]),
  errorHandler(viewProfileController),
);

router.put(
  '/resetPassword',
  authorization([ROLES.ADMIN, ROLES.CUSTOMER]),
  validator.body(resetPasswordValidation),
  errorHandler(resetPasswordController),
);

router.post(
  '/verifyEmail',
  validator.body(verifyEmailValidation),
  errorHandler(verifyEmailController),
);

router.put(
  '/updatePassword',
  validator.body(updatePasswordValidation),
  errorHandler(updatePasswordController),
);

module.exports = router;