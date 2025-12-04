const { GoogleGenerativeAI } = require('@google/generative-ai');

class ProfileOptimizerService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async analyzeProfile(profileData) {
    const { headline, about, experience, skills, niche } = profileData;
    
    const prompt = `You are an ELITE LinkedIn Profile Optimization Expert with years of experience.

PROFILE ANALYSIS REQUEST:

**Current Headline:** ${headline || 'Not provided'}
**Current About Section:** ${about || 'Not provided'}
**Experience:** ${experience || 'Not provided'}
**Skills:** ${skills || 'Not provided'}
**Niche/Industry:** ${niche || 'General'}

YOUR TASK: COMPREHENSIVE PROFILE OPTIMIZATION

## 1. HEADLINE OPTIMIZATION (120 characters max)

**Current Issues:**
- Identify problems with current headline
- Missing keywords
- Weak positioning

**3 OPTIMIZED HEADLINES:**
Generate 3 powerful variations:
- **Version A (Authority):** Position as expert/leader
- **Version B (Value):** Focus on what you deliver
- **Version C (Story):** Unique angle/journey

Each headline must:
- Include target keywords for LinkedIn search
- Be compelling and memorable
- Appeal to ideal audience
- Follow formula: [WHO YOU ARE] | [WHAT YOU DO] | [WHO YOU HELP]

## 2. ABOUT SECTION REWRITE (2,600 characters max)

**Structure to follow:**
- Hook (First 2 lines - visible without See More)
- Your Story (Brief background, credibility builders)
- What You Do (Clear value proposition)
- How You Help (Specific problems you solve)
- Social Proof (Results, testimonials, metrics)
- Call to Action (How to connect/work with you)

**Optimization Checklist:**
- SEO keywords naturally integrated
- First-person voice (I, my)
- Scannable with line breaks
- Includes searchable skills
- Clear CTA at the end
- Personality shines through

## 3. FEATURED SECTION STRATEGY

Recommend what to showcase:
- Posts to feature
- Articles to highlight
- Media/links to add
- Portfolio pieces

## 4. EXPERIENCE SECTION TIPS

For each role, optimize:
- Use action verbs
- Quantify achievements
- Include keywords
- Tell impact stories

## 5. SKILLS & ENDORSEMENTS

**Top 3 Skills to Feature:**
- Most searchable
- Most credible
- Most valuable

**Skills to Remove:**
- Outdated
- Too generic
- Not relevant

## 6. LINKEDIN SEO STRATEGY

**Primary Keywords:** [List 5-7]
**Secondary Keywords:** [List 5-7]
**Where to Place Them:**
- Headline: [specific placement]
- About: [density recommendation]
- Experience: [strategic locations]

## 7. PROFILE PHOTO & BANNER ADVICE

**Photo Guidelines:**
- Professional but approachable
- High resolution
- Proper background
- Dress code for industry

**Banner Ideas:**
- Personal branding elements
- Value proposition
- Contact info
- Visual credibility

## 8. CONTENT STRATEGY RECOMMENDATIONS

Based on profile, suggest:
- Post frequency (optimal schedule)
- Content themes to focus on
- Audience to target
- Growth strategy

## 9. OVERALL PROFILE SCORE

Rate current profile: **X/100**

**Breakdown:**
- Headline: X/20
- About: X/20
- Experience: X/15
- Skills: X/10
- Engagement: X/15
- SEO: X/20

## 10. PRIORITY ACTION ITEMS

Top 5 things to fix IMMEDIATELY:
1. [Most critical]
2. [High impact]
3. [Quick win]
4. [SEO boost]
5. [Engagement driver]

Make ALL recommendations ACTIONABLE and SPECIFIC. Include exact wording, not just suggestions.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Profile Analysis Error:', error);
      throw new Error('Failed to analyze profile: ' + error.message);
    }
  }

  async optimizeHeadline(currentHeadline, niche, targetAudience) {
    const prompt = `Generate 5 POWERFUL LinkedIn headlines (max 120 characters each).

Current: ${currentHeadline || 'None'}
Niche: ${niche}
Target Audience: ${targetAudience || 'Professionals'}

Each headline must:
- Include keywords for LinkedIn search
- Be memorable and unique
- Show clear value proposition
- Appeal to target audience

Format each as:
**Headline X:** [text]
**Why it works:** [brief explanation]
**Search keywords:** [keywords included]`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error('Failed to optimize headline: ' + error.message);
    }
  }

  async generateAboutSection(userData) {
    const { name, role, niche, achievements, skills, goals } = userData;
    
    const prompt = `Write a COMPELLING LinkedIn About section that converts visitors to connections.

Profile Details:
- Name: ${name || 'Professional'}
- Role: ${role || 'Not specified'}
- Niche: ${niche || 'General'}
- Key Achievements: ${achievements || 'To be added'}
- Skills: ${skills || 'To be added'}
- Goals: ${goals || 'Build network and opportunities'}

Requirements:
- 2,600 characters max
- First 2 lines MUST be compelling (visible without See More)
- Include SEO keywords naturally
- First-person voice
- Story-driven but professional
- Clear call-to-action
- Scannable with line breaks
- Show personality

Structure:
Hook → Story → Value → How You Help → Social Proof → CTA

Provide 2 versions:
- Version A: Professional & Authority-focused
- Version B: Personal & Story-driven`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error('Failed to generate about section: ' + error.message);
    }
  }
}

module.exports = new ProfileOptimizerService();
