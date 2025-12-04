const express = require('express');
const router = express.Router();
const hashtagResearchService = require('../services/hashtagResearchService');

/**
 * POST /api/hashtag-research
 * Research and analyze hashtags for LinkedIn posts
 */
router.post('/research', async (req, res) => {
  try {
    const { 
      topic, 
      niche, 
      contentType = 'post',
      action = 'research' // 'research', 'analyze', 'trending', 'banned'
    } = req.body;

    console.log('🔍 Hashtag research request:', action);

    let result;

    switch (action) {
      case 'analyze':
        if (!req.body.hashtag) {
          return res.status(400).json({
            success: false,
            error: 'Hashtag required for analysis'
          });
        }
        result = await hashtagResearchService.analyzeHashtagPerformance(req.body.hashtag);
        break;

      case 'trending':
        result = await hashtagResearchService.findTrendingHashtags(
          niche || 'business',
          req.body.limit || 20
        );
        break;

      case 'banned':
        if (!req.body.hashtags) {
          return res.status(400).json({
            success: false,
            error: 'Hashtag list required for banned detection'
          });
        }
        result = await hashtagResearchService.detectBannedHashtags(req.body.hashtags);
        break;

      case 'research':
      default:
        if (!topic || !niche) {
          return res.status(400).json({
            success: false,
            error: 'Topic and niche are required for hashtag research'
          });
        }
        result = await hashtagResearchService.researchHashtags(topic, niche, contentType);
        break;
    }

    res.json({
      success: true,
      action,
      result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Hashtag research error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
