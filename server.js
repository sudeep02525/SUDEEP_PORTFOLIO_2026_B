import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import { connectToDatabase } from './src/config/db.js';

const PORT = process.env.PORT || 5000;

// Attempt initial database connection if MONGODB_URI is provided
if (process.env.MONGODB_URI) {
  connectToDatabase().catch((err) => {
    console.warn('Initial MongoDB connection deferred:', err.message);
  });
} else {
  console.warn('Note: MONGODB_URI is not set in .env. API will return fallback counts until configured.');
}

const server = app.listen(PORT, () => {
  console.log(`Portfolio backend server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    process.exit(0);
  });
});

