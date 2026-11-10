import express from 'express';
import cors from 'cors';
import visitorRoutes from './routes/visitorRoutes.js';

const app = express();

// Allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server) or matching origins
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    // In production if origins are explicitly restricted:
    return callback(null, true); // Permissive default to avoid blocking deployed portfolio
  },
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Sudeep Portfolio Backend API is running'
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Visitor tracking endpoints
app.use('/api/visitors', visitorRoutes);

export default app;

