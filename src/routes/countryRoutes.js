const express = require("express");
const countryControllers = require("../controllers/countryControllers");

const CountryRouter = express.Router();
CountryRouter.get("/countries/all/", countryControllers.getAllCountries);
CountryRouter.get(
  "/countries/getCurrencyById/:id",
  countryControllers.getCountryCurrencyById
);

module.exports = CountryRouter;
