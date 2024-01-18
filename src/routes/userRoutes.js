const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/user/signup", userController.createNewUser);
userRouter.post("/user/login", userController.authenticateUserLogin);

module.exports = userRouter;
