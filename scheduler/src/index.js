const PostgresService = require("./services/postgres");
const RedisService = require("./services/redis");
require("dotenv").config();

const postgresService = new PostgresService();
const redisService = new RedisService();

const init = async () => {
  await postgresService.init();
  await redisService.init();

  try {
    const increment = await redisService.getIncrement();

    if (increment && increment > 0) {
      console.log("✅ Found increment in redis:", increment);

      await postgresService.increment(increment);

      await redisService.setIncrement(0);
    } else {
      console.log("❌ No increment found in redis");
    }
  } catch (err) {
    console.log("❌ Cannot increment in postgres");
  }

  await redisService.close();
  await postgresService.close();
};

init();
