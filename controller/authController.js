const {
  registration,
  login,
  updateProfile,
  viewProfile,
} = require('../service/authService');

module.exports = {
  registrationController: async (req, res, next) => {
    return registration(req, res, next);
  },
  loginController: async (req, res, next) => {
    return login(req, res, next);
  },
  updateProfileController: async (req, res, next) => {
    return updateProfile(req, res, next);
  },
  viewProfileController: async (req, res, next) => {
    return viewProfile(req, res, next);
  },
};