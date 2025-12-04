const express = require('express');
const router = express.Router();
const videoContentService = require('../services/videoContentService');
const hashtagResearchService = require('../services/hashtagResearchService');

// Main video content analysis endpoint
router.post('/analyze', async (req, res) => {
  try {
    const { topic, title, niche, description, style, goal } = req.body;

    // Validate required fields
    if (!topic || !niche) {
      return res.status(400).json({
        success: false,
        error: 'Topic and niche are required for video analysis'
      });
    }

    console.log('🎥 Video analysis request:', { topic, niche, title });

    // Generate complete video analysis
    const videoAnalysis = await videoContentService.generateCompleteVideoAnalysis({
      topic,
      title,
      niche,
      description,
      style,
      goal
    });

    // Get trending hashtags specifically for video content
    const hashtags = await hashtagResearchService.researchHashtags(topic, niche);

    // Combine all results
    const response = {
      success: true,
      data: {
        ...videoAnalysis,
        hashtags,
        videoMode: true
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Video Analysis Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze video content'
    });
  }
});

// Get video trends only
router.post('/trends', async (req, res) => {
  try {
    const { topic, niche } = req.body;

    if (!topic || !niche) {
      return res.status(400).json({
        success: false,
        error: 'Topic and niche are required'
      });
    }

    const trends = await videoContentService.analyzeVideoTrends(topic, niche);

    res.json({
      success: true,
      data: { trends }
    });
  } catch (error) {
    console.error('Video Trends Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Generate video caption only
router.post('/caption', async (req, res) => {
  try {
    const { topic, title, description, niche } = req.body;

    if (!topic || !niche) {
      return res.status(400).json({
        success: false,
        error: 'Topic and niche are required'
      });
    }

    const captions = await videoContentService.generateVideoCaption(topic, title, description, niche);

    res.json({
      success: true,
      data: { captions }
    });
  } catch (error) {
    console.error('Video Caption Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get trending audio recommendations
router.post('/audio', async (req, res) => {
  try {
    const { niche } = req.body;

    if (!niche) {
      return res.status(400).json({
        success: false,
        error: 'Niche is required'
      });
    }

    const audio = await videoContentService.getTrendingAudio(niche);

    res.json({
      success: true,
      data: { audio }
    });
  } catch (error) {
    console.error('Trending Audio Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get visual trends
router.post('/visuals', async (req, res) => {
  try {
    const { niche } = req.body;

    if (!niche) {
      return res.status(400).json({
        success: false,
        error: 'Niche is required'
      });
    }

    const visuals = await videoContentService.analyzeVisualTrends(niche);

    res.json({
      success: true,
      data: { visuals }
    });
  } catch (error) {
    console.error('Visual Trends Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Generate video hooks
router.post('/hooks', async (req, res) => {
  try {
    const { topic, niche } = req.body;

    if (!topic || !niche) {
      return res.status(400).json({
        success: false,
        error: 'Topic and niche are required'
      });
    }

    const hooks = await videoContentService.generateVideoHooks(topic, niche);

    res.json({
      success: true,
      data: { hooks }
    });
  } catch (error) {
    console.error('Video Hooks Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Predict video success rate
router.post('/success-rate', async (req, res) => {
  try {
    const videoData = req.body;

    if (!videoData.topic || !videoData.niche) {
      return res.status(400).json({
        success: false,
        error: 'Topic and niche are required'
      });
    }

    const successRate = await videoContentService.predictVideoSuccessRate(videoData);

    res.json({
      success: true,
      data: { successRate }
    });
  } catch (error) {
    console.error('Success Rate Prediction Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Suggest video format
router.post('/format', async (req, res) => {
  try {
    const { topic, niche, goal } = req.body;

    if (!topic || !niche) {
      return res.status(400).json({
        success: false,
        error: 'Topic and niche are required'
      });
    }

    const formatSuggestion = await videoContentService.suggestVideoFormat(topic, niche, goal);

    res.json({
      success: true,
      data: { formatSuggestion }
    });
  } catch (error) {
    console.error('Format Suggestion Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
