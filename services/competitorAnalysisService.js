const { GoogleGenerativeAI } = require('@google/generative-ai');

class CompetitorAnalysisService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async analyzeCompetitor(competitorInfo) {
    const { name, profileUrl, niche, description, recentPosts } = competitorInfo;
    
    const prompt = `You are an ELITE LinkedIn Competitor Intelligence Expert.

# COMPETITOR ANALYSIS REQUEST

**Competitor:** ${name || 'Not provided'}
**Profile URL:** ${profileUrl || 'Not provided'}
**Niche:** ${niche}
**Description:** ${description || 'Not provided'}
**Recent Posts:** ${recentPosts || 'Not provided'}

# YOUR TASK: COMPREHENSIVE COMPETITOR ANALYSIS

## 1. PROFILE ANALYSIS

**Positioning:**
- How they present themselves
- Value proposition
- Unique angle
- Credibility indicators

**Profile Strength Score:** X/100
- Headline effectiveness: X/20
- About section: X/20
- Content quality: X/20
- Engagement rate: X/20
- Network size impact: X/20

## 2. CONTENT STRATEGY BREAKDOWN

**Posting Frequency:**
- Posts per week: X
- Best posting times: [days/times]
- Consistency score: X/10

**Content Themes:** (with percentages)
1. [Theme A] - X%
2. [Theme B] - X%
3. [Theme C] - X%
4. [Theme D] - X%
5. [Other] - X%

**Content Formats:**
- Text-only posts: X%
- Posts with images: X%
- Posts with documents/PDFs: X%
- Posts with videos: X%
- Polls: X%
- Articles: X%

**Average Post Length:** X words

## 3. TOP-PERFORMING CONTENT ANALYSIS

**Most Viral Post:**
- Topic: [topic]
- Format: [format]
- Hook: [first line]
- Engagement: [estimated]
- Why it worked: [analysis]

**Top 5 Content Patterns:**
1. [Pattern] - Engagement score: X/10
2. [Pattern] - Engagement score: X/10
3. [Pattern] - Engagement score: X/10
4. [Pattern] - Engagement score: X/10
5. [Pattern] - Engagement score: X/10

## 4. ENGAGEMENT STRATEGY

**How They Drive Engagement:**
- Call-to-action style
- Question usage
- Comment engagement
- Community building tactics

**Estimated Metrics:**
- Average likes per post: X
- Average comments per post: X
- Average shares per post: X
- Engagement rate: X%

## 5. HASHTAG STRATEGY

**Most Used Hashtags:**
1. #Hashtag1 - Used X times
2. #Hashtag2 - Used X times
3. #Hashtag3 - Used X times
4. #Hashtag4 - Used X times
5. #Hashtag5 - Used X times

**Hashtag Strategy Type:**
- Broad vs Niche: [analysis]
- Quantity: [typical number]
- Placement: In post vs comments

## 6. AUDIENCE ANALYSIS

**Target Audience:**
- Primary: [description]
- Secondary: [description]
- Pain points addressed: [list]

**Audience Engagement Pattern:**
- Who comments most
- What they respond to
- Common questions asked

## 7. COMPETITIVE GAPS & OPPORTUNITIES

**What They're Doing Well:**
1. [Strength 1]
2. [Strength 2]
3. [Strength 3]

**What They're Missing:**
1. [Gap 1] - Your opportunity
2. [Gap 2] - Your opportunity
3. [Gap 3] - Your opportunity

**Underserved Topics:**
- [Topic 1] - Audience wants this
- [Topic 2] - Audience wants this
- [Topic 3] - Audience wants this

## 8. DIFFERENTIATION STRATEGY

**How to Stand Out:**
1. [Strategy 1] - Why it works
2. [Strategy 2] - Why it works
3. [Strategy 3] - Why it works

**Unique Angles to Explore:**
- [Angle 1]
- [Angle 2]
- [Angle 3]

**Content Topics to Own:**
- [Topic 1] - Why you can win here
- [Topic 2] - Why you can win here
- [Topic 3] - Why you can win here

## 9. CONTENT RECOMMENDATIONS

**What to Replicate (but better):**
1. [Strategy] - How to improve
2. [Strategy] - How to improve
3. [Strategy] - How to improve

**What to Avoid:**
1. [Mistake] - Why it's not working
2. [Mistake] - Why it's not working
3. [Mistake] - Why it's not working

**Your 90-Day Content Plan:**
Week 1-4: [Focus area]
Week 5-8: [Focus area]
Week 9-12: [Focus area]

## 10. COMPETITIVE ADVANTAGE MATRIX

**Where You Can Win:**

| Category | Competitor Strength | Your Opportunity | Strategy |
|----------|-------------------|------------------|----------|
| Content depth | [score] | [score] | [approach] |
| Engagement | [score] | [score] | [approach] |
| Frequency | [score] | [score] | [approach] |
| Authenticity | [score] | [score] | [approach] |
| Value delivery | [score] | [score] | [approach] |

## 11. ACTION ITEMS (Priority Ordered)

**Immediate (This Week):**
1. [Action] - Impact: High/Medium/Low
2. [Action] - Impact: High/Medium/Low
3. [Action] - Impact: High/Medium/Low

**Short-term (This Month):**
1. [Action] - Impact: High/Medium/Low
2. [Action] - Impact: High/Medium/Low
3. [Action] - Impact: High/Medium/Low

**Long-term (This Quarter):**
1. [Action] - Impact: High/Medium/Low
2. [Action] - Impact: High/Medium/Low
3. [Action] - Impact: High/Medium/Low

Provide SPECIFIC, ACTIONABLE insights with real examples.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Competitor Analysis Error:', error);
      throw new Error('Failed to analyze competitor: ' + error.message);
    }
  }

  async findContentGaps(niche, competitorNames = []) {
    const competitors = competitorNames.length > 0 ? competitorNames.join(', ') : 'top performers';
    
    const prompt = `Analyze the ${niche} space on LinkedIn.

Competitors to consider: ${competitors}

# CONTENT GAP ANALYSIS

## 1. OVERSATURATED TOPICS (Avoid These)
List topics that are over-covered:
- [Topic] - Why it's saturated, engagement potential: Low
- [Topic] - Why it's saturated, engagement potential: Low

## 2. UNDERSERVED TOPICS (Opportunity!)
List topics with high demand but low supply:
- [Topic] - Why it's overlooked, engagement potential: High
- [Topic] - Why it's overlooked, engagement potential: Very High

## 3. EMERGING TRENDS (Get Ahead)
Topics that are just starting to gain traction:
- [Trend] - Growth trajectory, timing: Now/Soon/Watch
- [Trend] - Growth trajectory, timing: Now/Soon/Watch

## 4. CONTENT FORMAT GAPS
Formats that competitors aren't using effectively:
- [Format] - Opportunity level: High/Medium/Low
- [Format] - Opportunity level: High/Medium/Low

## 5. UNIQUE ANGLE OPPORTUNITIES
Perspectives that aren't being explored:
- [Angle] - Why it's different, potential impact
- [Angle] - Why it's different, potential impact

## 6. BLUE OCEAN CONTENT IDEAS
10 specific content ideas with low competition but high demand:
1. [Specific idea] - Why it works, competition level: Low
2. [Specific idea] - Why it works, competition level: Low
[Continue for all 10]

Provide SPECIFIC opportunities, not generic advice.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error('Failed to find content gaps: ' + error.message);
    }
  }

  async compareMultipleCompetitors(competitors, userProfile) {
    const competitorList = Array.isArray(competitors) ? competitors.join('\n') : competitors;
    
    const prompt = `Compare these LinkedIn competitors in ${userProfile.niche || 'this niche'}:

${competitorList}

**Your Profile:**
${JSON.stringify(userProfile, null, 2)}

# COMPETITIVE LANDSCAPE ANALYSIS

## 1. COMPETITIVE MATRIX

| Competitor | Followers | Engagement Rate | Post Frequency | Content Quality | Unique Strength |
|------------|-----------|----------------|----------------|-----------------|-----------------|
| [Name] | [est] | [%] | [X/week] | [score/10] | [what they do best] |
| [Name] | [est] | [%] | [X/week] | [score/10] | [what they do best] |

## 2. MARKET POSITIONING MAP

**Thought Leaders (High Authority, High Engagement):**
- [Names]

**Rising Stars (Growing Fast, High Engagement):**
- [Names]

**Established (High Followers, Moderate Engagement):**
- [Names]

**Your Position:** [Where you fit]
**Target Position:** [Where you should aim]

## 3. CONTENT STRATEGY COMPARISON

**Most Differentiated Competitor:**
- Who: [name]
- What they do differently: [strategy]
- Why it works: [analysis]
- How you can adapt: [recommendation]

**Biggest Threat:**
- Who: [name]
- Why they're a threat: [analysis]
- How to compete: [strategy]

**Best Collaboration Opportunity:**
- Who: [name]
- Why collaborate: [reasoning]
- How to approach: [strategy]

## 4. COLLECTIVE GAPS

What NONE of the competitors are doing:
1. [Gap] - Opportunity size: Massive/Large/Medium
2. [Gap] - Opportunity size: Massive/Large/Medium
3. [Gap] - Opportunity size: Massive/Large/Medium

## 5. YOUR COMPETITIVE ADVANTAGES

Based on your profile, you can win by:
1. [Advantage] - How to leverage it
2. [Advantage] - How to leverage it
3. [Advantage] - How to leverage it

## 6. 12-MONTH DOMINATION PLAN

**Months 1-3: Establish Presence**
- [Strategy]
- Target: [metric]

**Months 4-6: Build Authority**
- [Strategy]
- Target: [metric]

**Months 7-9: Scale Engagement**
- [Strategy]
- Target: [metric]

**Months 10-12: Dominate Niche**
- [Strategy]
- Target: [metric]

Be BRUTALLY HONEST about strengths and weaknesses.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error('Failed to compare competitors: ' + error.message);
    }
  }

  async reverseEngineerViralPost(postContent, postMetrics) {
    const prompt = `Reverse engineer this viral LinkedIn post:

**Post Content:**
${postContent}

**Estimated Metrics:**
${JSON.stringify(postMetrics, null, 2)}

# VIRAL POST BREAKDOWN

## 1. HOOK ANALYSIS

**First Line:**
"[Extract first line]"

**Hook Score:** X/10

**What Makes It Work:**
- Psychological trigger: [curiosity/shock/value/etc]
- Pattern interrupt: Yes/No
- Specificity level: High/Medium/Low
- Emotional impact: [emotion]

## 2. STRUCTURE BREAKDOWN

**Opening:** [analysis]
**Body:** [analysis]
**Close:** [analysis]

**Flow Score:** X/10

## 3. ENGAGEMENT DRIVERS

**What Makes People:**
- Like: [element]
- Comment: [element]
- Share: [element]

**Call-to-Action Effectiveness:** X/10

## 4. ALGORITHM OPTIMIZATION

**LinkedIn Algorithm Factors:**
- Dwell time potential: High/Medium/Low (estimated X seconds)
- Comment likelihood: X/10
- Share potential: X/10
- Save potential: X/10

**Algorithm Score:** X/100

## 5. REPLICABLE ELEMENTS

**Formula Identified:**
[Hook format] + [Story structure] + [Value delivery] + [CTA type]

**Template Created:**
[Generalized template with fill-in-the-blanks]

## 6. YOUR VERSION

**Same Strategy, Your Niche:**
[Write a similar post adapted to user's context]

**Why This Version Works:**
- [Reasoning]

## 7. VARIATIONS TO TEST

**Variation A (Shorter):**
[Write shorter version]

**Variation B (More Personal):**
[Write more personal version]

**Variation C (More Actionable):**
[Write more actionable version]

Provide ACTIONABLE insights, not just observations.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error('Failed to reverse engineer post: ' + error.message);
    }
  }
}

module.exports = new CompetitorAnalysisService();
