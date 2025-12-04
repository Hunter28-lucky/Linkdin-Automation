require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const generateRouter = require('./routes/generate');
const trendsRouter = require('./routes/trends');
const imagesRouter = require('./routes/images');
const optimizeRouter = require('./routes/optimize');
const profileOptimizerRouter = require('./routes/profileOptimizer');
const hashtagResearchRouter = require('./routes/hashtagResearch');
const hooksRouter = require('./routes/hooks');
const competitorAnalysisRouter = require('./routes/competitorAnalysis');
const superAIRouter = require('./routes/superAI');
const videoRouter = require('./routes/video');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || process.env.VERCEL_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files in production
const path = require('path');
if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// API Routes
app.use('/api/generate', generateRouter);
app.use('/api/trends', trendsRouter);
app.use('/api/images', imagesRouter);
app.use('/api/optimize', optimizeRouter);
app.use('/api/profile-optimize', profileOptimizerRouter);
app.use('/api/hashtag-research', hashtagResearchRouter);
app.use('/api/hooks', hooksRouter);
app.use('/api/competitor-analysis', competitorAnalysisRouter);
app.use('/api/super-ai', superAIRouter);
app.use('/api/video', videoRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'online', 
    message: 'LinkedIn Viral Automation API - ULTIMATE EDITION',
    version: '2.0.0',
    features: [
      'Viral Content Generation',
      'Deep Viral Analysis',
      'Profile Optimization',
      'Hashtag Research',
      'Hook Library (100+ templates)',
      'Competitor Analysis',
      'Super AI Manager'
    ],
    endpoints: {
      generate: '/api/generate',
      trends: '/api/trends',
      images: '/api/images',
      optimize: '/api/optimize',
      profileOptimize: '/api/profile-optimize/optimize',
      hashtagResearch: '/api/hashtag-research/research',
      hooks: '/api/hooks/generate',
      competitorAnalysis: '/api/competitor-analysis/analyze',
      superAI: '/api/super-ai/orchestrate'
    },
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error', 
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// Serve React app for all non-API routes (must be after API routes)
if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// 404 handler for API routes only
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found', 
    message: 'The requested endpoint does not exist',
    path: req.path
  });
});

// For Vercel serverless
if (process.env.VERCEL) {
  module.exports = app;
} else {
  // Start server locally
  app.listen(PORT, () => {
    console.log(`\n🚀 LinkedIn Automation API Server Running!`);
    console.log(`📡 Port: ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`⚡ Powered by Google Gemini AI\n`);
  });
}

module.exports = app;
