const {
  registration,
  login,
  updateProfile,
  viewProfile,
} = require('../service/authService');

module.exports = {
  registration: async (req, res, next) => {
    await registration(req, res, next);
  },
  login: async (req, res, next) => {
    await login(req, res, next);
  },
  updateProfile: async (req, res, next) => {
    await updateProfile(req, res, next);
  },
  viewProfile: async (req, res, next) => {
    await viewProfile(req, res, next);
  },
};