const express = require('express');
const router = express.Router();
const { errorHandler } = require('../helper/error');
const {
  listOfCountryController,
  listOfStateController,
  listOfCityController,
} = require('../controller/addressController');

router.get('/listOfCountry', errorHandler(listOfCountryController));
router.get('/listOfState', errorHandler(listOfStateController));
router.get('/listOfCity', errorHandler(listOfCityController));

module.exports = router;
