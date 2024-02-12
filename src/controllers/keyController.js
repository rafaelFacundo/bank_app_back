const Key = require("../database/model/Key");
const { createRandomString } = require("../utils/cryptography");

const createUserKey = async (req, res) => {
  console.log("BNBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
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
  console.log("ASDALSKDJLASKDJALSKDJALSKDJLKJ");
  try {
    const userId = req.body.id;
    const newUserKey = createRandomString(15);
    const response = await Key.update(
      {
        key: newUserKey,
      },
      { where: { user: userId } }
    );
    res.status(200).json({
      res: "USER KEY SUCCESSFULLY UPDATED",
      key: newUserKey,
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
