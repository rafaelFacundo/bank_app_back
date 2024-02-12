const Key = require("../database/model/Key");
const { createRandomString } = require("../utils/cryptography");

const createUserKey = async (req, res) => {
  try {
    const userId = req.body.id;
    const newUserKey = createRandomString(15);
    const response = await Key.create({
      user: userId,
      key: newUserKey,
    });
    res.status(200).json({
      res: "USER KEY SUCCESSFULLY CREATED",
      key: response,
    });
  } catch (error) {
    res.status(500).json({
      res: "SOMETHING WENT WRONG",
    });
  }
};

const updateUserKey = async (req, res) => {
  try {
    const userId = req.body.id;
    const newUserKey = createRandomString(15);
    const userKeyRegisterFromDb = await Key.findOne({
      where: {
        id: userId,
      },
    });
    userKeyRegisterFromDb.key = newUserKey;
    const response = await userKeyRegisterFromDb.save();
    res.status(200).json({
      res: "USER KEY SUCCESSFULLY UPDATED",
      key: response,
    });
  } catch (error) {
    res.status(500).json({
      res: "SOMETHING WENT WRONG",
    });
  }
};

module.exports = {
  createUserKey,
  updateUserKey,
};
