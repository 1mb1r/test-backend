module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
        },
        allowNull: false,
      },
      text: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
        },
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
      },
      authorId: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: true,
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      tags: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Posts');
  },
};
