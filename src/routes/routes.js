const express = require("express");

const routes = express.Router();

const API_ENTRYPOINT = "/api/v1";

routes.get("/", (req, res) => {
  console.log("somebody is here");
  res.send("Doctor who");
});

module.exports = routes;
