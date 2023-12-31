/*
    In this file we gonna configure the ORM sequelize
*/
const Sequelize = require("sequelize");
const databaseConfigs = require("../config/databaseConfig.js");
const User = require("../database/model/User.js");

const databaseConnection = new Sequelize(databaseConfigs);

User.init(databaseConnection);

module.exports = databaseConnection;
