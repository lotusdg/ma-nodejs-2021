module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    measure: DataTypes.STRING,
    measureValue: DataTypes.FLOAT,
    priceValue: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  });

  Product.associate = (models) => {
    Product.belongsTo(models.item);
    Product.belongsTo(models.type);
    Product.hasMany(models.order);
  };

  return Product;
};
