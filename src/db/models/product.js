module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    UUID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    itemID: DataTypes.STRING,
    typeID: DataTypes.STRING,
    measure: DataTypes.STRING,
    measureValue: DataTypes.FLOAT,
    priceType: DataTypes.STRING,
    priceValue: DataTypes.STRING,
    deleteDate: DataTypes.DATE,
  });

  return Product;
};
