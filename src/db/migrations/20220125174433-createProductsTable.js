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
      priceType: Sequelize.DataTypes.STRING,
      priceValue: Sequelize.DataTypes.STRING,
      deletedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
