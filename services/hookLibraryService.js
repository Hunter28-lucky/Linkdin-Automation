const { GoogleGenerativeAI } = require('@google/generative-ai');

class HookLibraryService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    // Proven viral hook templates by category
    this.hookDatabase = {
      curiosity: [
        "I spent ${time} ${action} and here's what nobody tells you...",
        "Everyone talks about ${topic} but nobody mentions ${hidden_truth}...",
        "The ${adjective} truth about ${topic} that ${authority} won't tell you:",
        "After ${number} ${timeframe}, I discovered ${surprising_fact}...",
        "Why ${common_belief} is actually ${opposite_belief}...",
        "${number} things I wish I knew before ${action}...",
        "The ${adjective} secret behind ${success_metric}:",
        "What ${successful_person/company} doesn't want you to know about ${topic}:",
        "I analyzed ${number} ${things} and found this ${shocking_pattern}...",
        "${topic} is broken. Here's why:"
      ],
      shock: [
        "I lost ${big_number} ${metric} in ${timeframe}. Here's what happened:",
        "${provocative_statement}. Let me explain:",
        "This ${simple_thing} costs ${high_cost}. Worth it? ${answer}.",
        "I was wrong about ${topic} for ${timeframe}. Here's the truth:",
        "${number}% of ${group} fail at ${task}. Here's why:",
        "You're doing ${common_action} wrong. Here's the right way:",
        "Stop ${common_advice}. Do this instead:",
        "Unpopular opinion: ${controversial_take}",
        "I quit ${respected_thing} and ${surprising_outcome}:",
        "${unexpected_event} just changed ${industry} forever."
      ],
      value: [
        "${number} ${lessons/tips} from ${experience}:",
        "How to ${achieve_result} in ${timeframe} (${benefit}):",
        "The ${adjective} guide to ${goal}:",
        "A thread on ${topic} that will ${benefit}:",
        "${number} mistakes I made ${action} so you don't have to:",
        "Here's exactly how I ${achievement}:",
        "The only ${number} ${things} you need to ${achieve_goal}:",
        "Free ${resource}: ${description_of_value}",
        "A simple ${framework/system} to ${achieve_result}:",
        "Everything I learned ${doing_something} in ${timeframe}:"
      ],
      storytelling: [
        "${timeframe} ago, I ${starting_point}. Today, I ${ending_point}.",
        "I'll never forget the day ${pivotal_moment}...",
        "They laughed when I ${action}. But when ${outcome}...",
        "My ${relationship} taught me ${lesson} about ${topic}:",
        "I hit rock bottom. Here's how I ${recovered}:",
        "This ${small_moment} changed everything:",
        "From ${starting_point} to ${ending_point}: My story",
        "I failed ${number} times before ${success}. Here's what I learned:",
        "The call that changed my ${life/career/business}:",
        "I made a ${decision}. ${timeframe} later, ${outcome}."
      ],
      fomo: [
        "${number} people just ${action}. Here's why:",
        "This is your sign to ${action}:",
        "Before ${timeframe} ends, do this:",
        "While everyone's ${doing_wrong_thing}, you should ${do_right_thing}:",
        "The ${opportunity} nobody's talking about (yet):",
        "You have ${timeframe} to ${action}. Here's why it matters:",
        "Last chance to ${action} before ${consequence}:",
        "Everyone's ${trending_action}. Should you?",
        "The ${trend} is here. Are you ready?",
        "If you're not ${action} yet, you're behind. Here's how to catch up:"
      ],
      authority: [
        "After ${number} years ${doing_something}, here's what I know:",
        "${number} ${metrics} later, here's the ${lessons}:",
        "I've ${action} for ${number} ${big_companies/clients}. Here's the ${pattern}:",
        "Lessons from ${number} ${high_value_experience}:",
        "What ${timeframe} in ${industry} taught me:",
        "The framework I use to ${consistent_result}:",
        "${respected_person/company} does this. Here's why:",
        "After analyzing ${number} ${things}, the data is clear:",
        "I've spent ${money/time} on ${topic}. Here's what works:",
        "${number}-figure ${business/career} lessons:"
      ],
      question: [
        "What if ${provocative_scenario}?",
        "Why do ${percentage} of ${group} fail at ${task}?",
        "Is ${common_belief} actually ${opposite}?",
        "Should you ${action} or ${alternative_action}?",
        "What's the difference between ${thing_a} and ${thing_b}?",
        "How do you ${achieve_difficult_goal}?",
        "Why isn't anyone talking about ${overlooked_topic}?",
        "What would you do with ${resource}?",
        "Are you making this ${costly_mistake}?",
        "Which ${option} is better: ${a} or ${b}?"
      ],
      contrarian: [
        "Forget everything you know about ${topic}. Here's why:",
        "${popular_advice} is terrible advice. Do this instead:",
        "I stopped ${common_practice} and ${positive_outcome}:",
        "Nobody wants to hear this, but ${hard_truth}:",
        "${respected_thing} is overrated. Here's why:",
        "The ${industry} lies about ${topic}. Here's the truth:",
        "You don't need ${expensive_thing}. You need ${simple_alternative}:",
        "Unpopular opinion: ${controversial_statement}",
        "${common_goal} is a waste of time. Focus on ${better_goal} instead:",
        "Stop ${action}. It's hurting you more than helping."
      ],
      urgency: [
        "The ${opportunity} is closing. Here's what to do:",
        "This changes everything:",
        "You need to see this:",
        "Pay attention:",
        "This just happened:",
        "Breaking: ${news_or_insight}",
        "If you see this, ${action}:",
        "This won't last. Here's why:",
        "Before it's too late, ${action}:",
        "The ${trend} is accelerating. Here's what it means:"
      ]
    };
  }

  async generateCustomHook(topic, emotion, niche, style = 'professional') {
    const prompt = `Generate 10 VIRAL LinkedIn hooks for this content:

**Topic:** ${topic}
**Target Emotion:** ${emotion}
**Niche:** ${niche}
**Style:** ${style}

Each hook must:
- Be 1-2 sentences max
- Grab attention in first 3 words
- Make people want to click "See More"
- Match the ${emotion} emotion (curiosity, shock, value, etc.)
- Sound natural, not clickbait
- Be specific to ${niche}

Format:
**Hook 1:** [text]
**Why it works:** [psychological trigger]
**Emotion score:** X/10

**Hook 2:** [text]
**Why it works:** [psychological trigger]
**Emotion score:** X/10

[Continue for all 10]

Make them SPECIFIC and ACTIONABLE, not generic.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Custom Hook Generation Error:', error);
      throw new Error('Failed to generate custom hook: ' + error.message);
    }
  }

  async getHooksByCategory(category, niche = 'general', limit = 20) {
    const templates = this.hookDatabase[category] || this.hookDatabase.curiosity;
    
    const prompt = `Using these proven hook templates for ${category}:

${templates.slice(0, 10).join('\n')}

Generate ${limit} SPECIFIC, READY-TO-USE hooks for ${niche}.

Replace all placeholders with real, compelling content relevant to ${niche}.

Format each as:
**Hook:** [Full, ready-to-use text]
**Fill-ins used:** [Show what you replaced]
**Best for:** [Type of post]
**Engagement prediction:** X/10

Make them SPECIFIC and IMMEDIATELY USABLE.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error('Failed to get hooks by category: ' + error.message);
    }
  }

  async generateHookVariations(originalHook, count = 5) {
    const prompt = `Take this hook: "${originalHook}"

Generate ${count} VARIATIONS that:
1. Keep the same core message
2. Use different psychological triggers
3. Appeal to different audience segments
4. Test different lengths (short vs long)
5. Vary the emotional intensity

For each variation:
**Variation X:** [text]
**Difference:** [What's changed]
**Target audience:** [Who this appeals to]
**Predicted engagement:** Higher/Same/Lower than original

Make variations DISTINCTLY DIFFERENT, not just word swaps.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error('Failed to generate variations: ' + error.message);
    }
  }

  async analyzeHookEffectiveness(hook) {
    const prompt = `Analyze this LinkedIn hook: "${hook}"

Provide detailed scoring:

## OVERALL SCORE: X/100

### COMPONENT SCORES:
1. **Attention Grab (0-20):** X/20
   - First 3 words effectiveness
   - Visual impact
   - Pattern interrupt

2. **Curiosity Gap (0-20):** X/20
   - Information gap created
   - Desire to know more
   - "See More" click likelihood

3. **Emotional Trigger (0-20):** X/20
   - Emotion type: [curiosity/shock/value/etc]
   - Intensity level
   - Audience resonance

4. **Specificity (0-15):** X/15
   - Concrete vs vague
   - Niche relevance
   - Credibility indicators

5. **Readability (0-10):** X/10
   - Length appropriateness
   - Clarity
   - Flow

6. **Algorithm Compatibility (0-15):** X/15
   - Engagement potential
   - Comment likelihood
   - Share potential

### STRENGTHS:
- [What works well]

### WEAKNESSES:
- [What could improve]

### IMPROVED VERSION:
[Rewrite the hook with improvements]

### A/B TEST SUGGESTION:
[Alternative version to test against]

Be brutally honest and specific.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error('Failed to analyze hook: ' + error.message);
    }
  }

  async getIndustrySpecificHooks(industry, count = 30) {
    const prompt = `Generate ${count} PROVEN viral hooks specifically for ${industry} professionals on LinkedIn.

Categories to cover:
- Career advice (5 hooks)
- Industry insights (5 hooks)
- Personal stories (5 hooks)
- Controversial takes (5 hooks)
- Actionable tips (5 hooks)
- Trend analysis (5 hooks)

For each hook:
**Hook:** [text]
**Category:** [category]
**Best time to post:** [day/time]
**Expected engagement:** Low/Medium/High/Very High
**Target audience:** [who this is for]

Make them SPECIFIC to ${industry}, not generic business advice.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error('Failed to get industry hooks: ' + error.message);
    }
  }

  getHookTemplates() {
    return this.hookDatabase;
  }

  getAllCategories() {
    return Object.keys(this.hookDatabase);
  }
}

module.exports = new HookLibraryService();
