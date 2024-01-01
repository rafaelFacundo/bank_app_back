const User = require("../database/model/User");
const { encryptPassword, comparePassword } = require("../utils/cryptography");
const { DATEONLY } = require("sequelize");

const createNewUser = async (req, res) => {
  const {
    name,
    email,
    password,
    birth_date,
    document,
    city,
    neighbourhood,
    zip,
  } = req.body;

  try {
    const passwordHash = await encryptPassword(password);

    /* console.log("a data de nascimento é ");
    console.log(new Date(birth_date).g); */

    console.log("O HASH DA SENAH È ", passwordHash);

    const user = await User.create({
      name,
      email,
      password: passwordHash,
      birth_date: new Date(birth_date),
      is_active: true,
    });

    delete user.password;
    return res.status(200).json({ res: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ res: "SOMETHING WENT WRONG" });
  }
};

module.exports = {
  createNewUser,
};
