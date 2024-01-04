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
    return queryInterface.createTable("address", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      house_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      neighbourhood: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "neighbourhood", key: "id" },
      },
      city: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "cities", key: "id" },
      },
      state: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "states", key: "id" },
      },
      country: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "countries", key: "id" },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
