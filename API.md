# 🎯 API Documentation - LinkedIn Viral Automation

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### 1. Health Check
**GET** `/health`

Check if API is running.

**Response:**
```json
{
  "status": "online",
  "message": "LinkedIn Viral Automation API",
  "version": "1.0.0",
  "timestamp": "2025-12-03T10:30:00.000Z"
}
```

---

### 2. Generate Posts
**POST** `/generate`

Generate viral LinkedIn posts with trends, images, and optimization.

**Request Body:**
```json
{
  "topic": "Website development",
  "style": "Professional + Viral",
  "goal": "Showcase my project",
  "link": "https://krishgoswami.me",
  "assets": "Built with React and Node.js"
}
```

**Parameters:**
- `topic` (required): Main topic for the post
- `style` (optional): Content style - default "Professional + Viral"
- `goal` (optional): Post objective
- `link` (optional): URL to include
- `assets` (optional): Additional context

**Response:**
```json
{
  "success": true,
  "timestamp": "2025-12-03T10:30:00.000Z",
  "input": {...},
  "trends": {
    "analysis": "AI-generated trend analysis...",
    "data": {
      "googleTrends": {...},
      "recommendedHashtags": [...],
      "viralPotential": {
        "score": 85,
        "rating": "High",
        "recommendation": "Excellent time to post!"
      }
    }
  },
  "posts": {
    "raw": "Generated posts in 3 formats...",
    "bestPostingTimes": [...]
  },
  "images": {
    "suggestions": {...},
    "recommendation": {...}
  },
  "meta": {
    "recommendedHashtags": [...],
    "optimizationTips": [...]
  }
}
```

---

### 3. Get Trends
**GET** `/trends?topic=your-topic`

Analyze trending topics and hashtags.

**Query Parameters:**
- `topic` (required): Topic to analyze

**Response:**
```json
{
  "success": true,
  "timestamp": "2025-12-03T10:30:00.000Z",
  "topic": "web development",
  "trends": {
    "googleTrends": {...},
    "recommendedHashtags": [...],
    "viralPotential": {...}
  },
  "recommendations": {
    "bestHashtags": [...],
    "postingTimes": [...]
  }
}
```

---

### 4. Get Hashtags
**GET** `/trends/hashtags?topic=your-topic`

Get recommended hashtags for a topic.

**Query Parameters:**
- `topic` (required): Topic to find hashtags for

**Response:**
```json
{
  "success": true,
  "timestamp": "2025-12-03T10:30:00.000Z",
  "topic": "web development",
  "hashtags": [
    {
      "hashtag": "#WebDevelopment",
      "followers": 1250000,
      "engagement": "4.2%"
    }
  ],
  "recommended": [...]
}
```

---

### 5. Get Image Suggestions
**POST** `/images`

Get image recommendations and sources.

**Request Body:**
```json
{
  "topic": "AI automation",
  "style": "Professional",
  "postContent": "Your post content here..."
}
```

**Parameters:**
- `topic` (required): Main topic
- `style` (optional): Content style
- `postContent` (optional): Post text for context

**Response:**
```json
{
  "success": true,
  "timestamp": "2025-12-03T10:30:00.000Z",
  "topic": "AI automation",
  "suggestions": {
    "searchQuery": "AI automation modern professional",
    "sources": [
      {
        "name": "Pexels",
        "url": "https://www.pexels.com/search/...",
        "description": "High-quality free stock photos",
        "recommendation": "Best for professional looks"
      }
    ],
    "promptForAI": "...",
    "engagementTips": [...]
  },
  "recommendation": {
    "type": "professional",
    "reasoning": "...",
    "searchTerms": [...]
  },
  "quickLinks": {
    "pexels": "...",
    "unsplash": "...",
    "lexica": "..."
  }
}
```

---

### 6. Optimize Post
**POST** `/optimize`

Optimize existing post for LinkedIn algorithm.

**Request Body:**
```json
{
  "postContent": "Your existing post content to optimize..."
}
```

**Parameters:**
- `postContent` (required): Post text to optimize

**Response:**
```json
{
  "success": true,
  "timestamp": "2025-12-03T10:30:00.000Z",
  "original": "...",
  "optimized": "OPTIMIZED POST:\n...\n\nCHANGES MADE:\n...",
  "rules": [
    "✅ Hook under 7 words",
    "✅ Line breaks every 1-2 lines",
    ...
  ]
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "error": "Error Type",
  "message": "Detailed error message",
  "timestamp": "2025-12-03T10:30:00.000Z"
}
```

**Common Error Codes:**
- `400` - Bad Request (missing required fields)
- `500` - Internal Server Error (API or processing issue)

---

## Rate Limiting

Currently no rate limiting (free tier).

For production use:
- Consider implementing rate limiting
- Cache responses when possible
- Monitor Gemini API quota

---

## Example: Full Workflow

```javascript
// 1. Generate complete content package
const response = await fetch('http://localhost:5000/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    topic: 'AI in healthcare',
    style: 'Professional + Viral',
    goal: 'Educate and engage'
  })
});

const data = await response.json();

// 2. Extract posts
const posts = data.posts.raw;

// 3. Get best posting time
const bestTime = data.posts.bestPostingTimes[0];

// 4. Get hashtags
const hashtags = data.meta.recommendedHashtags;

// 5. Get image links
const imageLinks = data.images.suggestions.sources;

// 6. Check viral potential
const viralScore = data.trends.viralPotential.score;
```

---

## Tips for Best Results

1. **Be Specific**: More specific topics = better content
2. **Provide Context**: Use `assets` field for extra details
3. **Include Links**: Add relevant URLs in the `link` field
4. **Choose Style**: Match style to your audience
5. **Test Variations**: Try different inputs for variety

---

## Gemini API Considerations

**Free Tier Limits:**
- 60 requests per minute
- 1,500 requests per day
- Subject to change by Google

**Best Practices:**
- Cache responses when possible
- Implement retry logic
- Handle rate limit errors gracefully
- Monitor usage in Google AI Studio

---

**Made with ⚡ by Krish Goswami**
