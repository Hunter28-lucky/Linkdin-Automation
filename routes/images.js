const express = require('express');
const router = express.Router();
const imageService = require('../services/imageService');
const geminiService = require('../services/geminiService');

router.post('/', async (req, res) => {
  try {
    const { topic, style, postContent } = req.body;

    if (!topic) {
      return res.status(400).json({ 
        error: 'Validation Error', 
        message: 'Topic is required' 
      });
    }

    console.log(`\n🖼️  Generating image suggestions for: ${topic}`);

    const [suggestions, recommendation, aiSuggestions] = await Promise.all([
      imageService.getSuggestions(topic, style),
      imageService.getImageRecommendation(topic, postContent || ''),
      geminiService.suggestImages(topic, postContent || topic)
    ]);

    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      topic,
      suggestions,
      recommendation,
      aiSuggestions,
      quickLinks: {
        pexels: suggestions.sources[0].url,
        unsplash: suggestions.sources[1].url,
        lexica: suggestions.sources[2].url
      }
    };

    console.log('✅ Image suggestions generated!\n');
    res.json(response);

  } catch (error) {
    console.error('Image Suggestion Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate image suggestions', 
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
