const {
  addWishlist,
  deleteWishlist,
  listOfWishlist,
} = require('../service/wishlistService');

module.exports = {
  addWishlistController: (req, res, next) => {
    return addWishlist(req, res, next);
  },

  deleteWishlistController: (req, res, next) => {
    return deleteWishlist(req, res, next);
  },

  listOfWishlistController: (req, res, next) => {
    return listOfWishlist(req, res, next);
  },
};
