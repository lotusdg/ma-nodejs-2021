module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('types', {
      ID: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: Sequelize.DataTypes.STRING,
      deletedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
    });
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('types');
  },
};
