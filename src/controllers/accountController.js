const Account = require("../database/model/Account");
const databaseConnection = require("../database/index");

//this function is used in another function that is located in the userController
export const createAccount = async (userId, amount = 265.0) => {
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

export const transferAmount = async (req, res) => {
  const newTransaction = await databaseConnection.transaction();
  const { userSenderId, userReceiverId, amountToSend } = req.body;
  try {
    //getting the acoount of the user that is sending the amount to first verify
    //if the he has the necessary amount to send
    const userSenderAccount = await Account.findOne({
      where: { user_id: userSenderId },
    });

    //if not return an error response
    if (userSenderAccount.amount < amountToSend) {
      return res.status(500).json({
        res: "YOUR AMOUNT IS SMALLER THAN THE AMOUNT YOU WANT TO SEND.",
      });
    }

    const userReceiverAccount = await Account.findOne({
      where: {
        user_id: userReceiverId,
      },
    });
  } catch (error) {
    return res.status(500).json({ res: "SOMETHING WENT WRONG." });
  }
};
