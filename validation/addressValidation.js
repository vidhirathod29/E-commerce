const Joi = require('joi');

module.exports = {
  addAddressValidation: Joi.object({
    country_id: Joi.number().empty().required().messages({
      'number.base': 'Country id should be type of number',
      'number.empty': 'Country id should not be empty',
      'any.required': 'Country id is required',
    }),
    state_id: Joi.number().empty().required().messages({
      'number.base': 'State id should be type of number',
      'number.empty': 'State id should not be empty',
      'any.required': 'State id is required',
    }),
    city_id: Joi.number().empty().required().messages({
      'number.base': 'City id should be type of number',
      'number.empty': 'City id should not be empty',
      'any.required': 'City id is required',
    }),
    address_line1: Joi.string().empty().required().messages({
      'string.base': 'Address line 1 should be type of string',
      'string.empty': 'Address line 1 should not be empty',
      'any.required': 'Address line 1 is required',
    }),
    address_line2: Joi.string().empty().required().messages({
      'string.base': 'Address line 2 should be type of string',
      'string.empty': 'Address line 2 should not be empty',
      'any.required': 'Address line 2 is required',
    }),
    zip_code: Joi.number().empty().required().messages({
      'number.base': 'Zip code should be type of number',
      'number.empty': 'Zip code should not be empty',
      'any.required': 'Zip code is required',
    }),
  }),

  updateAddressValidation: Joi.object({
    address_line1: Joi.string().optional().messages({
      'string.base': 'Address line 1 should be type of string',
    }),
    address_line2: Joi.string().optional().messages({
      'string.base': 'Address line 2 should be type of string',
    }),
    zip_code: Joi.number().optional().messages({
      'number.base': 'Zip code should be type of number',
    }),
  }),
};