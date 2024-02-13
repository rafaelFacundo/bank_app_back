const Account = require("../database/model/Account");
const databaseConnection = require("../database/index");

//this function is used in another function that is located in the userController
const createAccount = async (userId, amount = 265.0) => {
  try {
    const response = await Account.create({
      user_id: userId,
      amount: amount,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong in creating the account");
  }
};

const transferAmount = async (req, res) => {
  const newTransaction = await databaseConnection.transaction();
  const { userSenderId, userReceiverId, amountToDiscount, amountToAdd } =
    req.body;
  try {
    const userSenderAccount = await Account.findOne({
      where: { user_id: userSenderId },
    });
    if (userSenderAccount.amount >= amountToDiscount) {
      userSenderAccount.amount = userSenderAccount.amount - amountToDiscount;
      await userSenderAccount.save();
      const userReceiverAccount = await Account.findOne({
        where: {
          user_id: userReceiverId,
        },
      });
      userReceiverAccount.amount = userReceiverAccount.amount + amountToAdd;
      await userReceiverAccount.save();
      return res.status(200).json({ res: "TRANSFER DONE." });
    } else {
      return res
        .status(500)
        .json({ res: "USER DO NOT HAVE NECESSARY AMOUNT IN ACCOUNT." });
    }
  } catch (error) {
    newTransaction.rowback();
    return res.status(500).json({ res: "SOMETHING WENT WRONG." });
  }
};

module.exports = { createAccount, transferAmount };
