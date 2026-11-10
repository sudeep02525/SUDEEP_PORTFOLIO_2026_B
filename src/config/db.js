import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined.');
  }

  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db('portfolio');
  cachedClient = client;
  cachedDb = db;

  console.log('Successfully connected to MongoDB.');
  return { client, db };
}

export function getDatabase() {
  if (!cachedDb) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return cachedDb;
}

