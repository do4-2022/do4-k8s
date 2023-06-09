const express = require('express');
const redis = require('redis');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Connexion à Redis
const redisClient = redis.createClient({ url: REDIS_URL });
const redisConnction = redisClient.connect();
redisClient.on('error', (err) => console.log('Redis client Error', err));

// Récupération et incrémentation du compteur depuis Redis
const getRedisCounter = async () => {
  try {
    let value = await redisClient.get('counter');

    if (value) {
      let counter = parseInt(value);
      return counter;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error during counter recovery Redis:', error);
    throw error;
  }
};

const setRedisCounter = async (counter) => {
  try {
    await redisClient.set('counter', counter);
  } catch (error) {
    console.error('Error during counter recovery Redis:', error);
    throw error;
  }
};

// Route POST pour incrémenter le compteur
app.post('/api/count', async (req, res) => {
  try {
    let counter = await getRedisCounter();
    counter++;

    // Stockage du compteur dans Redis
    await setRedisCounter(counter);

    console.log('API counter from POST Request:', counter);

    res.json({ counter });
  } catch (error) {
    console.error('Error during counter recovery:', error);

    res.sendStatus(500);
  }
});

// Route GET pour récupérer le compteur
app.get('/api/count', async (req, res) => {
  try {
    let counter = await getRedisCounter();

    console.log('API counter from GET Request:', counter);

    res.json({ counter });
  } catch (error) {
    console.error('Error during counter recovery:', error);
    res.sendStatus(500);
  }
});

// Route de readiness probe
app.get('/probe/readiness', (req, res) => {
  const readinessStatus = redisConnction != null;

  res.sendStatus(readinessStatus ? 200 : 500);
});

// Route de liveness probe
app.get('/probe/liveness', (req, res) => {
  res.sendStatus(200);
});

app.listen(3001, () => {
  console.log('API running on http://localhost:3001');
});
