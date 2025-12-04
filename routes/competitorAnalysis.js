const express = require('express');
const router = express.Router();
const competitorAnalysisService = require('../services/competitorAnalysisService');

/**
 * POST /api/competitor-analysis
 * Analyze competitors and find content opportunities
 */
router.post('/analyze', async (req, res) => {
  try {
    const { 
      action = 'single', // 'single', 'gaps', 'compare', 'reverse-engineer'
      competitor,
      competitors,
      niche,
      userProfile,
      postContent,
      postMetrics
    } = req.body;

    console.log('🔎 Competitor analysis request:', action);

    let result;

    switch (action) {
      case 'single':
        if (!competitor) {
          return res.status(400).json({
            success: false,
            error: 'Competitor information required (name, niche, profileUrl, etc.)'
          });
        }
        result = await competitorAnalysisService.analyzeCompetitor(competitor);
        break;

      case 'gaps':
        if (!niche) {
          return res.status(400).json({
            success: false,
            error: 'Niche required for content gap analysis'
          });
        }
        result = await competitorAnalysisService.findContentGaps(
          niche,
          req.body.competitorNames || []
        );
        break;

      case 'compare':
        if (!competitors || competitors.length === 0) {
          return res.status(400).json({
            success: false,
            error: 'Competitors list required for comparison'
          });
        }
        result = await competitorAnalysisService.compareMultipleCompetitors(
          competitors,
          userProfile || { niche: niche || 'general' }
        );
        break;

      case 'reverse-engineer':
        if (!postContent) {
          return res.status(400).json({
            success: false,
            error: 'Post content required for reverse engineering'
          });
        }
        result = await competitorAnalysisService.reverseEngineerViralPost(
          postContent,
          postMetrics || {}
        );
        break;

      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid action. Use: single, gaps, compare, or reverse-engineer'
        });
    }

    res.json({
      success: true,
      action,
      result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Competitor analysis error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
