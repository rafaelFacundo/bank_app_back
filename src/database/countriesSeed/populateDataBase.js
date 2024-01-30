const fs = require("fs");
const Country = require("../model/Country.js");
const Subregion = require("../model/Subregion.js");
const City = require("../model/City.js");

const fetchAllCountries = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const responseJson = await response.json();
  //console.log(responseJson[0]);
  return responseJson;
};

const readFile = (fileName) => {
  const fileData = fs.readFileSync(fileName, "utf8").split("\n");
  fileData.pop();
  return fileData;
};

const populateCountriesTable = async () => {
  const countriesArray = [];
  const countriesList = await fetchAllCountries();
  const countriesFromFile = readFile("./countries3.txt");

  try {
    countriesFromFile.forEach(async (country) => {
      const countryName = country.split("-")[0].toLowerCase();
      const countryCode = country.split("-")[1];
      let found = false;

      countriesList.forEach((fetchedCountry) => {
        if (
          countryName === fetchedCountry.name.common.toLowerCase() ||
          countryName === fetchedCountry.name.official.toLowerCase()
        ) {
          found = true;
          if (fetchedCountry.currencies) {
            const countryCurrencies = Object.keys(fetchedCountry.currencies);
            countriesArray.push([
              countryName,
              countryCode,
              countryCurrencies[0],
            ]);
          } else {
            countriesArray.push([countryName, countryCode, "BRL"]);
          }
        }
      });
    });
    //console.log(countriesArray);
    console.log("vou tentar enviar para o back");

    countriesArray.forEach(async (country) => {
      const response = await Country.create({
        name: country[0],
        code: country[1],
        currency: country[2],
      });
      console.log(response);
    });
  } catch (error) {
    console.log("ERRROR");
    console.log(error);
  }
};

const populateSubregionsTable = async () => {
  let subregionsToSaveInDB = [];
  const allCountriesInDB = await Country.findAll();
  const subregionsFromFile = readFile("./states3.txt");
  subregionsFromFile.forEach((subregion) => {
    const subregionCountry = subregion.split("-")[0];
    const subregionName = subregion.split("-")[1];
    allCountriesInDB.forEach((country) => {
      if (subregionCountry.toLowerCase() === country.name) {
        subregionsToSaveInDB.push([subregionName, country.id]);
      }
    });
  });
  console.log(subregionsToSaveInDB);

  subregionsToSaveInDB.forEach(async (subregion) => {
    const response = await Subregion.create({
      name: subregion[0],
      country: subregion[1],
    });
    console.log(response);
  });
};

const populateCitiesTable = async () => {
  let citiesToSaveInDB = [];
  const allSubregionsInD = await Subregion.findAll();
  const allCountriesInDB = await Country.findAll();
  const citiesFromFile = readFile("./cities3.txt");
  let isItsCountryInDB = false;
  let cityArray = [];
  citiesFromFile.forEach((city) => {
    cityArray = [];
    isItsCountryInDB = false;
    const cityCountry = city.split("-")[0];
    const citySubregion = city.split("-")[1];
    const cityName = city.split("-")[2];
    allCountriesInDB.forEach((country) => {
      if (country.name === cityCountry.toLowerCase()) {
        isItsCountryInDB = true;
        cityArray.push(country.id);
      }
    });

    if (isItsCountryInDB && citySubregion != "") {
      allSubregionsInD.forEach((subregion) => {
        if (
          subregion.name === citySubregion &&
          subregion.country === cityArray[0]
        ) {
          citiesToSaveInDB.push([cityName, subregion.id, cityArray[0]]);
        }
      });
    } else if (isItsCountryInDB) {
      citiesToSaveInDB.push([cityName, null, cityArray[0]]);
    }
  });

  citiesToSaveInDB.forEach(async (city) => {
    const response = await City.create({
      name: city[0],
      subregion: city[1],
      country: city[2],
    });
    console.log(response);
  });
};

module.exports = populateCitiesTable;
