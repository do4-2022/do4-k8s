const express = require("express");
const redis = require("redis");
const { Client } = require("pg");

const app = express();
const client = redis.createClient(
  process.env.REDIS_URL || "redis://localhost:6379"
);

// Middleware pour parser les données de la requête
app.use(express.json());

const pgClient = new Client(
  process.env.DATABASE_URL || "postgres://postgres:postgres@localhost/postgres",
  {
    statement_timeout: 1000,
  }
);

// Route POST pour incrémenter le compteur dans Redis
app.post("/", async (req, res) => {
  await client.connect();
  let counter = await client.get("counter");
  console.log(counter);
  await client.set("counter", parseInt(counter) + 1);
  await client.quit();
  res.json({ counter: parseInt(counter) + 1 });
  //exportCounter();
});

// Route GET pour récupérer la valeur du compteur depuis Redis
app.get("/", async (req, res) => {
  try {
    await pgClient.connect();

    const pgQueryPromise = new Promise((resolve, reject) => {
      pgClient.query("SELECT value FROM counters LIMIT 1", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ timeout: true });
      }, 1000); // Temps limite en millisecondes
    });

    const result = await Promise.race([pgQueryPromise, timeoutPromise]);

    if (result.timeout || !result.rows || result.rows.length === 0) {
      throw new Error("Timeout or no result from PostgreSQL");
    }

    console.log(result.rows[0].value);
    res.json({ counter: result.rows[0].value || 0 });
  } catch (err) {
    pgClient.end();
    try {
      await client.connect();
      let counter = await client.get("counter");
      console.log(counter);
      await client.quit();
      res.json({ counter: counter || 0 });
    } catch (err) {
      console.error("Cannot retrieve counter from Redis:", err);
      res.json({ counter: 0 });
    }
  }
});

// start server
app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
