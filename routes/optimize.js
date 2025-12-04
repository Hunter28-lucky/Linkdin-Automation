const express = require('express');
const router = express.Router();
const geminiService = require('../services/geminiService');

router.post('/', async (req, res) => {
  try {
    const { postContent } = req.body;

    if (!postContent) {
      return res.status(400).json({ 
        error: 'Validation Error', 
        message: 'Post content is required' 
      });
    }

    console.log(`\n⚡ Optimizing post (${postContent.length} characters)...`);

    const optimized = await geminiService.optimizePost(postContent);

    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      original: postContent,
      optimized,
      rules: [
        '✅ Hook under 7 words',
        '✅ Line breaks every 1-2 lines',
        '✅ Engagement CTA',
        '✅ Max 7 hashtags',
        '✅ Mobile-friendly',
        '✅ Algorithm-optimized (2025)'
      ]
    };

    console.log('✅ Post optimized successfully!\n');
    res.json(response);

  } catch (error) {
    console.error('Optimization Error:', error);
    res.status(500).json({ 
      error: 'Failed to optimize post', 
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
