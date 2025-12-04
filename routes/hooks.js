const express = require('express');
const router = express.Router();
const hookLibraryService = require('../services/hookLibraryService');

/**
 * POST /api/hooks
 * Generate hooks, templates, and analyze hook effectiveness
 */
router.post('/generate', async (req, res) => {
  try {
    const { 
      topic, 
      emotion, 
      niche, 
      style = 'professional',
      action = 'custom' // 'custom', 'category', 'variations', 'analyze', 'industry', 'templates'
    } = req.body;

    console.log('🎣 Hook generation request:', action);

    let result;

    switch (action) {
      case 'category':
        if (!req.body.category) {
          return res.status(400).json({
            success: false,
            error: 'Category required (curiosity, shock, value, storytelling, fomo, authority, question, contrarian, urgency)'
          });
        }
        result = await hookLibraryService.getHooksByCategory(
          req.body.category,
          niche || 'general',
          req.body.limit || 20
        );
        break;

      case 'variations':
        if (!req.body.hook) {
          return res.status(400).json({
            success: false,
            error: 'Original hook required for variations'
          });
        }
        result = await hookLibraryService.generateHookVariations(
          req.body.hook,
          req.body.count || 5
        );
        break;

      case 'analyze':
        if (!req.body.hook) {
          return res.status(400).json({
            success: false,
            error: 'Hook required for analysis'
          });
        }
        result = await hookLibraryService.analyzeHookEffectiveness(req.body.hook);
        break;

      case 'industry':
        if (!req.body.industry) {
          return res.status(400).json({
            success: false,
            error: 'Industry required for industry-specific hooks'
          });
        }
        result = await hookLibraryService.getIndustrySpecificHooks(
          req.body.industry,
          req.body.count || 30
        );
        break;

      case 'templates':
        result = {
          templates: hookLibraryService.getHookTemplates(),
          categories: hookLibraryService.getAllCategories(),
          usage: 'Replace placeholders like ${topic}, ${number}, etc. with your content'
        };
        break;

      case 'custom':
      default:
        if (!topic || !emotion || !niche) {
          return res.status(400).json({
            success: false,
            error: 'Topic, emotion, and niche are required for custom hook generation'
          });
        }
        result = await hookLibraryService.generateCustomHook(topic, emotion, niche, style);
        break;
    }

    res.json({
      success: true,
      action,
      result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Hook generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
