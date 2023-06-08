const express = require("express");
const PostgresService = require("./services/postgres");
const RedisService = require("./services/redis");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3001;

const postgresService = new PostgresService();
const redisService = new RedisService();

const init = async () => {
  await postgresService.init();
  await redisService.init();

  app.get("/health", (req, res) => {
    console.log("Checking health");

    return res.send("OK");
  });

  app.post("/increment", async (req, res) => {
    console.log("Incrementing count");

    let message;

    try {
      await postgresService.increment();
    } catch (err) {
      console.log("❌ Cannot increment in postgres");

      await redisService.increment();

      message = "Incremented in redis";
    }

    return res.json({ message: message || "Incremented in postgres" });
  });

  app.listen(port, async () => {
    console.log(`✅ App listening on port ${port}!`);
  });
};

init();
