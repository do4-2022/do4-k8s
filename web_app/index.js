const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const MS_URL = process.env.MS_URL || "http://localhost:3001";
const axios = require("axios");

const getCounter = async () => {
  return await axios.get(MS_URL + "/api/count").then(response => response.data.count);
}

const postCounter = async () => {
  return await axios.post(MS_URL + "/api/count").then(response => response.data.count);

}

app.get('/', async (req, res) => {
  res.set('Content-Type', 'text/html');
  try {

    const counter = await getCounter();
    res.send(`<h1>Counter</h1>
    <p>${counter}</p>
    <form action="/increment" method="post">
    <button type="submit">Add</button>
    </form>
    `);
  } catch (e) {
    res.send(
      `
      <h1>Counter</h1>
      <p>Error fetching the API: ${JSON.stringify(e)}</p>
      `
    )
  }
});

app.post('/increment', async (req, res) => {
  try {
    await postCounter();
    res.redirect('/');
  } catch (e) {
    res.send(
      `
      <h1>Counter</h1>
      <p>Error posting the API: ${JSON.stringify(e)}</p>
      `
    )
  }
});

app.get('/ready', async (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send({
    ready: "OK"
  })
})

app.get('/health', async (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send({
    health: "OK"
  })
})


app.listen(port, () => {
  console.log('Web app listening on port ' + port);
});