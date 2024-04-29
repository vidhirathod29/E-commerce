const express = require('express');
const router = express.Router();
const { errorHandler } = require('../helper/error');
const { validator } = require('../validation/validator');
const {
  registrationValidation,
  loginValidation,
  updateValidation,
} = require('../validation/authValidation');
const { ROLES } = require('../utils/enum');
const upload = require('../middleware/multer');
const {
  registrationController,
  loginController,
  updateProfileController,
  viewProfileController,
} = require('../controller/authController');
const { authorization } = require('../middleware/authentication');

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

module.exports = router;