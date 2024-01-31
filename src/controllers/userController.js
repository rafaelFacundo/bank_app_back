const User = require("../database/model/User");
const Country = require("../database/model/Country");
const City = require("../database/model/City");
const Account = require("../database/model/Account");
const Card = require("../database/model/Card");
const { encryptPassword, comparePassword } = require("../utils/cryptography");
const generator = require("creditcard-generator");
const databaseConnection = require("../database/index");
const Address = require("../database/model/Address");

const createNewUser = async (req, res) => {
  const {
    name,
    email,
    password,
    birth_date,
    document,
    city,
    neighbourhood,
    country,
    state,
    street,
    house_number,
  } = req.body;
  const newTransaction = await databaseConnection.transaction();

  try {
  } catch (error) {
    console.log(error);
    await newTransaction.rollback();
    return res.status(500).json({ res: "SOMETHING WENT WRONG" });
  }
};

const authenticateUserLogin = async (req, res) => {
  const { name, email, document, password } = req.body;

  try {
    const userFoundInDB = await User.findOne({
      where: {
        document: document,
      },
    });
    if (userFoundInDB) {
      const isThePasswordsMatching = await comparePassword(
        password,
        userFoundInDB.password
      );

      if (
        userFoundInDB.name === name.toLowerCase() &&
        userFoundInDB.email === email.toLowerCase() &&
        userFoundInDB.document === document &&
        isThePasswordsMatching
      ) {
        return res.status(200).json({ res: userFoundInDB });
      } else {
        return res.status(200).json({ res: "WRONG CREDENTIALS" });
      }
    } else {
      return res.status(200).json({ res: "USER NOT FOUND" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ res: "SOMETHING WENT WRONG" });
  }
};

module.exports = {
  createNewUser,
  authenticateUserLogin,
};
