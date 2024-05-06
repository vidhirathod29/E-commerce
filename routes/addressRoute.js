const express = require('express');
const router = express.Router();
const { errorHandler } = require('../helper/error');
const { validator } = require('../validation/validator');
const {
  addAddressValidation,
  updateAddressValidation,
} = require('../validation/addressValidation');
const { listOfDataValidation } = require('../validation/listOfDataValidation');
const {
  listOfCountryController,
  listOfStateController,
  listOfCityController,
  addAddressController,
  updateAddressController,
  deleteAddressController,
  listOfAddressController,
} = require('../controller/addressController');
const { ROLES } = require('../utils/enum');
const { authorization } = require('../middleware/authentication');

router.get('/listOfCountry', errorHandler(listOfCountryController));
router.get('/listOfState', errorHandler(listOfStateController));
router.get('/listOfCity', errorHandler(listOfCityController));

router.post(
  '/addAddress',
  authorization([ROLES.ADMIN, ROLES.CUSTOMER]),
  validator.body(addAddressValidation),
  errorHandler(addAddressController),
);

router.put(
  '/updateAddress/:id',
  authorization([ROLES.ADMIN, ROLES.CUSTOMER]),
  validator.body(updateAddressValidation),
  errorHandler(updateAddressController),
);

router.delete(
  '/deleteAddress/:id',
  authorization([ROLES.ADMIN, ROLES.CUSTOMER]),
  errorHandler(deleteAddressController),
);

router.post(
  '/listOfAddress',
  authorization([ROLES.ADMIN, ROLES.CUSTOMER]),
  validator.body(listOfDataValidation),
  errorHandler(listOfAddressController),
);

module.exports = router;
