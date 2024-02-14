require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./src/routes/userRoutes.js");
const CountryRouter = require("./src/routes/countryRoutes.js");
const SubregionRouter = require("./src/routes/SubregionRoutes.js");
const CityRouter = require("./src/routes/cityRoutes.js");
const KeyRouter = require("./src/routes/keyRoutes.js");
const AddressRouter = require("./src/routes/addressRouter.js");
const AccountRouter = require("./src/routes/accountRouter.js");
const TransactionRouter = require("./src/routes/transactionRouter.js");

require("./src/database/index.js");

const API_ENTRYPOINT = "/api/v1/";
const app = express();
app.use(express.json());
app.use(cors());
app.use(API_ENTRYPOINT, userRouter);
app.use(API_ENTRYPOINT, CountryRouter);
app.use(API_ENTRYPOINT, SubregionRouter);
app.use(API_ENTRYPOINT, CityRouter);
app.use(API_ENTRYPOINT, KeyRouter);
app.use(API_ENTRYPOINT, AddressRouter);
app.use(API_ENTRYPOINT, AccountRouter);
app.use(API_ENTRYPOINT, TransactionRouter);

app.listen(process.env.NODE_SERVER_PORT, async () => {
  console.log("the server is on");
});
