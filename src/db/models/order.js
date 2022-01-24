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

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'userID',
      foreignKeyConstraint: true,
    });
    Order.belongsTo(models.Product, {
      foreignKey: 'productID',
      foreignKeyConstraint: true,
    });
  };

  return Order;
};
