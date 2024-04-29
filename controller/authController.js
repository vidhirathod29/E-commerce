const {
  registration,
  login,
  updateProfile,
  viewProfile,
  resetPassword,
  verifyEmail,
  updatePassword,
} = require('../service/authService');

module.exports = {
  registrationController: (req, res, next) => {
    return registration(req, res, next);
  },
  loginController: (req, res, next) => {
    return login(req, res, next);
  },
  updateProfileController: (req, res, next) => {
    return updateProfile(req, res, next);
  },
  viewProfileController: (req, res, next) => {
    return viewProfile(req, res, next);
  },
  resetPasswordController: (req, res, next) => {
    return resetPassword(req, res, next);
  },
  verifyEmailController: (req, res, next) => {
    return verifyEmail(req, res, next);
  },
  updatePasswordController: (req, res, next) => {
    return updatePassword(req, res, next);
  },
};