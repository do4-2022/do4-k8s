const { Client } = require("pg");

config = {
  host: process.env.POSTGRES_USER || "localhost",
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "postgres",
};

const service = class {
  constructor() {
    this.pool = new Client(config);
  }

  async init() {
    await this.pool.connect();

    await this.pool.query("CREATE TABLE IF NOT EXISTS counts (count INT)");

    const { rows } = await this.pool.query("SELECT * FROM counts");

    if (rows.length === 0) {
      await this.pool.query("INSERT INTO counts (count) VALUES (0)");
    }

    console.log("✅ Database initialized");
  }

  async increment() {
    await this.pool.query("UPDATE counts SET count = count + 1");

    const { rows } = await this.pool.query("SELECT * FROM counts");

    console.log("Incremented count in redis:", rows[0].count);
  }
};

module.exports = service;
