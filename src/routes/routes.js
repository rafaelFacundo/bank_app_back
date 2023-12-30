const express = require("express");

const routes = express.Router();

routes.get("/", (req, res) => {
  console.log("somebody is here");
  res.send("Doctor who");
});

module.exports = routes;
