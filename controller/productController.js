const {
  addProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
  viewProduct,
  listOfProduct
} = require('../services/productService');

module.exports = {
  addProduct: (req, res, next) => {
    return addProduct(req, res, next);
  },

  updateProduct: (req, res, next) => {
    return updateProduct(req, res, next);
  },

  deleteProduct: (req, res, next) => {
    return deleteProduct(req, res, next);
  },

  deleteProductImage: (req, res, next) => {
    return deleteProductImage(req, res, next);
  },

  viewProduct: (req, res, next) => {
    return viewProduct(req, res, next);
  },

  listOfProduct: (req, res, next) => {
    return listOfProduct(req, res, next);
  },

};