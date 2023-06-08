const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const MS_URL = process.env.MS_URL || "http://localhost:3001";

app.get('/', async (req, res) => {
  res.set('Content-Type', 'text/html');

  const counter = 1;//await fetch(MS_URL, { method: "GET" }).then(data => data.json());
  res.send(`<h1>Counter</h1>
    <p>${counter}</p>
  `);

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
  console.log('Server app listening on port ' + port);
});