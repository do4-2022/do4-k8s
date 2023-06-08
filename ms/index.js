const { createClient } = require('redis');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const redisUrl = process.env.redisUrl || "redis://localhost:6379"
// let count = 0;


const getCount = async () => {
  const countString = await client.get("count");
  if (typeof countString !== "string") {
    setCount(0);
    return 0;
  }
  return parseInt(countString);
}

const setCount = async (count) => {
  await client.set('count', count.toString());
}

const client = createClient({
  url: redisUrl
});


app.get('/count', async (req, res) => {
  const count = await getCount();
  res.set('Content-Type', 'application/json');
  res.send({
    count
  })
})

app.post('/count', async (req, res) => {

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

  app.listen(port, () => {
    console.log('MS listening on port ' + port);
  });
}

main();