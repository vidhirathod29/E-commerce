const { ROLES, GENDER } = require('../utils/enum');

module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'users',
    {
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING(11),
        enum: [GENDER.MALE, GENDER.FEMALE],
        allowNull: false,
      },
      profile_image: {
        type: Sequelize.STRING(50),
      },
      role: {
        type: Sequelize.STRING(10),
        enum: [ROLES.ADMIN, ROLES.CUSTOMER],
        allowNull: false,
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