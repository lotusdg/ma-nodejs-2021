module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('type', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
  });

  Type.associate = (models) => {
    Type.hasMany(models.product);
  };

  return Type;
};
