import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import gemstonesRouter from './routes/gemstones';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Allow all localhost ports (handles Vite port fallback 5173, 5174, etc.)
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'AstroGem API is running', version: '1.0.0' });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/gemstones', gemstonesRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

app.listen(PORT, () => {
  console.log(`✨ AstroGem API running at http://localhost:${PORT}`);
});

export default app;
