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
      queryInterface.addColumn("neighbourhood", "created_at", {
        type: Sequelize.DATE,
        allowNull: false,
      }),
      queryInterface.addColumn("neighbourhood", "updated_at", {
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
      queryInterface.removeColumn("neighbourhood", "created_at"),
      queryInterface.removeColumn("neighbourhood", "updated_at"),
    ]);
  },
};
