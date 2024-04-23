module.exports = (sequelize, Sequelize) => {
  const country = sequelize.define(
    'country',
    {
      country_name: {
        type: Sequelize.STRING,
      },
    },
    { freezeTableName: true, timestamps: false },
  );

  const State = require('./state')(sequelize, Sequelize); 

  country.hasMany(State, {
    foreignKey: 'country_id',
    sourceKey: 'id', 
  });

  return country;
};