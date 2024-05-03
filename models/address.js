
module.exports = (sequelize, Sequelize) => {
  const address = sequelize.define(
    'address',
    {
      user_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
      country_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'country',
          key: 'id',
        },
        allowNull: false,
      },
      state_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'state',
          key: 'id',
        },
        allowNull: false,
      },
      city_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'city',
          key: 'id',
        },
        allowNull: false,
      },
      address_line1: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      address_line2: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      zip_code: {
        type: Sequelize.INTEGER(6),
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
 
  return address;
};
