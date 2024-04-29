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
  resetPassword: async (req, res, next) => {
    await resetPassword(req, res, next);
  },
  verifyEmail: async (req, res, next) => {
    await verifyEmail(req, res, next);
  },
  updatePassword: async (req, res, next) => {
    await updatePassword(req, res, next);
  },
};
