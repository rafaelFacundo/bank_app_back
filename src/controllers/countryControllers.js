const Country = require("../database/model/Country");

const getAllCountries = async (req, res) => {
  try {
    const response = await Country.findAll();
    return res.status(200).json({ res: response });
  } catch (error) {
    return res.status(500).json({ res: "SOMETHING WENT WRONG" });
  }
};

const getCountryById = async (id) => {
  try {
    const response = await Country.findOne({
      where: {
        id: id,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllCountries,
  getCountryById,
};
