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
      queryInterface.addColumn("countries", "created_at", {
        type: Sequelize.DATE,
        allowNull: false,
      }),
      queryInterface.addColumn("countries", "updated_at", {
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
      queryInterface.removeColumn("countries", "created_at"),
      queryInterface.removeColumn("countries", "updated_at"),
    ]);
  },
};
