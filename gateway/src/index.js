const express = require("express");
const axios = require("axios");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.get("/health", async (req, res) => {
  console.log("Checking health");

  let response;

  try {
    response = await axios.get(`${process.env.APP_URL}/health`);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal Server Error");
  }

  return res.send(response.data);
});

app.post("/increment", async (req, res) => {
  console.log("Incrementing count");

  let response;

  try {
    response = await axios.post(`${process.env.APP_URL}/increment`);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal Server Error");
  }

  return res.send(response.data);
});

app.listen(port, () => console.log(`✅ App listening on port ${port}!`));
