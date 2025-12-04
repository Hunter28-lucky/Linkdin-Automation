const { GoogleGenerativeAI } = require('@google/generative-ai');

class HashtagResearchService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async researchHashtags(topic, niche, contentType = 'post') {
    const prompt = `You are a MASTER LinkedIn Hashtag Strategist with deep knowledge of the LinkedIn algorithm.

# HASHTAG RESEARCH REQUEST

**Topic:** ${topic}
**Niche/Industry:** ${niche}
**Content Type:** ${contentType}

# YOUR TASK: COMPREHENSIVE HASHTAG STRATEGY

## 1. OPTIMAL HASHTAG MIX (25-30 hashtags)

**TIER 1: MEGA HASHTAGS (1-2 hashtags)**
Followers: 1M+
Competition: VERY HIGH
Purpose: Maximum reach potential
Examples: #Leadership, #Innovation

**TIER 2: POPULAR HASHTAGS (3-5 hashtags)**
Followers: 100K-1M
Competition: HIGH
Purpose: Balanced reach & engagement
Examples: #ContentMarketing, #B2BSales

**TIER 3: NICHE HASHTAGS (8-12 hashtags)**
Followers: 10K-100K
Competition: MODERATE
Purpose: Targeted audience, higher engagement rate
Examples: #SaaSGrowth, #LinkedInTips

**TIER 4: MICRO HASHTAGS (5-8 hashtags)**
Followers: 1K-10K
Competition: LOW
Purpose: Highly targeted, community building
Examples: #IndieHackers, #RemoteWorkLife

**TIER 5: BRANDED/UNIQUE (2-3 hashtags)**
Followers: <1K
Competition: NONE
Purpose: Brand building, trackability
Examples: #YourBrandName, #YourCampaign

## 2. TRENDING HASHTAGS RIGHT NOW

List 10 hashtags that are CURRENTLY trending in this niche:
1. **#HashtagName** - Why it's trending, estimated reach, competition level
2. [Continue for all 10]

## 3. BANNED/SPAM HASHTAGS TO AVOID ⚠️

List hashtags that are:
- Shadowbanned on LinkedIn
- Too spammy (used by bots)
- Not relevant to professional content
- Hurt post reach

Example: #FollowBack, #LikeForLike, #InstaDaily, #PhotoOfTheDay

## 4. PERFORMANCE PREDICTIONS

For each recommended hashtag, provide:
- **Estimated Impressions:** Low/Medium/High/Very High
- **Engagement Rate:** Low/Medium/High
- **Competition Level:** Low/Medium/High/Very High
- **Best Day to Use:** Monday-Sunday recommendation

## 5. HASHTAG COMBINATIONS (3 PROVEN MIXES)

**Mix A - Maximum Reach:**
[List 20-25 hashtags focused on reach]

**Mix B - Best Engagement:**
[List 20-25 hashtags focused on engagement rate]

**Mix C - Niche Authority:**
[List 20-25 hashtags focused on establishing expertise]

## 6. HASHTAG PLACEMENT STRATEGY

**In Post:**
- How many: X hashtags
- Where: First comment vs. in post
- Format: Inline vs. grouped at bottom

**In Comments:**
- How many: X hashtags
- Timing: Post immediately or wait
- Strategy: Why this approach

## 7. COMPETITOR HASHTAG ANALYSIS

Common hashtags used by top performers in ${niche}:
1. [Hashtag] - Used by X% of top posts
2. [Continue...]

Hidden gems competitors are using:
1. [Hashtag] - Why it works
2. [Continue...]

## 8. CONTENT-TYPE SPECIFIC RECOMMENDATIONS

**For ${contentType}:**
- Hashtags to prioritize
- Hashtags to avoid
- Optimal number
- Placement strategy

## 9. SEASONAL & TIMELY HASHTAGS

Current events/seasons to leverage:
- Industry events
- Holidays
- Awareness months
- Trending topics

## 10. TRACKING & OPTIMIZATION

**KPIs to Monitor:**
- Impressions per hashtag
- Engagement rate by hashtag
- Follower acquisition
- Profile visits

**Optimization Tips:**
- When to rotate hashtags
- How to test new ones
- What success looks like

Provide SPECIFIC, ACTIONABLE data with estimated metrics.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Hashtag Research Error:', error);
      throw new Error('Failed to research hashtags: ' + error.message);
    }
  }

  async analyzeHashtagPerformance(hashtag) {
    const prompt = `Analyze the hashtag: ${hashtag}

Provide detailed analysis:

1. **Estimated Follower Count:** [number]
2. **Competition Level:** Low/Medium/High/Very High
3. **Engagement Rate:** Low/Medium/High (%)
4. **Best Use Cases:** [When to use this hashtag]
5. **Similar Hashtags:** [5 alternatives with similar reach]
6. **Trending Status:** Rising/Stable/Declining
7. **Risk Level:** Safe/Moderate/Risky (spam potential)
8. **Best Time to Post:** [Day/time recommendations]
9. **Average Post Impressions:** [Estimated range]
10. **Recommendation:** Should use / Proceed with caution / Avoid

Be specific with numbers and recommendations.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error('Failed to analyze hashtag: ' + error.message);
    }
  }

  async findTrendingHashtags(niche, limit = 20) {
    const prompt = `Find the TOP ${limit} TRENDING hashtags RIGHT NOW in: ${niche}

For each hashtag provide:
**#HashtagName**
- Trend Status: 🔥 Hot / 📈 Rising / ⚡ Viral
- Estimated Daily Posts: [number]
- Competition: Low/Medium/High
- Why It's Trending: [Brief explanation]
- Recommended For: [Type of content]
- Action: Use Now / Wait / Monitor

Focus on hashtags that are actively trending TODAY, not generic popular ones.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error('Failed to find trending hashtags: ' + error.message);
    }
  }

  async detectBannedHashtags(hashtagList) {
    const hashtags = Array.isArray(hashtagList) ? hashtagList.join(', ') : hashtagList;
    
    const prompt = `Analyze these hashtags for spam/ban risk: ${hashtags}

For EACH hashtag, determine:

**SAFE ✅**
[List hashtags that are safe to use]

**CAUTION ⚠️**
[List hashtags that might be risky]
- Why: [Reason for caution]
- Alternative: [Better option]

**BANNED/AVOID ❌**
[List hashtags that are shadowbanned or spam]
- Why: [Reason it's banned]
- Impact: [How it hurts reach]
- Alternative: [Better option]

Be thorough and explain the reasoning for each classification.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error('Failed to detect banned hashtags: ' + error.message);
    }
  }
}

module.exports = new HashtagResearchService();
