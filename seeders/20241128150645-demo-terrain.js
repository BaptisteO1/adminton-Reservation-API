'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Terrains', [
      { name: 'A', isAvailable: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'B', isAvailable: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'C', isAvailable: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'D', isAvailable: true, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Terrains', null, {});
  }
};
