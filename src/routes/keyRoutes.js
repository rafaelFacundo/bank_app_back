const express = require("express");
const keyControllers = require("../controllers/keyController");

const KeyRouter = express.Router();
KeyRouter.post("/key/update/", keyControllers.updateUserKey);
KeyRouter.post("/key/create/", keyControllers.createUserKey);

module.exports = KeyRouter;
