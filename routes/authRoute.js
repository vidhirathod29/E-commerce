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
  registration,
  login,
  updateProfile,
  viewProfile,
  resetPassword,
  verifyEmail,
  updatePassword,
} = require('../controller/authController');
const { authorization } = require('../middleware/authentication');
const upload = require('../middleware/multer');

router.post(
  '/registration',
  upload.single('profile_image'),
  validator.body(registrationValidation),
  errorHandler(registration),
);

router.post('/login', validator.body(loginValidation), errorHandler(login));

router.put(
  '/editProfile',
  authorization([ROLES.ADMIN, ROLES.CUSTOMER]),
  upload.single('profile_image'),
  validator.body(updateValidation),
  errorHandler(updateProfile),
);

router.get(
  '/viewProfile',
  authorization([ROLES.ADMIN, ROLES.CUSTOMER]),
  errorHandler(viewProfile),
);
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