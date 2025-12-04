const { GoogleGenerativeAI } = require('@google/generative-ai');

class VideoContentService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  // 1. Analyze current video trends on LinkedIn
  async analyzeVideoTrends(topic, niche) {
    const prompt = `You are a LinkedIn video trend analyst. Analyze the CURRENT trending video formats and styles on LinkedIn for 2025.

Topic: ${topic}
Niche: ${niche}

Research and provide:

## 1. TRENDING VIDEO FORMATS (Top 5)
For each format, provide:
- Format name
- Why it's trending now
- Best use cases
- Engagement rate (estimated)
- Optimal duration

## 2. VIRAL VIDEO PATTERNS
Identify what makes LinkedIn videos go viral:
- Opening techniques (first 3 seconds)
- Content structure patterns
- Pacing and editing style
- Text overlay strategies
- Sound/music usage

## 3. OPTIMAL VIDEO SPECIFICATIONS
- Duration: [ideal length]
- Aspect ratio: [square, vertical, horizontal]
- Resolution: [quality recommendations]
- Thumbnail style: [what works now]
- Posting format: [native upload vs link]

## 4. NICHE-SPECIFIC TRENDS
For "${niche}" specifically:
- What video styles perform best
- Unique patterns in this niche
- Competitor video strategies
- Audience preferences

## 5. ALGORITHM INSIGHTS (2025)
LinkedIn video algorithm factors:
- Watch time weight
- Completion rate importance
- Comment engagement
- Share velocity
- Profile visit rate

## 6. CONTENT THEMES TRENDING NOW
List 10 video content themes trending in "${niche}":
1. [Theme] - Why it works
2. [Theme] - Why it works
[continue...]

## 7. TIMING & FREQUENCY
- Best posting times for video
- Optimal posting frequency
- Video series vs one-offs

Provide ACTIONABLE, CURRENT, and SPECIFIC insights based on 2025 LinkedIn video trends.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Video Trends Analysis Error:', error);
      throw new Error('Failed to analyze video trends: ' + error.message);
    }
  }

  // 2. Generate optimized video caption
  async generateVideoCaption(topic, title, description, niche) {
    const prompt = `Create a HIGH-PERFORMING LinkedIn video caption optimized for 2025 algorithm.

Video Details:
- Topic: ${topic}
- Title: ${title || 'Not provided'}
- Description: ${description || 'Not provided'}
- Niche: ${niche}

Requirements for LinkedIn video captions:
- Different from text posts (shorter, punchier)
- Focus on the FIRST LINE (visible before "...see more")
- Include strong CTA
- Optimal length: 100-250 characters
- Strategic hashtag placement
- Encourage comments

Generate 3 caption variations:

## CAPTION 1: CURIOSITY-DRIVEN
[First line must create intrigue]
[Optional second line for context]
[CTA line]
[Hashtags: 3-5 relevant ones]

Why it works: [explanation]

## CAPTION 2: VALUE-FOCUSED
[First line emphasizes the value/benefit]
[Context if needed]
[CTA]
[Hashtags: 3-5 relevant ones]

Why it works: [explanation]

## CAPTION 3: ENGAGEMENT-OPTIMIZED
[First line asks a question or makes bold statement]
[Context]
[Strong CTA for comments]
[Hashtags: 3-5 relevant ones]

Why it works: [explanation]

## BONUS: PIN COMMENT SUGGESTION
Write a pin comment to post immediately after video goes live:
[Comment text that drives engagement]

Make captions ACTIONABLE and OPTIMIZED for LinkedIn's 2025 video algorithm.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Video Caption Generation Error:', error);
      throw new Error('Failed to generate video caption: ' + error.message);
    }
  }

  // 3. Research trending audio and music for LinkedIn videos
  async getTrendingAudio(niche) {
    const prompt = `You are a LinkedIn video audio trend researcher. Identify trending audio strategies for LinkedIn videos in 2025.

Niche: ${niche}

Provide comprehensive audio recommendations:

## 1. TRENDING MUSIC STYLES
For "${niche}" niche:
- Music genre trending now
- Tempo preferences (BPM range)
- Instrumental vs vocal
- Mood/vibe that converts
- Specific examples (if known)

## 2. VOICEOVER STRATEGIES
- Voiceover style (professional vs casual)
- Pacing recommendations
- Tone that resonates with "${niche}" audience
- When to use voiceover vs text-only
- Accent considerations (neutral vs regional)

## 3. SOUND EFFECTS USAGE
- Trending sound effects types
- When to use SFX (transitions, emphasis, etc.)
- Volume levels and mixing
- Avoid overuse patterns

## 4. AUDIO TRENDS BY VIDEO FORMAT

### For Talking Head Videos:
- Background music: [yes/no, volume level]
- Ambient sound: [recommendations]
- Audio quality importance

### For B-Roll/Montage Videos:
- Music choice: [style]
- Beat sync recommendations
- Voiceover layering

### For Tutorial/Educational Videos:
- Music or no music
- Voiceover pacing
- Sound cues for emphasis

## 5. AUDIO SOURCES & LICENSING
Free/licensed audio platforms:
- [Platform 1] - Best for [type]
- [Platform 2] - Best for [type]
- [Platform 3] - Best for [type]

## 6. AUDIO MISTAKES TO AVOID
List 5 audio mistakes that kill LinkedIn video performance:
1. [Mistake] - Why it hurts engagement
2. [Mistake] - Why it hurts engagement
[continue...]

## 7. NICHE-SPECIFIC AUDIO RECOMMENDATIONS
For "${niche}" specifically:
- What audio style performs best
- Unique audio patterns in this niche
- Competitor audio strategies
- Audience audio preferences

## 8. AUDIO OPTIMIZATION CHECKLIST
✓ [Checklist item]
✓ [Checklist item]
✓ [Checklist item]
[continue...]

Provide SPECIFIC, ACTIONABLE audio recommendations for creating high-performing LinkedIn videos in 2025.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Trending Audio Analysis Error:', error);
      throw new Error('Failed to analyze trending audio: ' + error.message);
    }
  }

  // 4. Analyze trending visual styles and formats
  async analyzeVisualTrends(niche) {
    const prompt = `You are a LinkedIn video visual trend analyst. Identify the HOTTEST visual trends for LinkedIn videos in 2025.

Niche: ${niche}

Provide comprehensive visual trend analysis:

## 1. TRENDING VISUAL STYLES (Top 10)
For each style, provide:
1. [Style name] - Description
   - Why it's viral now
   - Best for: [content type]
   - Engagement boost: [percentage]
   - Examples/references

[Continue for all 10...]

## 2. COLOR SCHEMES THAT CONVERT
Top performing color palettes for "${niche}":
- Color Palette 1: [colors] - Psychology behind it
- Color Palette 2: [colors] - When to use
- Color Palette 3: [colors] - Audience appeal

## 3. TEXT OVERLAY STRATEGIES
- Font styles trending now
- Text animation patterns
- Optimal text size/placement
- Subtitle styling (font, color, position)
- Keyword highlighting techniques

## 4. TRANSITION & EDITING TRENDS
- Transition styles (cuts, fades, wipes)
- Editing pace (fast cuts vs slow)
- Jump cut usage
- B-roll integration timing
- Pattern interrupts (visual changes)

## 5. THUMBNAIL DESIGN TRENDS
What makes thumbnails clickable in 2025:
- Face vs no face
- Text overlay on thumbnail
- Color psychology
- Emotion vs action shots
- Contrast and clarity

## 6. B-ROLL & STOCK FOOTAGE STRATEGIES
- When to use B-roll
- Stock footage vs original
- B-roll timing and frequency
- Visual metaphor trends
- Footage sources/platforms

## 7. ANIMATION & GRAPHICS TRENDS
- Motion graphics usage
- Animated text vs static
- Icon/emoji integration
- Graph and data visualization
- Lower thirds and name tags

## 8. COMPOSITION & FRAMING
- Rule of thirds application
- Headroom and framing
- Background choices (plain vs dynamic)
- Camera angle trends
- Depth and dimension

## 9. LIGHTING TRENDS
- Natural vs studio lighting
- Mood lighting styles
- Ring light usage
- Backlight trends
- Low light vs bright

## 10. NICHE-SPECIFIC VISUAL PATTERNS
For "${niche}" specifically:
- Unique visual styles that work
- Competitor visual analysis
- Audience visual preferences
- Industry-specific trends

## 11. VISUAL MISTAKES TO AVOID
Top 7 visual mistakes killing video performance:
1. [Mistake] - Why it fails
2. [Mistake] - Why it fails
[Continue...]

## 12. VISUAL OPTIMIZATION CHECKLIST
✓ [Optimization point]
✓ [Optimization point]
[Continue for 10 points...]

## 13. TRENDING TOOLS & SOFTWARE
Recommend tools for creating these visuals:
- Editing: [tools]
- Graphics: [tools]
- Animation: [tools]
- Color grading: [tools]

Provide SPECIFIC, ACTIONABLE visual recommendations based on CURRENT 2025 LinkedIn video trends.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Visual Trends Analysis Error:', error);
      throw new Error('Failed to analyze visual trends: ' + error.message);
    }
  }

  // 5. Generate video-specific hooks (first 3 seconds)
  async generateVideoHooks(topic, niche) {
    const prompt = `You are a LinkedIn video hook specialist. Create SCROLL-STOPPING hooks for the first 3 seconds of a video.

Topic: ${topic}
Niche: ${niche}

The first 3 seconds determine 80% of video success. Create hooks that make people STOP scrolling.

Generate 20 POWERFUL video hooks across different categories:

## CATEGORY 1: PATTERN INTERRUPT (Visual + Audio)
1. [Visual action] + [Audio/voiceover]
   Why it works: [psychology]
   Example execution: [specific description]

2. [Visual action] + [Audio/voiceover]
   Why it works: [psychology]
   Example execution: [specific description]

[Continue for 4 hooks in this category...]

## CATEGORY 2: BOLD STATEMENTS
5. Text on screen: "[Bold statement]"
   Voiceover: "[First words]"
   Why it works: [explanation]

[Continue for 3 hooks...]

## CATEGORY 3: CURIOSITY GAPS
8. [Hook creating curiosity]
   Visual: [description]
   Audio: [description]
   Why it works: [explanation]

[Continue for 3 hooks...]

## CATEGORY 4: IMMEDIATE VALUE
11. [Hook promising value]
    Visual: [description]
    Audio: [description]
    Why it works: [explanation]

[Continue for 3 hooks...]

## CATEGORY 5: SHOCK & SURPRISE
14. [Hook using shock value]
    Visual: [description]
    Audio: [description]
    Why it works: [explanation]

[Continue for 3 hooks...]

## CATEGORY 6: QUESTION HOOKS
17. [Question-based hook]
    Visual: [description]
    Audio: [description]
    Why it works: [explanation]

[Continue for 4 hooks...]

## HOOK COMBINATION STRATEGIES
How to layer multiple hook elements:
- Visual + Audio sync
- Text + Voiceover timing
- Movement + Sound effects
- Facial expression + Statement

## EXECUTION TIPS
For each hook type, provide:
- Timing breakdown (0-1s, 1-2s, 2-3s)
- Camera movement recommendations
- Editing techniques
- Audio mixing tips

## NICHE-SPECIFIC HOOKS
Top 5 hooks proven to work in "${niche}":
1. [Hook] - Performance data
2. [Hook] - Performance data
[Continue...]

## MISTAKES TO AVOID
What NOT to do in the first 3 seconds:
- [Mistake 1] - Why it fails
- [Mistake 2] - Why it fails
[Continue for 5...]

Make every hook ACTIONABLE with specific visual and audio instructions.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Video Hook Generation Error:', error);
      throw new Error('Failed to generate video hooks: ' + error.message);
    }
  }

  // 6. Predict video success rate
  async predictVideoSuccessRate(videoData) {
    const { topic, title, niche, description, format, duration, hasHook, hasCaption } = videoData;

    const prompt = `You are a LinkedIn video success prediction AI. Calculate the success probability for this video.

Video Details:
- Topic: ${topic}
- Title: ${title || 'Not provided'}
- Niche: ${niche}
- Description: ${description || 'Not provided'}
- Format: ${format || 'Not specified'}
- Duration: ${duration || 'Not specified'}
- Has Strong Hook: ${hasHook ? 'Yes' : 'No'}
- Has Optimized Caption: ${hasCaption ? 'Yes' : 'No'}

Analyze and provide:

## 1. OVERALL SUCCESS RATE
Calculate overall success probability: X/100

## 2. SCORE BREAKDOWN

### Format Score (25%)
- Current format: ${format || 'Not specified'}
- Is it trending? [Yes/No]
- Alignment with niche: [X/10]
- Format score: [X/25]

### Duration Score (20%)
- Current duration: ${duration || 'Not specified'}
- Optimal for LinkedIn: [Yes/No]
- Attention span match: [X/10]
- Duration score: [X/20]

### Topic Trend Score (20%)
- Topic relevance: [X/10]
- Search volume: [High/Medium/Low]
- Niche alignment: [X/10]
- Topic score: [X/20]

### Hook Quality Score (15%)
- Has hook: ${hasHook ? 'Yes' : 'No'}
- Estimated effectiveness: [X/10]
- Pattern interrupt level: [X/10]
- Hook score: [X/15]

### Caption Quality Score (10%)
- Has caption: ${hasCaption ? 'Yes' : 'No'}
- Estimated CTR: [X/10]
- CTA strength: [X/10]
- Caption score: [X/10]

### Timing Score (10%)
- Trending now: [Yes/No]
- Algorithm favor: [X/10]
- Seasonal relevance: [X/10]
- Timing score: [X/10]

## 3. SUCCESS PROBABILITY CATEGORIES

- **Views**: [Estimated range: X-Y]
- **Engagement Rate**: [X%]
- **Comments**: [Estimated range]
- **Shares**: [Estimated range]
- **Profile Visits**: [Estimated increase: X%]

## 4. COMPARISON TO VIRAL BENCHMARKS

How this video compares to viral videos in "${niche}":
- Format match: [X/10]
- Topic match: [X/10]
- Duration match: [X/10]
- Overall viral alignment: [X/10]

## 5. IMPROVEMENT RECOMMENDATIONS

To increase success rate to 95%+:
1. [Specific change] - Impact: +X%
2. [Specific change] - Impact: +X%
3. [Specific change] - Impact: +X%
4. [Specific change] - Impact: +X%
5. [Specific change] - Impact: +X%

## 6. RISK FACTORS
Potential issues that might hurt performance:
- [Risk 1] - Likelihood: [High/Medium/Low]
- [Risk 2] - Likelihood: [High/Medium/Low]
- [Risk 3] - Likelihood: [High/Medium/Low]

## 7. OPTIMAL POSTING STRATEGY
- Best day: [Day]
- Best time: [Time] (timezone considerations)
- Pre-posting checklist: [5 items]
- Post-posting actions: [5 items]

## 8. ALGORITHM ALIGNMENT SCORE
LinkedIn video algorithm factors (2025):
- Watch time optimization: [X/10]
- Completion rate potential: [X/10]
- Comment-ability: [X/10]
- Share-worthiness: [X/10]
- Profile visit driver: [X/10]

## 9. FINAL VERDICT
Overall Success Rate: **X/100**
Confidence Level: [High/Medium/Low]
Recommendation: [Go ahead / Needs improvement / Reconsider]

Provide SPECIFIC, DATA-DRIVEN predictions based on current LinkedIn video algorithm (2025).`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Success Rate Prediction Error:', error);
      throw new Error('Failed to predict video success rate: ' + error.message);
    }
  }

  // 7. Suggest optimal video format
  async suggestVideoFormat(topic, niche, goal) {
    const prompt = `You are a LinkedIn video format strategist. Recommend the BEST video format for maximum impact.

Video Details:
- Topic: ${topic}
- Niche: ${niche}
- Goal: ${goal || 'Engagement and growth'}

Analyze and recommend the optimal video format:

## 1. RECOMMENDED PRIMARY FORMAT
**Format Name:** [Format]

**Why This Format:**
- Perfect for topic: [explanation]
- Aligns with goal: [explanation]
- Trending in niche: [Yes/No]
- Success rate: [X%]

**Specifications:**
- Duration: [X-Y seconds]
- Aspect ratio: [ratio]
- Style: [description]
- Production level: [simple/medium/complex]

**Execution Guide:**
- Equipment needed: [list]
- Shooting tips: [5 tips]
- Editing requirements: [description]
- Estimated production time: [X hours]

## 2. ALTERNATIVE FORMAT #1
[Same structure as above]

## 3. ALTERNATIVE FORMAT #2
[Same structure as above]

## 4. FORMAT COMPARISON TABLE

| Aspect | Format 1 | Format 2 | Format 3 |
|--------|----------|----------|----------|
| Success Rate | X% | X% | X% |
| Production Time | X hrs | X hrs | X hrs |
| Cost | $ | $$ | $$$ |
| Engagement | High/Med/Low | High/Med/Low | High/Med/Low |
| Trend Status | Hot/Warm/Cold | Hot/Warm/Cold | Hot/Warm/Cold |

## 5. CONTENT STRUCTURE BY FORMAT

### For Recommended Format:
- 0-3 seconds: [What happens]
- 3-10 seconds: [What happens]
- 10-30 seconds: [What happens]
- 30-60 seconds: [What happens]
- 60+ seconds: [What happens if longer]
- CTA placement: [where/when]

## 6. PRODUCTION BREAKDOWN

### Pre-Production:
- Planning steps: [5 steps]
- Script requirements: [details]
- Assets needed: [list]

### Production:
- Filming process: [step-by-step]
- Common mistakes to avoid: [5 mistakes]
- Pro tips: [5 tips]

### Post-Production:
- Editing workflow: [steps]
- Software recommendations: [tools]
- Quality checkpoints: [5 checkpoints]

## 7. NICHE-SPECIFIC FORMAT INSIGHTS
For "${niche}" specifically:
- Format 1 performance: [data/insights]
- Format 2 performance: [data/insights]
- Unique considerations: [list]
- Audience preferences: [insights]

## 8. GOAL-SPECIFIC OPTIMIZATION

### For Goal: "${goal || 'Engagement and growth'}"
- Best format choice: [format]
- Why: [explanation]
- Success metrics to track: [list]
- Optimization tactics: [5 tactics]

## 9. HYBRID FORMAT OPPORTUNITIES
Can you combine formats?
- Hybrid idea 1: [description]
- Hybrid idea 2: [description]
- When to use hybrids: [guidance]

## 10. FORMAT TRENDS FORECAST
- Current hot formats: [list with trend status]
- Emerging formats: [list]
- Declining formats: [list to avoid]

## 11. FINAL RECOMMENDATION
**Go with:** [Format name]
**Reason:** [Compelling explanation]
**Expected outcome:** [Specific predictions]
**Action items:** [5 next steps to take]

Provide ACTIONABLE, SPECIFIC format recommendations optimized for LinkedIn 2025 video algorithm.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Video Format Suggestion Error:', error);
      throw new Error('Failed to suggest video format: ' + error.message);
    }
  }

  // Generate ready-to-post video content package
  async generateReadyToPostVideo(videoRequest) {
    const { topic, title, niche, description, goal } = videoRequest;

    const prompt = `You are a LinkedIn video content creator. Generate a READY-TO-POST video content package.

Topic: ${topic}
Title: ${title || 'Not provided'}
Niche: ${niche}
Description: ${description || 'Not provided'}
Goal: ${goal || 'Maximum engagement'}

Generate a complete, ready-to-use video content package:

## 📝 READY-TO-POST CAPTION
[Write the exact caption to post on LinkedIn, including:
- Compelling first line (visible before "see more")
- 2-3 more lines of context
- Call-to-action
- 5-7 trending hashtags integrated naturally at the end]

Example format:
"This changed everything about how I [benefit]...

[Context line 1]
[Context line 2]

[Call to action]

#hashtag1 #hashtag2 #hashtag3 #hashtag4 #hashtag5"

## 🎬 VIDEO SCRIPT (30-60 seconds)
**HOOK (0-3 seconds):**
[Exact words/action for first 3 seconds]

**MAIN CONTENT (3-45 seconds):**
[Bullet points of what to say/show]
- Point 1
- Point 2
- Point 3

**CTA (45-60 seconds):**
[Closing words and call-to-action]

## 🎵 TRENDING AUDIO RECOMMENDATIONS
**Option 1:** [Music/audio type]
- Platform: [Where to find it]
- Link: [Provide specific platform like Epidemic Sound, Artlist, YouTube Audio Library]
- Why: [Brief reason]

**Option 2:** [Alternative audio]
- Platform: [Where to find it]
- Link: [Platform name]
- Why: [Brief reason]

**Option 3:** [No music - voiceover only]
- Why: [When to use this]

## ⚡ QUICK TIPS (3-5 bullet points max)
- [Tip 1]
- [Tip 2]
- [Tip 3]

## 📊 SUCCESS RATE: X%
Why: [One sentence explanation]

## 🎯 PIN COMMENT (post immediately after video goes live)
[Exact comment to pin that drives engagement]

Keep everything CONCISE, ACTIONABLE, and READY-TO-USE. No long explanations.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Ready-to-Post Video Generation Error:', error);
      throw new Error('Failed to generate ready-to-post video: ' + error.message);
    }
  }

  // Master method to orchestrate all video analysis
  async generateCompleteVideoAnalysis(videoRequest) {
    try {
      console.log('🎥 Generating ready-to-post video content...');
      
      const { topic, title, niche, description, style, goal } = videoRequest;

      // Generate concise, ready-to-post package
      const readyToPostContent = await this.generateReadyToPostVideo({
        topic,
        title,
        niche,
        description,
        goal
      });

      // Get trending hashtags
      const hashtagResearchService = require('./hashtagResearchService');
      const hashtags = await hashtagResearchService.researchHashtags(topic, niche);

      console.log('✅ Ready-to-post video content generated');

      return {
        readyToPostContent,
        hashtags,
        metadata: {
          analyzedAt: new Date().toISOString(),
          topic,
          niche,
          contentType: 'ready-to-post-video'
        }
      };
    } catch (error) {
      console.error('Complete Video Analysis Error:', error);
      throw new Error('Failed to generate complete video analysis: ' + error.message);
    }
  }
}

module.exports = new VideoContentService();
