const { STATUS } = require('../utils/enum');

module.exports = (sequelize, Sequelize) => {
  const order = sequelize.define(
    'order',
    {
      user_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
      address_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'address',
          key: 'id',
        },
        allowNull: false,
      },
      total_amount: {
        type: Sequelize.FLOAT(11),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(11),
        enum: [
          STATUS.PENDING,
          STATUS.REJECT,
          STATUS.DELIVER,
          STATUS.APPROVED,
          STATUS.CONFIRMED,
        ],
        defaultValue: STATUS.PENDING,
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

  return order;
};
