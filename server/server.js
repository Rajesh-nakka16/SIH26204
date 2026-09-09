require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const tripRoutes = require('./routes/tripRoutes');
const assistantRoutes = require('./routes/assistantRoutes');
const { getDestinations } = require('./controllers/tripController');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Optional MongoDB Connection (Does not crash if not configured)
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI && MONGODB_URI.trim() !== '') {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('✓ Connected to MongoDB'))
    .catch((err) => {
      console.warn('! MongoDB connection failed. Running in-memory / local demo mode:', err.message);
    });
} else {
  console.log('ℹ No MONGODB_URI provided. Running in high-reliability in-memory demo mode.');
}

// Routes
app.use('/api/trips', tripRoutes);
app.use('/api/assistant', assistantRoutes);
app.get('/api/destinations', getDestinations);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    demoMode: !Boolean(MONGODB_URI),
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

if (process.env.NODE_ENV !== 'test' && require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 EXPLOREX Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
