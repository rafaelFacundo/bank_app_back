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
      queryInterface.changeColumn("cities", "subregion", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "subregions", key: "id" },
      }),
      queryInterface.addColumn("cities", "country", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "countries", key: "id" },
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
    return queryInterface.dropTable("cities");
  },
};
