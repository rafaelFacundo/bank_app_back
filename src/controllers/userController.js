const { Op } = require("@sequelize/core");
const User = require("../database/model/User");
const Country = require("../database/model/Country");
const City = require("../database/model/City");
const { encryptPassword, comparePassword } = require("../utils/cryptography");
const databaseConnection = require("../database/index");
const { createAccount } = require("./accountController");
const { createNewAdress } = require("./addressController");
const Subregion = require("../database/model/Subregion");

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

      //creating the address of the new user
      const newUserAddres = await createNewAdress(
        Number(newUser.id),
        Number(city),
        subregion != null ? Number(subregion) : null,
        Number(country)
      );

      //getting the country, city and subregion
      const newUserCountry = await Country.findOne({
        where: {
          id: country,
        },
      });
      const newUserCity = await City.findOne({
        where: {
          id: city,
        },
      });
      let newUserSubregion = { name: "no subregion", id: null };
      if (subregion != null) {
        newUserSubregion = await Subregion.findOne({
          where: {
            id: subregion,
          },
        });
      }

      //deleting the password to not send this in the response
      delete newUser.password;

      const userAddress = {
        countryId: newUserCountry.id,
        countryName: newUserCountry.name,
        countryCurrency: newUserCountry.currency,
        cityId: newUserCity.id,
        cityName: newUserCity.name,
        subregionId: newUserSubregion.id,
        subregionName: newUserSubregion.name,
      };
      await newTransaction.commit();
      return res.status(200).json({
        res: "USER SUCCESSFULL CREATED",
        user: newUser,
        userAccount: newUseraccount,
        userAddress: userAddress,
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

const verifyIfUserIsActiveById = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await User.findOne({
      where: {
        id: userId,
      },
    });
    res.status(200).json({ res: "USER FOUND", is_active: response.is_active });
  } catch (error) {
    res.status(500).json({ res: "SOMETHING WENT WRONG" });
  }
};

module.exports = {
  createNewUser,
  authenticateUserLogin,
  verifyIfUserIsActiveById,
};
