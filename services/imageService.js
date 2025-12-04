const axios = require('axios');

class ImageService {
  constructor() {
    this.sources = {
      pexels: 'https://www.pexels.com/search/',
      unsplash: 'https://unsplash.com/s/photos/',
      lexica: 'https://lexica.art/?q='
    };
  }

  async getSuggestions(topic, postStyle) {
    const searchQuery = this.generateSearchQuery(topic, postStyle);
    
    return {
      searchQuery,
      sources: [
        {
          name: 'Pexels',
          url: `${this.sources.pexels}${encodeURIComponent(searchQuery)}`,
          description: 'High-quality free stock photos',
          recommendation: 'Best for professional, polished looks'
        },
        {
          name: 'Unsplash',
          url: `${this.sources.unsplash}${encodeURIComponent(searchQuery)}`,
          description: 'Beautiful free images by creators',
          recommendation: 'Best for modern, aesthetic vibes'
        },
        {
          name: 'Lexica.art',
          url: `${this.sources.lexica}${encodeURIComponent(searchQuery)}`,
          description: 'AI-generated art and illustrations',
          recommendation: 'Best for unique, eye-catching visuals'
        }
      ],
      promptForAI: this.generateAIPrompt(topic, postStyle),
      engagementTips: this.getEngagementTips(postStyle)
    };
  }

  generateSearchQuery(topic, style) {
    const styleKeywords = {
      'viral': 'bold colorful attention-grabbing',
      'professional': 'clean modern business',
      'story': 'authentic relatable human'
    };

    const styleType = Object.keys(styleKeywords).find(key => 
      style?.toLowerCase().includes(key)
    ) || 'professional';

    return `${topic} ${styleKeywords[styleType]}`;
  }

  generateAIPrompt(topic, style) {
    return `Professional LinkedIn post image for ${topic}, ${style} style, clean composition, high contrast, modern design, suitable for professional social media, 16:9 aspect ratio, minimalist, eye-catching`;
  }

  getEngagementTips(style) {
    return [
      '✅ Use high-contrast colors (stops scrolling)',
      '✅ Include text overlay with key message (2-3 words max)',
      '✅ Ensure mobile visibility (test on phone)',
      '✅ Match image mood to post tone',
      '✅ Avoid cluttered or busy backgrounds',
      `✅ ${style?.includes('viral') ? 'Use bold, unexpected visuals' : 'Keep it professional and clean'}`
    ];
  }

  async getImageRecommendation(topic, postContent) {
    // Analyze post content to suggest best image type
    const hasNumbers = /\d+/.test(postContent);
    const hasStory = /story|journey|experience/i.test(postContent);
    const hasTips = /tip|hack|trick|step/i.test(postContent);

    let recommendation = {
      type: 'general',
      reasoning: '',
      searchTerms: []
    };

    if (hasNumbers || hasTips) {
      recommendation = {
        type: 'infographic',
        reasoning: 'Post contains tips/numbers - infographic style will boost engagement by 2-3x',
        searchTerms: [`${topic} infographic`, `${topic} statistics visual`, `${topic} data visualization`]
      };
    } else if (hasStory) {
      recommendation = {
        type: 'authentic',
        reasoning: 'Story-based content performs better with authentic, relatable imagery',
        searchTerms: [`${topic} authentic`, `${topic} real people`, `${topic} workplace`]
      };
    } else {
      recommendation = {
        type: 'professional',
        reasoning: 'Professional content needs clean, authoritative visuals',
        searchTerms: [`${topic} professional`, `${topic} modern`, `${topic} business`]
      };
    }

    return recommendation;
  }
}

module.exports = new ImageService();
