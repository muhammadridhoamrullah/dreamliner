"use strict";
let data = require("../data/users.json");
const { hashPassword } = require("../helpers/bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    data = data.map(async (el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      el.password = await hashPassword(el.password);
      return el;
    });
    await queryInterface.bulkInsert("Users", await Promise.all(data), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
