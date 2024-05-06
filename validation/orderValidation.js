const Joi = require('joi');
const { STATUS } = require('../utils/enum');

module.exports = {
  placeOrderValidation: Joi.object({
    cart_id: Joi.number().empty().required().messages({
      'number.base': 'Cart id should be a type of number',
      'number.empty': 'Cart id should not be empty',
      'any.required': 'Cart id is a required field',
    }),
    address_id: Joi.number().empty().required().messages({
      'number.base': 'Address id should be a type of number',
      'number.empty': 'Address id should not be empty',
      'any.required': 'Address id is a required field',
    }),
    status: Joi.string()
      .valid(
        STATUS.PENDING,
        STATUS.APPROVED,
        STATUS.CONFIRMED,
        STATUS.DELIVER,
        STATUS.REJECT,
      )
      .empty()
      .required()
      .messages({
        'string.base': 'Status should be a type of string',
        'any.only': `Status must be a ${STATUS.PENDING} or ${STATUS.APPROVED} or ${STATUS.CONFIRMED} or ${STATUS.DELIVER} or ${STATUS.REJECT}`,
        'string.empty': 'Status should not be empty',
        'any.required': 'Status is a required field',
      }),
  }),

  updateOrderStatusValidation: Joi.object({
    status: Joi.string()
      .valid(
        STATUS.PENDING,
        STATUS.APPROVED,
        STATUS.CONFIRMED,
        STATUS.DELIVER,
        STATUS.REJECT,
      )
      .empty()
      .required()
      .messages({
        'string.base': 'Status should be a type of string',
        'any.only': `Status must be a ${STATUS.PENDING} or ${STATUS.APPROVED} or ${STATUS.CONFIRMED} or ${STATUS.DELIVER} or ${STATUS.REJECT}`,
        'string.empty': 'Status should not be empty',
        'any.required': 'Status is a required field',
      }),
  }),
};