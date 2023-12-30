/*
    In this file we gonna configure the ORM sequelize
*/
import { Sequelize } from "sequelize";
import databaseConfigs from "../config/databaseConfig";

const databaseConnection = new Sequelize(databaseConfigs);

export default databaseConnection;
