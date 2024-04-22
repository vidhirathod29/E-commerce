const Joi = require('joi');
const { ROLES, GENDER } = require('../utils/enum');

module.exports = {
  registrationValidation: Joi.object({
    name: Joi.string().min(3).max(30).empty().required().messages({
      'string.base': `Name should be a type of string`,
      'string.empty': `Name cannot be an empty field`,
      'any.required': `Name is a required field`,
    }),
    email: Joi.string()
      .max(50)
      .empty()
      .required()
      .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
      .messages({
        'string.base': `Email should be a type of string`,
        'string.empty': `Email cannot be an empty field`,
        'string.pattern.base"': `Email should be in proper formate`,
        'any.required': `Email is a required field`,
      }),
    password: Joi.string()
      .min(8)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
      )
      .max(250)
      .empty()
      .required()
      .messages({
        'string.base': `Password should be a type of string`,
        'string.min': `Password should contain at least 8 characters `,
        'string.pattern.base': `Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character`,
        'string.empty': `Password cannot be an empty field`,
        'any.required': `Password is a required field`,
      }),
    confirm_password: Joi.valid(Joi.ref('password'))
      .empty()
      .required()
      .messages({
        'any.only': `Confirm password and password should be same`,
        'string.empty': `"Confirm password should not be empty`,
        'any.required': `Confirm password is a required field`,
      }),
    phone_number: Joi.string().empty().required().messages({
      'string.base': `Phone number should be a type of string`,
      'string.empty': `Phone number should not be empty`,
      'any.required': `Phone number is a required field`,
    }),
    gender: Joi.string()
      .valid(GENDER.FEMALE, GENDER.MALE)
      .empty()
      .required()
      .messages({
        'string.base': `Gender should be a type of string`,
        'any.only': `Gender must be a ${GENDER.FEMALE} or ${GENDER.MALE} `,
        'string.empty': `Gender should not be empty`,
        'any.required': `Gender is a required field`,
      }),
    role: Joi.string()
      .valid(ROLES.ADMIN, ROLES.CUSTOMER)
      .empty()
      .required()
      .messages({
        'string.base': `Role should be a type of string`,
        'any.only': `Role must be a ${ROLES.ADMIN} or ${ROLES.CUSTOMER} `,
        'string.empty': `Role should not be empty`,
        'any.required': `Role is a required field`,
      }),
  }),

  loginValidation: Joi.object({
    email: Joi.string()
      .max(50)
      .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
      .empty()
      .required()
      .messages({
        'string.base': `Email should be a type of string`,
        'string.pattern.base"': `Email should be in proper formate`,
        'string.empty': `Email cannot be an empty field`,
        'any.required': `Email is a required field`,
      }),
    password: Joi.string()
      .min(8)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
      )
      .empty()
      .required()
      .messages({
        'string.base': `Password should be type of string`,
        'string.pattern.base': `Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character`,
        'string.empty': `Password cannot be an empty field`,
        'any.required': `Password is a required field`,
      }),
  }),

  updateValidation: Joi.object({
    name: Joi.string().min(3).max(30).optional().messages({
      'string.base': `Name should be a type of string`,
    }),
    email: Joi.string()
      .max(50)
      .optional()
      .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
      .messages({
        'string.base': `Email should be a type of string`,
        'string.pattern.base"': `Email should be in proper formate`,
      }),
    phone_number: Joi.string().optional().messages({
      'string.base': `Phone number should be a type of string`,
    }),
    gender: Joi.string()
      .valid(GENDER.FEMALE, GENDER.MALE)
      .optional()
      .messages({
        'string.base': `Gender should be a type of string`,
        'any.only': `Gender must be a ${GENDER.FEMALE} or ${GENDER.MALE} `,
      }),
  }),
};