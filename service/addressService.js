const db = require('../models/db');
const country = db.countryModel;
const state = db.stateModel;
const city = db.cityModel;
const { StatusCodes } = require('http-status-codes');
const { RESPONSE_STATUS } = require('../utils/enum');
const { Messages } = require('../utils/messages');
const { GeneralError } = require('../utils/error');
const logger = require('../logger/logger');
const { listData } = require('../helper/listData');

const listOfCountry = async (req, res, next) => {
  const countryList = await listData(country, [], {}, []);
  if (countryList) {
    logger.info(`Country list ${Messages.GET_SUCCESS}`);
    next(
      new GeneralError(
        undefined,
        StatusCodes.OK,
        countryList,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  } else {
    logger.error(Messages.SOMETHING_WENT_WRONG);
    next(
      new GeneralError(
        Messages.SOMETHING_WENT_WRONG,
        StatusCodes.BAD_REQUEST,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const listOfState = async (req, res, next) => {
  const stateList = await listData(state, ['id', 'state_name'], {}, [
    {
      model: country,
      attributes: ['id', 'country_name'],
    },
  ]);
  if (stateList) {
    logger.info(`State list ${Messages.GET_SUCCESS}`);
    next(
      new GeneralError(
        undefined,
        StatusCodes.OK,
        stateList,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  } else {
    logger.error(Messages.SOMETHING_WENT_WRONG);
    next(
      new GeneralError(
        Messages.SOMETHING_WENT_WRONG,
        StatusCodes.BAD_REQUEST,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const listOfCity = async (req, res, next) => {
  const cityList = await listData(city, ['id', 'city_name'], {}, [
    {
      model: state,
      attributes: ['id', 'state_name'],
    },
  ]);

  if (cityList) {
    logger.info(`City list ${Messages.GET_SUCCESS}`);
    next(
      new GeneralError(
        undefined,
        StatusCodes.OK,
        cityList,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  } else {
    logger.error(Messages.SOMETHING_WENT_WRONG);
    next(
      new GeneralError(
        Messages.SOMETHING_WENT_WRONG,
        StatusCodes.BAD_REQUEST,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

module.exports = { listOfCountry, listOfState, listOfCity };