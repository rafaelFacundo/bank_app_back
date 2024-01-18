const User = require("../database/model/User");
const Country = require("../database/model/Country");
const Neighbourhood = require("../database/model/Neighbourhood");
const State = require("../database/model/State");
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
  let userCountry;
  let countryAlreadyExists = false;
  let userState;
  let stateAlreadyExists = false;
  let userCity;
  let cityAlreadyExists = false;
  let userNeighbourhood;

  try {
    const isThisUserAlreadyInDB = await User.findOne({
      where: { document: document },
    });

    if (!isThisUserAlreadyInDB) {
      const passwordHash = await encryptPassword(password);

      /* console.log("a data de nascimento é ");
      console.log(new Date(birth_date).g);
      console.log("O HASH DA SENAH È ", passwordHash); */

      const newUser = {
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        password: passwordHash,
        birth_date: new Date(birth_date),
        document: document.toLowerCase(),
        is_active: false,
      };
      const user = await User.create(newUser);

      //verifing if the country already exists in the database
      //if the country does not exists it means that neither city, state, nor neighbourhood exists
      userCountry = await Country.findOne({
        where: { name: country.toLowerCase() },
      });

      if (!userCountry) {
        userCountry = await Country.create({
          name: country.toLowerCase(),
          code: country.slice(0, 3),
        });
        userState = await State.create({
          name: state.toLowerCase(),
          country_id: Number(userCountry.id),
        });
        userCity = await City.create({
          name: city.toLowerCase(),
          state_id: Number(userState.id),
        });
        userNeighbourhood = await Neighbourhood.create({
          name: neighbourhood.toLowerCase(),
          city_id: Number(userCity.id),
        });
      } else {
        countryAlreadyExists = true;
      }

      if (countryAlreadyExists) {
        userState = await State.findOne({
          where: {
            name: state.toLowerCase(),
            country_id: Number(userCountry.id),
          },
        });

        if (!userState) {
          userState = await State.create({
            name: state.toLowerCase(),
            country_id: Number(userCountry.id),
          });
          userCity = await City.create({
            name: city.toLowerCase(),
            state_id: Number(userState.id),
          });
          userNeighbourhood = await Neighbourhood.create({
            name: neighbourhood.toLowerCase(),
            city_id: Number(userCity.id),
          });
        } else {
          stateAlreadyExists = true;
        }
      }

      if (stateAlreadyExists) {
        userCity = await City.findOne({
          where: { name: city.toLowerCase(), state_id: Number(userState.id) },
        });
        if (!userCity) {
          userCity = await City.create({
            name: city.toLowerCase(),
            state_id: Number(userState.id),
          });
          userNeighbourhood = await Neighbourhood.create({
            name: neighbourhood.toLowerCase(),
            city_id: Number(userCity.id),
          });
        } else {
          cityAlreadyExists = true;
        }
      }

      if (cityAlreadyExists) {
        userNeighbourhood = await Neighbourhood.findOne({
          where: {
            name: neighbourhood.toLowerCase(),
            city_id: Number(userCity.id),
          },
        });
        if (!userNeighbourhood) {
          userNeighbourhood = await Neighbourhood.create({
            name: neighbourhood.toLowerCase(),
            city_id: Number(userCity.id),
          });
        }
      }

      await Address.create({
        user_id: Number(user.id),
        street: street,
        house_number: house_number,
        neighbourhood: Number(userNeighbourhood.id),
        city: Number(userCity.id),
        state: Number(userState.id),
        country: Number(userCountry.id),
      });

      await Account.create({
        user_id: Number(user.id),
        amount: 265.0,
      });

      await Card.create({
        owner_id: Number(user.id),
        card_number: generator.GenCC("VISA")[0],
        total_limit: 265.0,
        available_limit: 265.0,
        is_active: false,
        experation_date: new Date(),
        security_code: Math.random(100),
      });

      delete user.password;

      newTransaction.commit();
      return res.status(200).json({ res: user });
    } else {
      return res.status(200).json({ res: "USER ALREADY EXISTS" });
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
