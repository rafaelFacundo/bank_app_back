const Country = require("../database/model/Country");

const getAllCountries = async (req, res) => {
  try {
    const response = await Country.findAll();
    return res.status(200).json({ res: response });
  } catch (error) {
    return res.status(500).json({ res: "SOMETHING WENT WRONG" });
  }
};

module.exports = {
  getAllCountries,
};
