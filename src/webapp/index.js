const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3001';

// Route GET pour afficher la page HTML
app.get('/', async (req, res) => {
  try {
    // Appel du microservice A pour obtenir le compteur
    const response = await axios.get(apiBaseUrl + '/api/count');

    res.send(`
      <html>
        <body>
          <h1>Test app</h1>
          <h2>My Microservice</h2>
          <p>Compteur: ${response.data.counter}</p>
          <button onclick="incrementCounter()">+</button>
          <script>
            async function incrementCounter() {
              try {
                await fetch('${apiBaseUrl}/api/count', {
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
  } catch (error) {
    console.error('Error communicating with api:', error);
    res.status(500).send('Error communicating with api');
  }
});

// Route de liveness probe
app.get('/probe/liveness', (req, res) => {
  res.sendStatus(200);
});

// Route de readiness probe
app.get('/probe/readiness', async (req, res) => {
  try {
    // Vérification de la disponibilité du microservice A
    await axios.get(apiBaseUrl + '/probe/liveness');
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Webapp running on http://localhost:3000');
});
