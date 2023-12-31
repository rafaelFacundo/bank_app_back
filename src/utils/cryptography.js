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

module.exports = {
  encryptPassword,
  comparePassword,
};
