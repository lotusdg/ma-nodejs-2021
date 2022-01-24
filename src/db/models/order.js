module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    login: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  return Order;
};
