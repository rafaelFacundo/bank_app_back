const Subregion = require("../database/model/Subregion.js");

const getAllSubregionsByCountry = async (req, res) => {
  try {
    const countryId = req.params.id;
    const response = await Subregion.findAll({
      where: {
        country: countryId,
      },
    });
    console.log("ReSPOTS");
    console.log(response);
    return res.status(200).json({ res: response });
  } catch (error) {
    return res.status(500).json({ res: "SOMETHING WENT Wrong" });
  }
};

const getSubregionById = async (id) => {
  try {
    const response = await Subregion.findOne({
      where: {
        id: id,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getAllSubregionsByCountry, getSubregionById };
