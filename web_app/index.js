const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const MS_URL = process.env.MS_URL || "http://localhost:3001";
const axios = require("axios");

const getCounter = async () => {
  return await axios.get(MS_URL + "/count").then(response => response.data.count);
}

const postCounter = async () => {
  return await axios.post(MS_URL + "/count").then(response => response.data.count);

}

app.get('/', async (req, res) => {
  res.set('Content-Type', 'text/html');
  const counter = await getCounter();
  res.send(`<h1>Counter</h1>
    <p>${counter}</p>
    <form action="/increment" method="post">
      <button type="submit">Add</button>
    </form>
  `);
});

app.post('/increment', async (req, res) => {
  await postCounter();
  res.redirect('/');
});

app.get('/ready', async (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send({
    ready: "OK"
  })
})

// app.post('/count', async (req, res) => {
//   req.
// })

app.get('/health', async (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send({
    health: "OK"
  })
})



app.listen(port, () => {
  console.log('Web app listening on port ' + port);
});