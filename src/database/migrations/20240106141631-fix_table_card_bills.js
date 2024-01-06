"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn("card_bills", "created_at", {
        type: Sequelize.DATE,
        allowNull: false,
      }),
      queryInterface.addColumn("card_bills", "updated_at", {
        type: Sequelize.DATE,
        allowNull: false,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn("card_bills", "created_at"),
      queryInterface.removeColumn("card_bills", "updated_at"),
    ]);
  },
};
