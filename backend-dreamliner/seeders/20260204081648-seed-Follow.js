"use strict";
let data = require("../data/follows.json");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    data = data.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert("Follows", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Follows", null, {});
  },
};
