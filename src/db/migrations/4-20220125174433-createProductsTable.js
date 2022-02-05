module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      UUID: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      measure: Sequelize.DataTypes.STRING,
      measureValue: Sequelize.DataTypes.FLOAT,
      typeID: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'types',
          key: 'ID',
        },
      },
      itemID: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'items',
          key: 'ID',
        },
      },
      priceValue: Sequelize.DataTypes.STRING,
      deletedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
    });
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  },
};
