const {
  addProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
  productList,
} = require('../services/productService');

module.exports = {
  addProduct: async (req, res, next) => {
    await addProduct(req, res, next);
  },
  updateProduct: async (req, res, next) => {
    await updateProduct(req, res, next);
  },
  deleteProduct: async (req, res, next) => {
    await deleteProduct(req, res, next);
  },
  deleteProductImage: async (req, res, next) => {
    await deleteProductImage(req, res, next);
  },
  productList: async (req, res, next) => {
    await productList(req, res, next);
  },
};