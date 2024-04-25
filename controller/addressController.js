const {
  listOfCountry,
  listOfState,
  listOfCity,
} = require('../service/addressService');

module.exports = {
  listOfCountry: async (req, res, next) => {
    await listOfCountry(req, res, next);
  },
  listOfState: async (req, res, next) => {
    await listOfState(req, res, next);
  },
  listOfCity: async (req, res, next) => {
    await listOfCity(req, res, next);
  },
};