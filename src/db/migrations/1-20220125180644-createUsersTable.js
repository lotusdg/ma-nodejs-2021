module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      ID: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      login: Sequelize.DataTypes.STRING,
      password: Sequelize.DataTypes.STRING,
      deletedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
    });
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
