const {
  addProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
  viewProduct,
  listOfProduct
} = require('../service/productService');

module.exports = {
  addProductController: (req, res, next) => {
    return addProduct(req, res, next);
  },

  updateProductController: (req, res, next) => {
    return updateProduct(req, res, next);
  },

  deleteProductController: (req, res, next) => {
    return deleteProduct(req, res, next);
  },

  deleteProductImageController: (req, res, next) => {
    return deleteProductImage(req, res, next);
  },

  viewProductController: (req, res, next) => {
    return viewProduct(req, res, next);
  },

  listOfProductController: (req, res, next) => {
    return listOfProduct(req, res, next);
  },

};