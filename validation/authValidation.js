const Joi = require('joi');

module.exports = {
  resetPasswordValidation: Joi.object({
    oldPassword: Joi.string()
      .min(8)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
      )
      .empty()
      .required()
      .messages({
        'string.base': `Old password should be type of string`,
        'string.pattern.base': `Old password must include at least one uppercase letter, one lowercase letter, one digit, and one special character`,
        'string.empty': `Old password cannot be an empty field`,
        'any.required': `Old password is a required field`,
      }),
    newPassword: Joi.string()
      .min(8)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
      )
      .empty()
      .required()
      .messages({
        'string.base': `New password should be type of string`,
        'string.pattern.base': `New password must include at least one uppercase letter, one lowercase letter, one digit, and one special character`,
        'string.empty': `New password cannot be an empty field`,
        'any.required': `New password is a required field`,
      }),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).messages({
      'string.base': `Confirm password should be a type of 'text'.`,
      'any.only': `Confirm password doesn't match the password.`,
      'any.required': `Confirm password is a required field.`,
    }),
  }),

  verifyEmailValidation: Joi.object({
    email: Joi.string()
      .max(50)
      .optional()
      .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
      .messages({
        'string.base': `Email should be a type of string`,
        'string.pattern.base"': `Email should be in proper formate`,
      }),
  }),

  updatePasswordValidation: Joi.object({
    email: Joi.string()
      .max(50)
      .optional()
      .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
      .messages({
        'string.base': `Email should be a type of string`,
        'string.pattern.base"': `Email should be in proper formate`,
      }),
    otp: Joi.string().min(6).max(50).empty().messages({
      'string.empty': `Otp cannot be an empty field`,
      'string.min': `Otp should contain 6 digits`,
      'any.required': `Otp is a required field`,
    }),
    newPassword: Joi.string()
      .min(8)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
      )
      .empty()
      .required()
      .messages({
        'string.base': `New password should be type of string`,
        'string.pattern.base': `New password must include at least one uppercase letter, one lowercase letter, one digit, and one special character`,
        'string.empty': `New password cannot be an empty field`,
        'any.required': `New password is a required field`,
      }),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).messages({
      'string.base': `Confirm password should be a type of 'text'.`,
      'any.only': `Confirm password doesn't match the password.`,
      'any.required': `Confirm password is a required field.`,
    }),
  }),
};