const { createClient } = require("redis");

const service = class {
  constructor() {
    this.client = createClient({
      socket: {
        host: process.env.REDIS_HOST || "localhost",
      },
    });

    this.client.on("error", (err) => console.log("Redis Client Error", err));

    this.client.on("connect", () => console.log("✅ Redis Client Connected"));
  }

  async init() {
    await this.client.connect();
  }

  async close() {
    await this.client.quit();
  }

  async getIncrement() {
    const increment = await this.client.get("count");

    return increment;
  }

  async setIncrement(increment) {
    await this.client.set("count", increment);

    console.log("Set increment in redis:", increment);
  }
};

module.exports = service;
