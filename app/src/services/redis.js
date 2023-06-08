const { createClient } = require("redis");

const service = class {
  constructor() {
    this.client = createClient();

    this.client.on("error", (err) => console.log("Redis Client Error", err));
  }

  async init() {
    await this.client.connect();
  }

  async increment() {
    const value = await this.client.get("count");

    if (value === null) {
      await this.client.set("count", 1);
    } else {
      await this.client.set("count", parseInt(value) + 1);
    }

    console.log("Incremented count in redis:", await this.client.get("count"));
  }
};

module.exports = service;
