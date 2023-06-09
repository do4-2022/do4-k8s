const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';
const API_BASE_URL_BROWSER =
  process.env.API_BASE_URL_BROWSER || 'http://localhost:3001';

// Route GET pour afficher la page HTML
app.get('/', async (req, res) => {
  let counter = null;

  try {
    const response = await axios.get(API_BASE_URL + '/api/count', {
      timeout: 2000,
    });
    counter = response.data.counter;
  } catch (error) {
    counter = 0;
    console.error('Error retrieving counter:', error);
  }

  res.send(`
    <html>
      <body>
        <h1>Test app</h1>
        <h2>My Microservice</h2>
        <p>Compteur: ${counter}</p>
        <button onclick="incrementCounter()">+</button>
        <script>
          async function incrementCounter() {
            try {
              await fetch('${API_BASE_URL_BROWSER}/api/count', {
                method: 'POST',
              });
              console.log('Counter incremented');
              window.location.reload();
            } catch (error) {
              console.error('Error incrementing counter:', error);
            }
          }
        </script>
      </body>
    </html>
  `);
});

// Route de liveness probe
app.get('/probe/liveness', (req, res) => {
  res.sendStatus(200);
});

// Route de readiness probe
app.get('/probe/readiness', async (req, res) => {
  try {
    // Vérification de la disponibilité du microservice A
    await axios.get(API_BASE_URL + '/probe/liveness');
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Webapp running on http://localhost:3000');
});
