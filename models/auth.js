const { ROLES, GENDER } = require('../utils/enum');

module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'users',
    {
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
        enum: [GENDER.MALE, GENDER.FEMALE],
      },
      profile_image: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
        enum: [ROLES.ADMIN, ROLES.VENDOR, ROLES.CUSTOMER],
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    { freezeTableName: true, timestamps: false },
  );
};