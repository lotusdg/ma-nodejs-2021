module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    productUuid: DataTypes.UUID,
    typeId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    quantity: DataTypes.FLOAT,
    status: DataTypes.STRING,
  });

  Order.associate = (models) => {
    Order.belongsTo(models.user);
    Order.belongsTo(models.product);
  };

  return Order;
};
