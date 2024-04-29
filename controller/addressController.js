const {
  listOfCountry,
  listOfState,
  listOfCity,
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
};
