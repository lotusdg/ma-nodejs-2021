module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('type', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
  });

  Type.associate = (models) => {
    Type.hasMany(models.Product);
  };

  return Type;
};
