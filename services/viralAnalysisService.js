const { GoogleGenerativeAI } = require('@google/generative-ai');

class ViralAnalysisService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async deepViralAnalysis(topic, niche) {
    const prompt = `You are an ELITE LinkedIn Viral Content Researcher with access to extensive data analysis.

TOPIC: ${topic}
NICHE: ${niche || 'General'}

Conduct a COMPREHENSIVE viral analysis following these steps:

# STEP 1: GLOBAL TRENDING ANALYSIS
Analyze the TOP 10 most viral LinkedIn posts globally in the last 30 days:
- Identify common patterns in hooks
- Engagement triggers used
- Content structure analysis
- Timing patterns
- Hashtag strategies

# STEP 2: NICHE-SPECIFIC VIRAL PATTERNS
Analyze TOP 5 viral posts specifically in the "${niche || topic}" niche:
- What made each post viral?
- Unique angles that worked
- Audience pain points addressed
- Emotional triggers used
- Call-to-action strategies

# STEP 3: LINKEDIN ALGORITHM DEEP DIVE (2025)
Provide rigorous analysis of current LinkedIn algorithm:

**Dwell Time Optimization:**
- How to maximize time spent reading (target: 30+ seconds)
- Hook formulas that increase dwell time
- Content length sweet spots

**Engagement Velocity:**
- Critical first-hour engagement targets
- How to trigger early interactions
- Comment-baiting techniques (ethical)

**Content Format Preferences:**
- Carousel vs Single Post performance
- Video vs Text vs Image engagement rates
- Document post strategies

**Virality Coefficient:**
- Share triggers (what makes people share)
- Tag-worthy content elements
- Cross-platform amplification

**Algorithm Scoring Factors (2025):**
1. Author Authority Score (20%)
2. Early Engagement Rate (25%)
3. Dwell Time (20%)
4. Comment Quality (15%)
5. Share Rate (10%)
6. Profile Views Generated (10%)

# STEP 4: VIRAL POST BLUEPRINT
Create a GUARANTEED VIRAL formula for "${topic}":

**The 99% Viral Formula:**
1. Hook Structure: [Exact formula]
2. Opening Line: [Pattern that works]
3. Body Architecture: [Line-by-line structure]
4. Emotional Arc: [How to build it]
5. CTA Engineering: [Engagement maximizers]
6. Hashtag Formula: [Exact strategy]
7. Posting Timing: [Optimal windows]

# STEP 5: PSYCHOLOGICAL TRIGGERS
Identify and explain triggers to use:
- Curiosity Gap
- Social Proof
- FOMO (Fear of Missing Out)
- Contrarian Views
- Pattern Interrupts
- Authority Positioning
- Vulnerability/Authenticity

# STEP 6: PREDICTED ENGAGEMENT METRICS
Based on rigorous analysis, predict:
- Expected reach: [number range]
- Engagement rate: [percentage]
- Comments: [expected count]
- Shares: [expected count]
- Profile views: [expected increase]
- Viral probability: [0-100%]

Provide ACTIONABLE, DATA-DRIVEN insights. Be specific with examples, numbers, and exact formulas.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Viral Analysis Error:', error);
      throw new Error('Failed to perform viral analysis: ' + error.message);
    }
  }

  async generateViralPost(topic, viralAnalysis, userInput) {
    const { style, goal, link, assets } = userInput;
    
    const prompt = `You are an ELITE LinkedIn Viral Content Creator. Using the deep analysis provided, create a POST with 99% VIRAL PROBABILITY.

TOPIC: ${topic}
STYLE: ${style}
GOAL: ${goal}
${link ? `LINK TO INCLUDE: ${link}` : ''}
${assets ? `ADDITIONAL CONTEXT: ${assets}` : ''}

VIRAL ANALYSIS INSIGHTS:
${viralAnalysis}

Now create THE MOST VIRAL POST POSSIBLE following these rules:

# MANDATORY REQUIREMENTS:

1. **HOOK (Line 1):**
   - Maximum 5-7 words
   - Create immediate curiosity/shock/value
   - Use power words: "Mistake", "Secret", "Truth", "Reality"
   - Pattern interrupt formula

2. **OPENING (Lines 2-3):**
   - Amplify the hook
   - Add social proof or surprising stat
   - Build credibility fast

3. **BODY (Lines 4-10):**
   - Line breaks every 1-2 lines
   - Use "→" for lists (algorithm loves this)
   - Include micro-value in each line
   - Build emotional momentum
   - Use personal story/case study if possible

4. **TRANSITION (Line 11):**
   - Bridge to conclusion
   - "Here's the thing..." or "The reality?"
   - Create anticipation

5. **VALUE BOMB (Lines 12-14):**
   - Core insight/solution
   - Quotable statement
   - Shareable wisdom

6. **CTA (Line 15-16):**
   - Engagement trigger question
   - Multiple engagement options
   - Example: "Thoughts? 👇 | Agree? Hit ♻️ | Save for later 🔖"

7. **HASHTAGS (End):**
   - 5-7 hashtags
   - Mix: 2 broad + 3 niche + 2 trending
   - Research-backed high-engagement tags

# PSYCHOLOGICAL TRIGGERS TO INCLUDE:
- Curiosity gap (don't reveal everything)
- Social proof (numbers, results)
- Contrarian take (challenge common beliefs)
- Personal vulnerability (if authentic)
- FOMO element
- Pattern interrupt

# ALGORITHM OPTIMIZATION:
- Dwell time: 30+ seconds to read
- Comment-worthy: Include debatable point
- Share-worthy: Include quotable insight
- Save-worthy: Tactical value
- Mobile-optimized: Short lines

${link ? `\n# LINK INTEGRATION:\nNaturally mention: ${link}\nDon't make it salesy, weave into story` : ''}

OUTPUT FORMAT:
Provide 3 VIRAL POST VARIATIONS (all optimized for 99% viral probability):

**POST A - CURIOSITY BOMB:**
[Hook creates massive curiosity]

**POST B - CONTRARIAN TRUTH:**
[Challenges popular belief]

**POST C - VALUE EXPLOSION:**
[Tactical, actionable, immediate value]

For EACH post, include:
- Predicted engagement rate
- Viral probability score
- Key trigger used
- Why it will work

Make each post READY TO COPY-PASTE. No placeholders, no generic content.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Viral Post Generation Error:', error);
      throw new Error('Failed to generate viral post: ' + error.message);
    }
  }

  async analyzeAlgorithmFactors() {
    const prompt = `As a LinkedIn Algorithm Expert, provide a RIGOROUS, DATA-DRIVEN analysis of LinkedIn's 2025 algorithm.

# COMPREHENSIVE ALGORITHM BREAKDOWN:

## 1. RANKING FACTORS (Weighted by importance)
Provide exact percentages and explain each:
- Author Authority Score
- Early Engagement Velocity
- Dwell Time Metrics
- Comment Quality Score
- Share Rate
- Click-Through Rate
- Profile View Generation
- Network Relevance
- Content Freshness
- Engagement Consistency

## 2. ENGAGEMENT VELOCITY ANALYSIS
- First 15 minutes: Critical threshold
- First hour: Viral potential indicator
- First 6 hours: Reach multiplication factor
- Engagement decay patterns

## 3. CONTENT FORMAT PERFORMANCE (2025 Data)
Rank by engagement rate:
- Text-only posts
- Single image posts
- Multiple image posts
- Carousel posts
- Video posts
- Document/PDF posts
- Poll posts
- Article posts

## 4. OPTIMAL POSTING WINDOWS
By timezone and day:
- Peak engagement hours
- Lowest competition times
- Industry-specific patterns
- Geographic considerations

## 5. HASHTAG SCIENCE
- Optimal count (with data)
- Follower count sweet spots
- Placement strategy
- Banned/spam hashtags to avoid
- Trending vs evergreen balance

## 6. VIRALITY TRIGGERS
What causes exponential reach:
- Share threshold (when LinkedIn boosts)
- Comment depth importance
- Engagement diversity (likes vs comments vs shares)
- Secondary network activation

## 7. PENALTY FACTORS
What kills reach:
- External link penalties
- Spam signals
- Low-quality engagement
- Timing mistakes
- Over-posting frequency

## 8. HOOK FORMULAS THAT WORK
Provide 20 proven hook templates with examples.

## 9. CTA EFFECTIVENESS RANKING
Best performing CTAs with engagement data.

## 10. MOBILE OPTIMIZATION RULES
Critical for 70%+ mobile users.

Provide SPECIFIC, ACTIONABLE data. Include numbers, percentages, examples.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Algorithm Analysis Error:', error);
      throw new Error('Failed to analyze algorithm: ' + error.message);
    }
  }
}

module.exports = new ViralAnalysisService();
