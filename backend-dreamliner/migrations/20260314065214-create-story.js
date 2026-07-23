"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Stories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      mediaType: {
        type: Sequelize.STRING,
      },
      mediaUrl: {
        type: Sequelize.STRING,
      },
      caption: {
        type: Sequelize.TEXT,
      },
      privacy: {
        type: Sequelize.STRING,
        defaultValue: "public",
      },
      allowReply: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      allowShare: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      expiresAt: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Stories");
  },
};
