"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const categories = [
      {
        category: "Flower Bouquet",
      },
      {
        category: "HandCrafts",
      },
    ];

    categories.forEach((category) => {
      category["updatedAt"] = new Date();
      category["createdAt"] = new Date();
    });
    await queryInterface.bulkInsert("Categories", categories, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
