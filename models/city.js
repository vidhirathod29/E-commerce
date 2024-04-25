module.exports = (sequelize, Sequelize) => {
  const city = sequelize.define(
    'city',
    {
      state_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'state',
          key: 'id',
        },
      },
      city_name: {
        type: Sequelize.STRING,
      },
    },
    { freezeTableName: true, timestamps: false },
  );

  city.belongsTo(sequelize.models.state, {
    foreignKey: 'state_id',
  });

  return city;
};