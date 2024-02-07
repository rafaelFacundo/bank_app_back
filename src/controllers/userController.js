const { Op } = require("@sequelize/core");
const User = require("../database/model/User");
const Country = require("../database/model/Country");
const City = require("../database/model/City");
const Account = require("../database/model/Account");
const Card = require("../database/model/Card");
const { encryptPassword, comparePassword } = require("../utils/cryptography");
const generator = require("creditcard-generator");
const databaseConnection = require("../database/index");
const Address = require("../database/model/Address");
const { createAccount } = require("./accountController");
const { createNewAdress } = require("./addressController");
const Subregion = require("../database/model/Subregion");
const { getCountryById } = require("./countryControllers");
const { getCityById } = require("./cityController");
const { getSubregionById } = require("./subregionController");

const createNewUser = async (req, res) => {
  const {
    name, //name of the new user
    email, // email of the new user
    password, // password of the new user
    birth_date, // birth date of the new user
    document, // document of the new user
    city, // city id of the new user
    country, // country id of the new user
    subregion, // subregion id of the new user
  } = req.body;
  const newTransaction = await databaseConnection.transaction();
  try {
    //verifying if the user is already in the data base;
    const isUserAlreadyInDB = await User.findOne({
      where: {
        [Op.or]: {
          document: document,
          email: email,
        },
      },
    });
    //if we receive an empty response, it means that the user dont exists in DB yet
    //so lets create them
    if (!isUserAlreadyInDB) {
      //first we need to encript the password before store it in the data base
      const encriptedPassword = await encryptPassword(password);

      //creating new user
      const newUser = await User.create({
        name: name,
        password: encriptedPassword,
        email: email,
        birth_date: new Date(birth_date),
        document: document,
        is_active: true,
      });

      //creating a new account to the new user
      //here we do not need to pass the parameter amount
      //because this parameter have the default value of 265
      const newUseraccount = await createAccount(Number(newUser.id));

      console.log("ASDASDASDASDASD", subregion);

      //creating the address of the new user
      const newUserAddres = await createNewAdress(
        Number(newUser.id),
        Number(city),
        subregion != null ? Number(subregion) : null,
        Number(country)
      );

      //getting the country, city and subregion
      const newUserCountry = getCountryById(Number(country));
      const newUserCity = getCityById(Number(city));
      const newUserSubregion = getSubregionById(Number(subregion));

      //deleting the password to not send this in the response
      delete newUser.password;
      await newTransaction.commit();
      return res.status(200).json({
        res: "USER SUCCESSFULL CREATED",
        user: newUser,
        userAccount: newUseraccount,
        userAddress: {
          countryId: newUserCountry.id,
          countryName: newUserCountry.name,
          countryCurrency: newUserCountry.currency,
          cityId: newUserCity.id,
          cityName: newUserCity.name,
          subregionId: newUserSubregion.id,
          subregionName: newUserSubregion.name,
        },
      });
    } else {
      newTransaction.commit();
      return res
        .status(500)
        .json({ res: "THE USER ALREADY EXISTS IN DATA BASE" });
    }
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
