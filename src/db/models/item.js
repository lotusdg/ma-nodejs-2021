module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
  });

  Item.associate = (models) => {
    Item.hasMany(models.product);
  };
  return Item;
};
