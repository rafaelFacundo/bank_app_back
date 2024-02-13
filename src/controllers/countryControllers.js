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

const getCountryCurrencyById = async (req, res) => {
  try {
    const countryId = req.params.id;
    const response = await Country.findOne({
      where: {
        id: countryId,
      },
    });

    res.status(200).json({ res: "USER FOUND", currency: response.currency });
  } catch (error) {
    res.status(500).json({ res: "SOMETHING WENT WRONG" });
  }
};

module.exports = {
  getAllCountries,
  getCountryById,
  getCountryCurrencyById,
};
