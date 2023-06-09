const redis = require('redis');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const MONGODB_URL = process.env.MONGODB_URI || '';

// Connexion à Redis
const redisClient = redis.createClient({ url: REDIS_URL });

const syncDatabase = async () => {
  redisClient.connect();

  let counter = null;
  try {
    counter = await redisClient.get('counter');
  } catch (error) {
    console.error('Error retrieving Redis counter:', error);
    throw error;
  }

  if (!counter) {
    console.log('No counter found in Redis');
    return;
  }

  // Mise à jour de la valeur du compteur dans MongoDB
  try {
    // Connexion à MongoDB
    const client = await MongoClient.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Récupération de la collection
    const db = client.db();
    const collection = db.collection('counters');

    // Mise à jour du compteur dans MongoDB
    await collection.updateOne(
      {},
      { $set: { value: parseInt(counter) } },
      { upsert: true }
    );

    console.log('Counter value saved to MongoDB:', counter);

    // Fermeture de la connexion à MongoDB
    client.close();
  } catch (error) {
    console.error('Error updating counter in MongoDB:', error);
    throw error;
  }
};

syncDatabase()
  .then(() => {
    console.log('Synchronisation terminée');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error during synchronization:', err);
    process.exit(1);
  });
