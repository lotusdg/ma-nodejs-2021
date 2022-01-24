module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
  });

  Item.associate = (models) => {
    Item.hasMany(models.Product);
  };

  return Item;
};
