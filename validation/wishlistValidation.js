const Joi = require('joi');

module.exports = {
  addWishlistValidation: Joi.object({
    product_id: Joi.number().empty().required().messages({
      'number.base': 'Product id should be a type of number',
      'number.empty': 'Product id should not be empty',
      'any.required': 'Product id is a required field',
    }),
  }),
};
