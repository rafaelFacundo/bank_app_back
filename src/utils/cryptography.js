const bcrypt = require("bcrypt");

const encryptPassword = async (passwordToEncrypt) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(passwordToEncrypt, salt);
  return passwordHash;
};

const comparePassword = async (passwordInputed, passwordEncrypted) => {
  const arePasswordsMatching = await bcrypt.compare(
    passwordInputed,
    passwordEncrypted
  );
  return arePasswordsMatching;
};

const createRandomString = (lengthOfTheString) => {
  let result = "";
  const characthers =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const characthersStringLenght = characthers.length;
  for (let i = 0; i < lengthOfTheString; ++i) {
    result += characthers.charAt(
      Math.floor(Math.random() * characthersStringLenght)
    );
  }
  return result;
};

module.exports = {
  encryptPassword,
  comparePassword,
  createRandomString,
};
