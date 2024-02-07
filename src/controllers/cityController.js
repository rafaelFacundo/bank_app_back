const City = require("../database/model/City.js");

const getAllCitiesByCountry = async (req, res) => {
  try {
    const countryId = req.params.id;
    const response = await City.findAll({
      where: { country: countryId },
    });

    return res.status(200).json({ res: response });
  } catch (error) {
    return res.status(500).json({ res: "Something went wrong" });
  }
};

const getCityById = async (id) => {
  try {
    const response = await City.findOne({
      where: {
        id: id,
      },
    });
    return response;
  } catch (error) {
    return undefined;
  }
};

module.exports = { getAllCitiesByCountry, getCityById };
