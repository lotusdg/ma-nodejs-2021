module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      uuid: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      measure: Sequelize.DataTypes.STRING,
      measureValue: Sequelize.DataTypes.FLOAT,
      typeId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'types',
          key: 'id',
        },
      },
      itemId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'items',
          key: 'Id',
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
