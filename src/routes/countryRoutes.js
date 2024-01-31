const express = require("express");
const countryControllers = require("../controllers/countryControllers");

const CountryRouter = express.Router();
CountryRouter.get("/countries/all/", countryControllers.getAllCountries);

module.exports = CountryRouter;
