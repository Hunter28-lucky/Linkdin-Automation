const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is required in .env file');
    }
    
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Using gemini-2.0-flash (latest stable free model)
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async generateContent(prompt) {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to generate content: ' + error.message);
    }
  }

  async generateTrends(topic) {
    const prompt = `You are a LinkedIn trend analysis expert. Analyze current trends for: "${topic}"

Provide EXACTLY this structure (be precise):

TRENDING_TOPICS:
1. [Specific trend with % growth if possible]
2. [Specific trend with % growth if possible]
3. [Specific trend with % growth if possible]

BEST_VIRAL_ANGLE:
[One powerful angle that will perform best]

VIRAL_HOOK:
[A 5-7 word hook that stops scrolling]

Keep it real, data-driven, and actionable. Focus on what's ACTUALLY trending on LinkedIn right now in ${new Date().getFullYear()}.`;

    return await this.generateContent(prompt);
  }

  async generatePosts(userInput) {
    const { topic, style, goal, link, assets } = userInput;
    
    const prompt = `You are Krish Goswami's AI LinkedIn Content Agent. Create VIRAL-READY LinkedIn posts.

USER INPUT:
Topic: ${topic}
Style: ${style}
Goal: ${goal}
${link ? `Link: ${link}` : ''}
${assets ? `Assets: ${assets}` : ''}

GENERATE 3 POST VARIATIONS:

FORMAT A - SHORT VIRAL:
- Hook (under 7 words)
- 3-5 lines max
- Bold value proposition
- Strong CTA
- 5-7 hashtags

FORMAT B - PROFESSIONAL AUTHORITY:
- Expert positioning
- Clear structure: Problem → Insight → Value
- Micro-steps or framework
- Professional CTA
- 5-7 hashtags

FORMAT C - STORY HOOK (EMOTIONAL):
- Personal/relatable opening (1-2 lines)
- The transformation/lesson
- Universal takeaway
- Reflective CTA
- 5-7 hashtags

CRITICAL RULES:
- Line breaks every 1-2 lines
- Mobile-friendly
- No clichés or generic AI-sounding content
- Use psychological hooks
- Keep it crisp and high-value
- Include emojis ONLY if they add value
${link ? `- Naturally incorporate this link: ${link}` : ''}

Output each post clearly labeled as (A), (B), (C).`;

    return await this.generateContent(prompt);
  }

  async optimizePost(postContent) {
    const prompt = `You are a LinkedIn algorithm optimization expert (2025). 

ORIGINAL POST:
${postContent}

OPTIMIZE THIS POST for maximum engagement following these rules:

✅ Hook: Under 7 words, stops scrolling
✅ Line breaks: Every 1-2 lines
✅ CTAs: "Thoughts?", "Agree?", "Want part 2?"
✅ Hashtags: Max 7, highly relevant
✅ Mobile-friendly: Easy to read on phone
✅ Engagement: Design for comments/shares
✅ Value: Clear benefit in first 3 lines

Provide:
1. OPTIMIZED POST (ready to copy-paste)
2. CHANGES MADE (brief list)
3. ENGAGEMENT PREDICTION (why it will perform better)`;

    return await this.generateContent(prompt);
  }

  async suggestImages(topic, postContent) {
    const prompt = `You are a visual content strategist for LinkedIn.

TOPIC: ${topic}
POST CONTENT: ${postContent.substring(0, 300)}...

Suggest 3 free image sources/ideas:

1. SPECIFIC SEARCH QUERY for:
   - Pexels.com
   - Unsplash.com
   - Lexica.art

2. WHY THIS IMAGE TYPE will boost engagement

3. VISUAL ELEMENTS to include:
   - Color psychology
   - Composition
   - Text overlay suggestions

4. EXPECTED CTR INCREASE: [percentage and reasoning]

Keep suggestions SPECIFIC and ACTIONABLE. Include exact search terms.`;

    return await this.generateContent(prompt);
  }
}

module.exports = new GeminiService();
