const express = require("express");
const transactionControllers = require("../controllers/transactionController");

const TransactionRouter = express.Router();
TransactionRouter.post(
  "/transaction/save/",
  transactionControllers.saveNewTransaction
);

module.exports = TransactionRouter;
