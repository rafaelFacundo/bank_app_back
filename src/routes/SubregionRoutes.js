const express = require("express");
const subregionController = require("../controllers/subregionController.js");
const SubregionRouter = express.Router();
SubregionRouter.get(
  "/subregion/all/:id",
  subregionController.getAllSubregionsByCountry
);

module.exports = SubregionRouter;
