const User = require("../database/model/User");
const { encryptPassword, comparePassword } = require("../utils/cryptography");

const createNewUser = async (req, res) => {
  const { name, email, password, birth_date } = req.body;

  const passwordHash = await encryptPassword(password);

  const user = await User.create({
    name,
    email,
    passwordHash,
    birth_date,
    is_active: true,
  });

  delete user.password;

  return res.status(200).json({ user });
};

module.exports = {
  createNewUser,
};
