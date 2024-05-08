module.exports = (sequelize, Sequelize) => {
  const wishlist = sequelize.define(
    'wishlist',
    {
      user_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'product',
          key: 'id',
        },
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
    },
    { freezeTableName: true, timestamps: false },
  );
  return wishlist;
};