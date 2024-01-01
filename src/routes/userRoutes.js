const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/user/signup", (req, res) => {
  console.log("The data that we received were");
  console.log(req.body);

  console.log("I'm gonna answer the request");
  res.status(200).json({ res: "THIS YEAR IS THE YEAR" });
});

module.exports = userRouter;
