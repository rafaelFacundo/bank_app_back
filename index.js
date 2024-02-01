require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./src/routes/userRoutes.js");
const CountryRouter = require("./src/routes/countryRoutes.js");
const SubregionRouter = require("./src/routes/SubregionRoutes.js");
const CityRouter = require("./src/routes/cityRoutes.js");
require("./src/database/index.js");

const API_ENTRYPOINT = "/api/v1/";
const app = express();
app.use(express.json());
app.use(cors());
app.use(API_ENTRYPOINT, userRouter);
app.use(API_ENTRYPOINT, CountryRouter);
app.use(API_ENTRYPOINT, SubregionRouter);
app.use(API_ENTRYPOINT, CityRouter);

app.listen(process.env.NODE_SERVER_PORT, () => {
  console.log("the server is on");
});
