const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/count", (req, res) => {
  fetch("http://counter-service", {
    method: "POST",
  });
});

app.get("/count", (req, res) => {
  fetch("http://counter-service", {
    method: "GET",
  });
});

// prob healthz route for kubernetes : if counter-service is not available

app.get("/health", (req, res) => {
  let fetchResponse = fetch("http://counter-service", {
    method: "GET",
  });

  if (fetchResponse.status == 200) {
    res.status(200).send("OK");
  } else {
    res.status(500).send("KO");
  }
});

// Démarrage du serveur
app.listen(8080, () => {
  console.log("Serveur Express démarré sur le port 8080");
});
