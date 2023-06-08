// index.js

const express = require('express');
const axios = require('axios');

const app = express();

// Route GET pour afficher la page HTML
app.get('/', async (req, res) => {
  try {
    // Appel du microservice A pour obtenir le compteur
    const response = await axios.get('http://localhost:3001/api/count');

    res.send(`
      <html>
        <body>
          <h1>Page principale</h1>
          <h2>Microservice A</h2>
          <p>Compteur: ${response.data.counter}</p>
          <button onclick="incrementCounter()">+</button>
          <script>
            async function incrementCounter() {
              try {
                await fetch('http://localhost:3001/api/count', {
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
    console.error(
      'Erreur lors de la communication avec le microservice A:',
      error
    );
    res
      .status(500)
      .send('Erreur lors de la communication avec le microservice A');
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
    await axios.get('http://localhost:3001/probe/liveness');
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
