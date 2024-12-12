'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Reservations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      time: {
        type: Sequelize.STRING,
        allowNull: false,  // Par exemple, '10:00', '10:45', '11:30', etc.
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  // Référence à la table Users
          key: 'id',
        },
        onDelete: 'CASCADE',  // Supprimer la réservation si l'utilisateur est supprimé
      },
      terrainId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Terrains',  // Référence à la table Terrains
          key: 'id',
        },
        onDelete: 'CASCADE',  // Supprimer la réservation si le terrain est supprimé
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Reservations');
  }
};
