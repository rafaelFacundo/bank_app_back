const express = require("express");
const accountControllers = require("../controllers/accountController");

const AccountRouter = express.Router();
AccountRouter.post("/account/transfer/", accountControllers.transferAmount);

module.exports = AccountRouter;
