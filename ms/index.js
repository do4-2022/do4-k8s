const { createClient } = require('redis');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
const postgresHost = process.env.POSTGRESQL_HOST || "localhost";
const postgresDB = process.env.POSTGRESQL_DATABASE || "count";
const postgresUser = process.env.POSTGRESQL_USER || "count";
const postgresPassword = process.env.POSTGRESQL_PASSWORD || "count";

const { Sequelize, DataTypes, Op, Model } = require('sequelize');

const sequelize = new Sequelize(`postgres://${postgresUser}:${postgresPassword}@${postgresHost}:5432/${postgresDB}`);

// class Count extends Model {
//   count;
// }

// Count.init({
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//   }
// }, { sequelize });

const Count = sequelize.define("count", {
  count: DataTypes.BIGINT
})

const isPgUp = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
}

const getCount = async () => {
  const isPostgresUp = await isPgUp();

  if (isPostgresUp) {

    const [countEntity, _] = await Count.findOrCreate({
      where: {
        id: 1
      },
      defaults: {
        count: 0
      }
    });

    return parseInt(countEntity.count);

  }

  const countString = await client.get("count");
  if (typeof countString !== "string") {
    setCount(0);
    return 0;
  }
  return parseInt(countString);
}

const setCount = async (count) => {

  const isPostgresUp = await isPgUp();
  if (isPostgresUp) {
    await Count.update({ count: count }, { where: { id: 1 } })
    return;

  }
  await client.set('count', count.toString());
}

// This method is used when the Postgres was done and the cache needs to be flushed to the Postgres

// const flushCacheFromRedis = async () => {

//   // Retrieve the count from postgres
//   const [countEntity, created] = Count.findOrCreate({
//     defaults: {
//       count: 0
//     }
//   });

//   //Retrieve the count in Redis, add it in Postgres
//   const countRedis = await getCount();
//   const finalCount = count + countRedis;
//   await Count.update({ count: finalCount }, {
//     where: {
//       count: countEntity.count
//     }
//   })

//   //Flush the count in Redis
//   await setCount(0);

// };




const client = createClient({
  url: redisUrl
});


app.get('/api/count', async (req, res) => {

  const count = await getCount();
  res.set('Content-Type', 'application/json');
  res.send({
    count
  })
})

app.post('/api/count', async (req, res) => {

  let count = await getCount();
  await setCount(++count);
  res.set('Content-Type', 'application/json');
  res.send({
    count
  })
})

client.on('error', err => console.log('Redis Client Error', err)

);

const main = async () => {
  await client.connect();

  const isPostgresUp = await isPgUp();
  if (isPostgresUp) {
    try {
      const count = await Count.findOne({ where: { id: 1 } });
      if (count === null) {
        await Count.create({ id: 1, count: 0 });
      }
    } catch (e) {
      console.log("Error inserting init count in db", e);
    }
  }

  app.listen(port, () => {
    console.log('MS listening on port ' + port);
  });
}

main();