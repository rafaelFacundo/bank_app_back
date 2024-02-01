const Subregion = require("../database/model/Subregion.js");

const getAllSubregionsByCountry = async (req, res) => {
  try {
    const countryId = req.params.id;
    const response = await Subregion.findAll({
      where: {
        country: countryId,
      },
    });
    return res.status(200).json({ res: response });
  } catch (error) {
    return res.status(500).json({ res: "SOMETHING WENT Wrong" });
  }
};

module.exports = {
  getAllSubregionsByCountry,
};
