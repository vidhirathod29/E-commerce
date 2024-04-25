const {
  resetPassword,
  verifyEmail,
  updatePassword,
} = require('../service/authService');

module.exports = {
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