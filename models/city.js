module.exports = (sequelize, Sequelize) => {
  const city = sequelize.define(
    'city',
    {
      state_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'state',
          key: 'id',
        },
        allowNull: false,
      },
      city_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false },
  );

  return city;
};