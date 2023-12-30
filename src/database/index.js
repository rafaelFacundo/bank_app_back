/*
    In this file we gonna configure the ORM sequelize
*/
const Sequelize = require("sequelize");
const databaseConfigs = require("../config/databaseConfig.js");

const databaseConnection = new Sequelize(databaseConfigs);

export default databaseConnection;
