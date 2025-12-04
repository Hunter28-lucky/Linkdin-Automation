const express = require('express');
const router = express.Router();
const trendService = require('../services/trendService');
const geminiService = require('../services/geminiService');

router.get('/', async (req, res) => {
  try {
    const { topic } = req.query;

    if (!topic) {
      return res.status(400).json({ 
        error: 'Validation Error', 
        message: 'Topic query parameter is required' 
      });
    }

    console.log(`\n📊 Fetching trends for: ${topic}`);

    const [trendData, aiAnalysis] = await Promise.all([
      trendService.analyzeTrendingTopics(topic),
      geminiService.generateTrends(topic)
    ]);

    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      topic,
      trends: trendData,
      aiAnalysis,
      recommendations: {
        bestHashtags: trendData.recommendedHashtags.slice(0, 7),
        viralPotential: trendData.viralPotential,
        postingTimes: trendData.bestPostingTimes
      }
    };

    console.log('✅ Trends fetched successfully!\n');
    res.json(response);

  } catch (error) {
    console.error('Trends Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch trends', 
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

router.get('/hashtags', async (req, res) => {
  try {
    const { topic } = req.query;

    if (!topic) {
      return res.status(400).json({ 
        error: 'Validation Error', 
        message: 'Topic query parameter is required' 
      });
    }

    const hashtagData = await trendService.getLinkedInHashtagData(topic);

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      topic,
      hashtags: hashtagData,
      recommended: hashtagData.slice(0, 7)
    });

  } catch (error) {
    console.error('Hashtag Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch hashtags', 
      message: error.message 
    });
  }
});

module.exports = router;
