const fs = require("fs");
const Country = require("../model/Country.js");

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

const tryToPopulateDb = async () => {
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

module.exports = tryToPopulateDb;
