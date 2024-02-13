const Address = require("../database/model/Address");

const createNewAdress = async (userId, cityId, subregionId, countryId) => {
  try {
    const response = await Address.create({
      user: userId,
      city: cityId,
      subregion: subregionId,
      country: countryId,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("somthing went wrong");
  }
};

const getAddressByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await Address.findOne({
      where: {
        user: userId,
      },
    });

    res.status(200).json({ res: "USER FOUND", userAddress: response });
  } catch (error) {
    res.status(500).json({ res: "SOMETHING WENT WRONG" });
  }
};

module.exports = {
  createNewAdress,
  getAddressByUserId,
};
