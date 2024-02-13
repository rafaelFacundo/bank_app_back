const express = require("express");
const addressContronllers = require("../controllers/addressController");

const AddressRouter = express.Router();
AddressRouter.get(
  "/address/getByUserId/:id",
  addressContronllers.getAddressByUserId
);

module.exports = AddressRouter;
