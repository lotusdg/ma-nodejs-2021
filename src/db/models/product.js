module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    item: DataTypes.STRING,
    type: DataTypes.STRING,
    measure: DataTypes.STRING,
    measureValue: DataTypes.FLOAT,
    priceType: DataTypes.STRING,
    priceValue: DataTypes.STRING,
    deleteDate: DataTypes.DATE,
  });

  return Product;
};
