const {
  listOfCountry,
  listOfState,
  listOfCity,
  addAddress,
  updateAddress,
  deleteAddress,
  listOfAddress,
} = require('../service/addressService');

module.exports = {
  listOfCountryController: (req, res, next) => {
    return listOfCountry(req, res, next);
  },

  listOfStateController: (req, res, next) => {
    return listOfState(req, res, next);
  },

  listOfCityController: (req, res, next) => {
    return listOfCity(req, res, next);
  },

  addAddressController: (req, res, next) => {
    return addAddress(req, res, next);
  },

  updateAddressController: (req, res, next) => {
    return updateAddress(req, res, next);
  },

  deleteAddressController: (req, res, next) => {
    return deleteAddress(req, res, next);
  },

  listOfAddressController: (req, res, next) => {
    return listOfAddress(req, res, next);
  },
};
