const User = require("../database/model/User");
const Country = require("../database/model/Country");
const Neighbourhood = require("../database/model/Neighbourhood");
const State = require("../database/model/State");
const City = require("../database/model/City");
const Account = require("../database/model/Account");
const { encryptPassword, comparePassword } = require("../utils/cryptography");
const generator = require("creditcard-generator");
const { sequelize } = require("sequelize");
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
  const newTransaction = await sequelize.transaction();
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
      userCountry = await Country.findOne({ where: { name: country } });
      if (!userCountry) {
        userCountry = await Country.create({ name: country });
        userState = await State.create({
          name: state,
          country_id: userCountry.id,
        });
        userCity = await City.create({
          name: city,
          state_id: userState.id,
        });
        userNeighbourhood = await Neighbourhood.create({
          name: neighbourhood,
          city_id: userCity.id,
        });
      } else {
        countryAlreadyExists = true;
      }

      if (countryAlreadyExists) {
        userState = await State.findOne({
          where: { name: state, country_id: userCountry.id },
        });
        if (!userState) {
          userState = await State.create({
            name: state,
            country_id: userCountry.id,
          });
          userCity = await City.create({
            name: city,
            state_id: userState.id,
          });
          userNeighbourhood = await Neighbourhood.create({
            name: neighbourhood,
            city_id: userCity.id,
          });
        } else {
          stateAlreadyExists = true;
        }
      }

      if (stateAlreadyExists) {
        userCity = await City.findOne({
          where: { name: city, state_id: userState.id },
        });
        if (!userCity) {
          userCity = await City.create({ name: city, state_id: userState.id });
          userNeighbourhood = await Neighbourhood.create({
            name: neighbourhood,
            city_id: userCity.id,
          });
        } else {
          cityAlreadyExists = true;
        }
      }

      if (cityAlreadyExists) {
        userNeighbourhood = await Neighbourhood.findOne({
          where: { name: neighbourhood, city_id: userCity.id },
        });
        if (!userNeighbourhood) {
          userNeighbourhood = await Neighbourhood.create({
            name: neighbourhood,
            city_id: userCity.id,
          });
        }
      }

      await Address.create({
        user_id: user.id,
        street: street,
        house_number: house_number,
        neighbourhood: userNeighbourhood,
        city: userCity,
        state: userState,
        country: userCountry,
      });

      await Account.create({
        user_id: user.id,
        amount: 265.0,
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

module.exports = {
  createNewUser,
};
