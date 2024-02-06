const Account = require("../database/model/Account");

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
