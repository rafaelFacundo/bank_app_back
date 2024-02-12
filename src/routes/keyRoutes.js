const express = require("express");
const keyControllers = require("../controllers/keyController");

const KeyRouter = express.Router();
KeyRouter.post("/key/create/", keyControllers.createUserKey);
KeyRouter.post("/key/update/", keyControllers.createUserKey);

module.exports = KeyRouter;
