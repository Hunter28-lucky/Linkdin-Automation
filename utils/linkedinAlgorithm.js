const algorithmRules = {
  // LinkedIn Algorithm Optimization Rules (2025)
  hookMaxWords: 7,
  maxHashtags: 7,
  lineBreakFrequency: 2, // Every 1-2 lines
  
  bestPostingTimes: {
    IST: ['08:30', '13:00', '17:30'],
    description: {
      '08:30': 'Morning commute, high engagement',
      '13:00': 'Lunch break, peak activity',
      '17:30': 'Evening wind-down, excellent reach'
    }
  },

  engagementCTAs: [
    'Thoughts?',
    'Agree or disagree?',
    'Want part 2?',
    'What do you think?',
    'Drop your opinion below',
    'Have you experienced this?',
    'Tag someone who needs this'
  ],

  contentStructure: {
    hook: {
      maxWords: 7,
      tips: [
        'Use numbers when possible',
        'Ask a question',
        'Make a bold statement',
        'Create curiosity'
      ]
    },
    body: {
      maxLines: 15,
      tips: [
        'Line breaks every 1-2 lines',
        'Use bullet points or emojis',
        'Keep paragraphs short',
        'Mobile-first formatting'
      ]
    },
    cta: {
      placement: 'end',
      tips: [
        'Ask for engagement',
        'Include a question',
        'Encourage shares',
        'Request opinions'
      ]
    }
  },

  hashtagStrategy: {
    total: 7,
    distribution: {
      broad: 2,    // e.g., #AI, #WebDev
      niche: 3,    // e.g., #ReactJS, #NodeJS
      branded: 2   // e.g., #TechTips, #CareerGrowth
    },
    placement: 'end_of_post',
    tips: [
      'Research follower count',
      'Check engagement rates',
      'Mix popular and niche',
      'Avoid spam hashtags'
    ]
  },

  contentTypes: {
    viral: {
      characteristics: ['Bold hook', 'Controversial take', 'Pattern interrupt'],
      structure: 'Hook → Quick value → Strong CTA',
      length: 'Short (3-7 lines)'
    },
    professional: {
      characteristics: ['Authority positioning', 'Clear value', 'Structured'],
      structure: 'Problem → Insight → Solution → CTA',
      length: 'Medium (8-12 lines)'
    },
    story: {
      characteristics: ['Personal', 'Emotional', 'Relatable'],
      structure: 'Hook → Story → Lesson → CTA',
      length: 'Medium-Long (10-15 lines)'
    }
  },

  imageGuidelines: {
    aspectRatio: '16:9 or 4:5',
    quality: 'High resolution',
    style: ['Professional', 'Clean', 'High contrast'],
    textOverlay: {
      recommended: true,
      maxWords: 5,
      readability: 'High'
    },
    tips: [
      'Use bright, contrasting colors',
      'Avoid cluttered backgrounds',
      'Test mobile visibility',
      'Match image tone to post'
    ]
  },

  performanceMetrics: {
    excellent: {
      engagement_rate: '> 5%',
      comments: '> 10',
      shares: '> 5'
    },
    good: {
      engagement_rate: '3-5%',
      comments: '5-10',
      shares: '2-5'
    },
    needs_improvement: {
      engagement_rate: '< 3%',
      comments: '< 5',
      shares: '< 2'
    }
  }
};

function validatePost(postContent) {
  const lines = postContent.split('\n').filter(line => line.trim());
  const words = postContent.split(/\s+/);
  const hashtags = postContent.match(/#\w+/g) || [];
  
  const validation = {
    valid: true,
    issues: [],
    suggestions: []
  };

  // Check hook length (first line)
  const hookWords = lines[0]?.split(/\s+/).length || 0;
  if (hookWords > algorithmRules.hookMaxWords) {
    validation.issues.push(`Hook is ${hookWords} words (recommended: max ${algorithmRules.hookMaxWords})`);
  }

  // Check hashtag count
  if (hashtags.length > algorithmRules.maxHashtags) {
    validation.issues.push(`Too many hashtags: ${hashtags.length} (recommended: max ${algorithmRules.maxHashtags})`);
  }

  // Check for CTA
  const hasCTA = algorithmRules.engagementCTAs.some(cta => 
    postContent.toLowerCase().includes(cta.toLowerCase())
  );
  if (!hasCTA) {
    validation.suggestions.push('Add an engagement CTA at the end');
  }

  // Check line length
  const longLines = lines.filter(line => line.length > 100);
  if (longLines.length > 0) {
    validation.suggestions.push('Some lines are too long - consider breaking them up');
  }

  validation.valid = validation.issues.length === 0;
  
  return validation;
}

function getOptimizationScore(postContent) {
  const validation = validatePost(postContent);
  let score = 100;

  score -= validation.issues.length * 10;
  score -= validation.suggestions.length * 5;

  return {
    score: Math.max(0, score),
    rating: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Improvement',
    validation
  };
}

module.exports = {
  algorithmRules,
  validatePost,
  getOptimizationScore
};
