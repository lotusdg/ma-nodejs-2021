module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    login: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  return User;
};
