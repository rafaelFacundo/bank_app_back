/*
    In this file we gonna configure the ORM sequelize
*/
const Sequelize = require("sequelize");
const databaseConfigs = require("../config/databaseConfig.js");
const User = require("../database/model/User.js");
const Account = require("../database/model/Account.js");
const Address = require("../database/model/Address.js");
const Card = require("../database/model/Card.js");
const City = require("../database/model/City.js");
const Country = require("../database/model/Country.js");
const Subregion = require("../database/model/Subregion.js");

const databaseConnection = new Sequelize(databaseConfigs);

databaseConnection.authenticate().then(() => {
  console.log("connected");
});

User.init(databaseConnection);
Account.init(databaseConnection);
Address.init(databaseConnection);
Card.init(databaseConnection);
City.init(databaseConnection);
Country.init(databaseConnection);
Subregion.init(databaseConnection);

module.exports = databaseConnection;
