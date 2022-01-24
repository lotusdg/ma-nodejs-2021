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

  return Item;
};
