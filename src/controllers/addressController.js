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

module.exports = {
  createNewAdress,
};
