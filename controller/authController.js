const {
  registration,
  login,
  updateProfile,
  viewProfile,
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
};