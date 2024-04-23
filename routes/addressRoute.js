const express = require('express');
const router = express.Router();
const { errorHandler } = require('../helper/error');
const {
  listOfCountry,
  listOfState,
  listOfCity,
} = require('../controller/addressController');

router.get('/listOfCountry', errorHandler(listOfCountry));
router.get('/listOfState', errorHandler(listOfState));
router.get('/listOfCity', errorHandler(listOfCity));

module.exports = router;