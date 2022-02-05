module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      ID: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      productUUID: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'products',
          key: 'UUID',
        },
      },
      userID: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'ID',
        },
      },
      quantity: Sequelize.DataTypes.FLOAT,
      status: Sequelize.DataTypes.STRING,
      deletedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
    });
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  },
};
