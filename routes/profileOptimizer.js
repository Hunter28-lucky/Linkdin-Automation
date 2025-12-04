const express = require('express');
const router = express.Router();
const profileOptimizerService = require('../services/profileOptimizerService');

/**
 * POST /api/profile-optimize
 * Analyze and optimize LinkedIn profile
 */
router.post('/optimize', async (req, res) => {
  try {
    const { 
      headline, 
      about, 
      experience, 
      skills, 
      niche,
      name,
      role,
      achievements,
      goals,
      action = 'analyze' // 'analyze', 'headline', 'about'
    } = req.body;

    console.log('📊 Profile optimization request:', action);

    let result;

    switch (action) {
      case 'headline':
        result = await profileOptimizerService.optimizeHeadline(
          headline,
          niche,
          req.body.targetAudience
        );
        break;

      case 'about':
        result = await profileOptimizerService.generateAboutSection({
          name,
          role,
          niche,
          achievements,
          skills,
          goals
        });
        break;

      case 'analyze':
      default:
        result = await profileOptimizerService.analyzeProfile({
          headline,
          about,
          experience,
          skills,
          niche
        });
        break;
    }

    res.json({
      success: true,
      action,
      result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Profile optimization error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
