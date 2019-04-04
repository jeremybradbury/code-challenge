module.exports = (sequelize, DataTypes) => {
  var MockData = sequelize.define(
    "MockData",
    {
      email: DataTypes.STRING,
      foo: DataTypes.STRING,
      bar: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );

  return MockData;
};
