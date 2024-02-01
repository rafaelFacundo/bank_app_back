const express = require("express");
const cityController = require("../controllers/cityController.js");

const CityRouter = express.Router();
CityRouter.get("/city/allByCountry/:id", cityController.getAllCitiesByCountry);

module.exports = CityRouter;
