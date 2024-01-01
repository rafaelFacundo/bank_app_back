const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/user/signup", userController.createNewUser);

module.exports = userRouter;
