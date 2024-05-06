const Joi = require('joi');

module.exports = {
  addProductValidation: Joi.object({
    category_id: Joi.number().empty().required().messages({
      'number.base': 'Category id should be type of number',
      'number.empty': 'Category id should not be empty',
      'any.required': 'Category id is a required field',
    }),
    product_name: Joi.string().empty().required().messages({
      'string.base': 'Product name should be type of string',
      'string.empty': 'Product name should not be empty',
      'string.max': 'Product name should have maximum length of 50',
      'any.required': 'Product name is a required field',
    }),
    price: Joi.number().empty().required().messages({
      'number.base': 'Price should be type of number',
      'number.empty': 'Price should not be empty',
      'any.required': 'Price is a required field',
    }),
    product_description: Joi.string().empty().required().messages({
      'string.base': 'Product description should be type of string',
      'string.empty': 'Product description should not be empty',
      'any.required': 'Product description is a required field',
    }),
    product_quantity: Joi.number().empty().required().messages({
      'number.base': 'Product quantity should be type of number',
      'number.empty': 'Product quantity should not be empty',
      'any.required': 'Product quantity is a required field',
    }),
    images: Joi.array().empty().required().messages({
      'array.base': 'Product image should be type of array',
      'array.empty': 'Product image should not be empty',
      'any.required': 'Product image is a required field',
    }),
    selectedImage: Joi.string().empty().required().messages({
      'string.base': 'Selected image should be type of string',
      'string.empty': 'Selected image should not be empty',
      'any.required': 'Selected image is a required field',
    }),
  }),

  updateProductValidation: Joi.object({
    product_name: Joi.string().optional().messages({
      'string.base': 'Product name should be type of string',
    }),
    price: Joi.number().optional().messages({
      'number.base': 'Price should be type of number',
    }),
    product_description: Joi.string().optional().messages({
      'string.base': 'Product description should be type of string',
    }),
    product_quantity: Joi.number().optional().messages({
      'number.base': 'Product quantity should be type of number',
    }),
    images: Joi.array().optional().messages({
      'array.base': 'Product image should be type of array',
    }),
    status: Joi.number().optional().messages({
      'number.base': 'Product quantity should be type of number',
    }),
  }),
};