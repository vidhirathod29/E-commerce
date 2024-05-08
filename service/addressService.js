const db = require('../models/db');
const user = db.authModel;
const country = db.countryModel;
const state = db.stateModel;
const city = db.cityModel;
const address = db.addressModel;
const { StatusCodes } = require('http-status-codes');
const { RESPONSE_STATUS } = require('../utils/enum');
const { Messages } = require('../utils/messages');
const { GeneralError } = require('../utils/error');
const { GeneralResponse } = require('../utils/response');
const logger = require('../logger/logger');
const { listData } = require('../helper/dbService');

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

const addAddress = async (req, res, next) => {
  const id = req.user.id;
  const findId = await user.findOne({ where: { id, is_deleted: false } });

  if (!findId) {
    logger.error(`User ${Messages.NOT_FOUND}`);
    next(
      new GeneralError(
        `User ${Messages.NOT_FOUND}`,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }

  const {
    country_id,
    state_id,
    city_id,
    address_line1,
    address_line2,
    zip_code,
  } = req.body;

  const newAddress = {
    user_id: id,
    country_id,
    state_id,
    city_id,
    address_line1,
    address_line2,
    zip_code,
  };

  const addedAddress = await address.create(newAddress);

  if (addedAddress) {
    logger.info(`Address ${Messages.ADD_SUCCESS}`);
    next(
      new GeneralResponse(
        `Address ${Messages.ADD_SUCCESS}`,
        StatusCodes.OK,
        undefined,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

const updateAddress = async (req, res, next) => {
  const id = req.params.id;
  const findAddress = await address.findOne({
    where: { id, is_deleted: false },
  });
  if (!findAddress) {
    logger.error(`Address ${Messages.NOT_FOUND}`);
    next(
      new GeneralError(
        `Address ${Messages.NOT_FOUND}`,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }

  const { address_line1, address_line2, zip_code } = req.body;

  const updateAddress = {
    address_line1,
    address_line2,
    zip_code,
  };

  const updatedAddress = await address.update(updateAddress, { where: { id } });
  if (updatedAddress) {
    logger.info(`Address ${Messages.UPDATE_SUCCESS}`);
    next(
      new GeneralResponse(
        `Address ${Messages.UPDATE_SUCCESS}`,
        StatusCodes.ACCEPTED,
        undefined,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

const deleteAddress = async (req, res, next) => {
  const id = req.params.id;
  const findAddress = await address.findOne({
    where: { id, is_deleted: false },
  });

  if (!findAddress) {
    logger.error(`Address ${Messages.NOT_FOUND}`);
    next(
      new GeneralError(
        `Address ${Messages.NOT_FOUND}`,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  } else {
    const deletedAddress = await address.update(
      { is_deleted: true },
      { where: { id } },
    );
    if (deletedAddress) {
      logger.info(`Address ${Messages.DELETE_SUCCESS}`);
      next(
        new GeneralResponse(
          `Address ${Messages.DELETE_SUCCESS}`,
          StatusCodes.OK,
          undefined,
          RESPONSE_STATUS.SUCCESS,
        ),
      );
    }
  }
};

const listOfAddress = async (req, res, next) => {
  const { pageSize, page } = req.body;

  const listOfAddress = await listData(
    address,
    ['id', 'user_id', 'address_line1', 'address_line2', 'zip_code'],
    { is_deleted: false },
    [
      {
        model: user,
        attributes: ['name'],
        where: {
          is_deleted: 0,
        },
      },
      {
        model: country,
        attributes: ['id', 'country_name'],
        include: [
          {
            model: state,
            attributes: ['id', 'state_name'],
            include: [
              {
                model: city,
                attributes: ['id', 'city_name'],
              },
            ],
          },
        ],
      },
    ],
    page,
    pageSize,
  );

  if (listOfAddress) {
    logger.info(`Category ${Messages.GET_SUCCESS}`);
    next(
      new GeneralError(
        undefined,
        StatusCodes.OK,
        listOfAddress,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

module.exports = {
  listOfCountry,
  listOfState,
  listOfCity,
  addAddress,
  updateAddress,
  deleteAddress,
  listOfAddress,
};
