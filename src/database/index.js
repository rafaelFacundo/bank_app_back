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
const Neighbourhood = require("../database/model/Neighbourhood.js");
const State = require("../database/model/State.js");

const databaseConnection = new Sequelize(databaseConfigs);

User.init(databaseConnection);
Account.init(databaseConnection);
Address.init(databaseConnection);
Card.init(databaseConnection);
City.init(databaseConnection);
Country.init(databaseConnection);
Neighbourhood.init(databaseConnection);
State.init(databaseConnection);

module.exports = databaseConnection;
