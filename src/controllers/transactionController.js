const Transaction = require("../database/model/Transaction");

const saveNewTransaction = async (req, res) => {
  try {
    const {
      sender,
      receiver,
      amount,
      sender_currency,
      receiver_currency,
      sender_currency_value,
    } = req.body;

    const response = await Transaction.create({
      sender: sender,
      receiver: receiver,
      amount: amount,
      sender_currency: sender_currency,
      receiver_currency: receiver_currency,
      sender_currency_value: sender_currency_value,
    });

    res.status(200).json({ res: "TRANSACTION SAVE", transaction: response });
  } catch (error) {
    res.status(500).json({ res: "SOMETHING WENT WRONG" });
  }
};

module.exports = {
  saveNewTransaction,
};
