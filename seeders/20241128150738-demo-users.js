'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('astrongpassword', 10);

    await queryInterface.bulkInsert('Users', [
      { username: 'admybad', password: hashedPassword, isAdmin: true, createdAt: new Date(), updatedAt: new Date() },
      { username: 'user1', password: hashedPassword, isAdmin: false, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
