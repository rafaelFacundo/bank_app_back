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
      queryInterface.addColumn("states", "created_at", {
        type: Sequelize.DATE,
        allowNull: false,
      }),
      queryInterface.addColumn("states", "updated_at", {
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
      queryInterface.removeColumn("states", "created_at"),
      queryInterface.removeColumn("states", "updated_at"),
    ]);
  },
};
