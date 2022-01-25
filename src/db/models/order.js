module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    quantity: DataTypes.FLOAT,
    status: DataTypes.STRING,
  });

  Order.associate = (models) => {
    Order.belongsTo(models.user);
    Order.belongsTo(models.product);
  };

  return Order;
};
