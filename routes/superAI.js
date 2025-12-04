const express = require('express');
const router = express.Router();
const superAIManager = require('../services/superAIManager');

/**
 * POST /api/super-ai
 * Intelligent orchestration of all LinkedIn automation features
 */
router.post('/orchestrate', async (req, res) => {
  try {
    const { 
      action, 
      userProfile, 
      contentData, 
      competitors, 
      preferences 
    } = req.body;

    console.log('🧠 SUPER AI MANAGER: Request received');
    console.log('Action:', action || 'auto-detect');

    // Orchestrate with Super AI Manager
    const result = await superAIManager.orchestrate({
      action: action || 'generate content',
      userProfile,
      contentData,
      competitors,
      preferences
    });

    res.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Super AI Manager error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/super-ai/insights
 * Get performance insights and learning history
 */
router.get('/insights', (req, res) => {
  try {
    const insights = superAIManager.getPerformanceInsights();
    
    res.json({
      success: true,
      insights,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Insights error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
