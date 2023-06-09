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

    console.log("✅ Database initialized");
  }

  async close() {
    await this.pool.end();
  }

  async increment(increment) {
    await this.pool.query(`UPDATE counts SET count = count + ${increment}`);

    const { rows } = await this.pool.query("SELECT * FROM counts");

    console.log("Incremented count in postgres:", rows[0].count);
  }
};

module.exports = service;
