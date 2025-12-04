const { GoogleGenerativeAI } = require('@google/generative-ai');
const geminiService = require('./geminiService');
const trendService = require('./trendService');
const imageService = require('./imageService');
const viralAnalysisService = require('./viralAnalysisService');
const profileOptimizerService = require('./profileOptimizerService');
const hashtagResearchService = require('./hashtagResearchService');
const hookLibraryService = require('./hookLibraryService');
const competitorAnalysisService = require('./competitorAnalysisService');

class SuperAIManager {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    // Track user preferences and learning
    this.userPreferences = new Map();
    this.performanceHistory = [];
  }

  /**
   * MAIN ORCHESTRATOR - Intelligently decides which features to use
   */
  async orchestrate(request) {
    const { 
      action, 
      userProfile, 
      contentData, 
      competitors, 
      preferences 
    } = request;

    console.log('🧠 SUPER AI MANAGER: Analyzing request...');

    // Determine intent and create intelligent workflow
    const workflow = await this.determineWorkflow(action, contentData, userProfile);
    
    console.log(`📋 Workflow determined: ${workflow.name}`);
    console.log(`🔧 Steps: ${workflow.steps.length}`);

    // Execute workflow
    const results = await this.executeWorkflow(workflow, {
      userProfile,
      contentData,
      competitors,
      preferences
    });

    // Learn from execution
    await this.learnFromExecution(workflow, results);

    return {
      workflow: workflow.name,
      results,
      recommendations: await this.generateRecommendations(results),
      nextSteps: await this.suggestNextSteps(results, userProfile)
    };
  }

  /**
   * Determine the optimal workflow based on user intent
   */
  async determineWorkflow(action, contentData, userProfile) {
    const workflows = {
      'full-content-creation': {
        name: 'Full Content Creation with Viral Optimization',
        steps: [
          'profile-check',
          'viral-analysis',
          'hook-generation',
          'content-generation',
          'hashtag-research',
          'image-suggestions',
          'optimization'
        ],
        priority: 'high'
      },
      'quick-post': {
        name: 'Quick Post Generation',
        steps: [
          'hook-generation',
          'content-generation',
          'hashtag-research'
        ],
        priority: 'medium'
      },
      'profile-optimization': {
        name: 'Profile Optimization',
        steps: [
          'profile-analysis',
          'competitor-analysis',
          'recommendations'
        ],
        priority: 'high'
      },
      'competitive-research': {
        name: 'Competitive Intelligence',
        steps: [
          'competitor-analysis',
          'content-gaps',
          'strategy-development'
        ],
        priority: 'medium'
      },
      'viral-research': {
        name: 'Deep Viral Content Research',
        steps: [
          'viral-analysis',
          'trending-topics',
          'hook-library',
          'content-generation'
        ],
        priority: 'high'
      },
      'hashtag-strategy': {
        name: 'Hashtag Strategy Development',
        steps: [
          'hashtag-research',
          'trending-analysis',
          'banned-detection',
          'strategy-creation'
        ],
        priority: 'low'
      }
    };

    // Use AI to determine best workflow
    const workflowDecision = await this.analyzeIntent(action, contentData, userProfile);
    
    return workflows[workflowDecision] || workflows['full-content-creation'];
  }

  /**
   * Analyze user intent with AI
   */
  async analyzeIntent(action, contentData, userProfile) {
    const prompt = `Analyze this LinkedIn automation request and determine the best workflow:

**Action Requested:** ${action || 'generate content'}
**Content Data:** ${JSON.stringify(contentData || {}, null, 2)}
**User Profile Completeness:** ${userProfile ? 'Available' : 'Not provided'}

**Available Workflows:**
1. full-content-creation - Complete viral post with all features (use when user wants maximum viral potential)
2. quick-post - Fast post generation (use when user wants speed over depth)
3. profile-optimization - Optimize LinkedIn profile (use when action mentions profile, headline, about, optimization)
4. competitive-research - Analyze competitors (use when action mentions competitors, competition, analysis)
5. viral-research - Deep viral analysis (use when action mentions trending, viral, research)
6. hashtag-strategy - Hashtag research only (use when action focuses on hashtags)

**Decision Criteria:**
- If user mentions "profile", "headline", "about" → profile-optimization
- If user mentions "competitor", "competition", "analyze others" → competitive-research
- If user mentions "viral", "trending", "research" → viral-research
- If user mentions "hashtags" only → hashtag-strategy
- If user wants "quick" or "fast" → quick-post
- If user wants comprehensive content → full-content-creation
- Default → full-content-creation

Return ONLY the workflow key (e.g., "full-content-creation"), nothing else.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const decision = response.text().trim().toLowerCase().replace(/[^a-z-]/g, '');
      
      // Validate decision
      const validWorkflows = [
        'full-content-creation',
        'quick-post',
        'profile-optimization',
        'competitive-research',
        'viral-research',
        'hashtag-strategy'
      ];
      
      return validWorkflows.includes(decision) ? decision : 'full-content-creation';
    } catch (error) {
      console.error('Intent analysis error:', error);
      return 'full-content-creation'; // Safe default
    }
  }

  /**
   * Execute the determined workflow
   */
  async executeWorkflow(workflow, data) {
    const results = {
      timestamp: new Date().toISOString(),
      workflow: workflow.name,
      steps: []
    };

    console.log(`\n🚀 Executing workflow: ${workflow.name}\n`);

    for (const step of workflow.steps) {
      console.log(`⚙️  Step: ${step}`);
      
      try {
        const stepResult = await this.executeStep(step, data, results);
        results.steps.push({
          step,
          status: 'success',
          data: stepResult
        });
        console.log(`✅ ${step} completed\n`);
      } catch (error) {
        console.error(`❌ ${step} failed:`, error.message);
        results.steps.push({
          step,
          status: 'error',
          error: error.message
        });
      }
    }

    return results;
  }

  /**
   * Execute individual workflow step
   */
  async executeStep(step, data, previousResults) {
    const { userProfile, contentData, competitors, preferences } = data;

    switch (step) {
      case 'profile-check':
        if (!userProfile || !userProfile.headline) {
          return {
            warning: 'Profile incomplete - optimization recommended',
            recommendation: 'Run profile-optimization workflow first'
          };
        }
        return { status: 'Profile looks good' };

      case 'viral-analysis':
        return await viralAnalysisService.deepViralAnalysis(
          contentData.topic || 'general',
          contentData.niche || 'business'
        );

      case 'hook-generation':
        return await hookLibraryService.generateCustomHook(
          contentData.topic || 'business growth',
          contentData.emotion || 'curiosity',
          contentData.niche || 'general',
          contentData.style || 'professional'
        );

      case 'content-generation':
        // Use viral-optimized generation
        const viralData = previousResults.steps.find(s => s.step === 'viral-analysis')?.data;
        return await viralAnalysisService.generateViralPost(
          contentData.topic || 'business growth',
          contentData.niche || 'business',
          viralData || {}
        );

      case 'hashtag-research':
        return await hashtagResearchService.researchHashtags(
          contentData.topic || 'business',
          contentData.niche || 'general',
          'post'
        );

      case 'image-suggestions':
        return await imageService.suggestImages(contentData.topic || 'business');

      case 'optimization':
        const content = previousResults.steps.find(s => s.step === 'content-generation')?.data;
        if (content) {
          return await geminiService.optimizePost(content);
        }
        return { status: 'No content to optimize' };

      case 'profile-analysis':
        return await profileOptimizerService.analyzeProfile(userProfile || {});

      case 'competitor-analysis':
        if (competitors && competitors.length > 0) {
          const analyses = [];
          for (const competitor of competitors.slice(0, 3)) {
            const analysis = await competitorAnalysisService.analyzeCompetitor(competitor);
            analyses.push(analysis);
          }
          return analyses;
        }
        return await competitorAnalysisService.findContentGaps(
          contentData.niche || 'business'
        );

      case 'content-gaps':
        return await competitorAnalysisService.findContentGaps(
          contentData.niche || 'business',
          competitors?.map(c => c.name) || []
        );

      case 'strategy-development':
        const gapsData = previousResults.steps.find(s => s.step === 'content-gaps')?.data;
        const competitorData = previousResults.steps.find(s => s.step === 'competitor-analysis')?.data;
        return await this.developStrategy(gapsData, competitorData, userProfile);

      case 'trending-topics':
        return await trendService.analyzeTrends(contentData.niche || 'business');

      case 'hook-library':
        return await hookLibraryService.getHooksByCategory(
          contentData.emotion || 'curiosity',
          contentData.niche || 'general',
          20
        );

      case 'trending-analysis':
        return await hashtagResearchService.findTrendingHashtags(
          contentData.niche || 'business',
          20
        );

      case 'banned-detection':
        const hashtags = contentData.hashtags || [];
        if (hashtags.length > 0) {
          return await hashtagResearchService.detectBannedHashtags(hashtags);
        }
        return { status: 'No hashtags to check' };

      case 'strategy-creation':
        const hashtagData = previousResults.steps.find(s => s.step === 'hashtag-research')?.data;
        return await this.createHashtagStrategy(hashtagData);

      case 'recommendations':
        return await this.generateRecommendations(previousResults);

      default:
        return { status: 'Step not implemented', step };
    }
  }

  /**
   * Develop comprehensive strategy based on competitive intelligence
   */
  async developStrategy(contentGaps, competitorAnalysis, userProfile) {
    const prompt = `Based on this competitive intelligence, create a 90-day LinkedIn domination strategy:

**Content Gaps:**
${contentGaps || 'Not provided'}

**Competitor Analysis:**
${typeof competitorAnalysis === 'string' ? competitorAnalysis : JSON.stringify(competitorAnalysis, null, 2)}

**User Profile:**
${JSON.stringify(userProfile || {}, null, 2)}

# 90-DAY DOMINATION STRATEGY

## PHASE 1: FOUNDATION (Days 1-30)

**Week 1-2: Profile Optimization**
- Actions: [specific tasks]
- Goals: [metrics]
- Success criteria: [benchmarks]

**Week 3-4: Content Testing**
- Actions: [specific tasks]
- Goals: [metrics]
- Success criteria: [benchmarks]

## PHASE 2: GROWTH (Days 31-60)

**Week 5-6: Authority Building**
- Actions: [specific tasks]
- Goals: [metrics]
- Success criteria: [benchmarks]

**Week 7-8: Engagement Acceleration**
- Actions: [specific tasks]
- Goals: [metrics]
- Success criteria: [benchmarks]

## PHASE 3: DOMINATION (Days 61-90)

**Week 9-10: Viral Content Push**
- Actions: [specific tasks]
- Goals: [metrics]
- Success criteria: [benchmarks]

**Week 11-12: Network Expansion**
- Actions: [specific tasks]
- Goals: [metrics]
- Success criteria: [benchmarks]

## CONTENT CALENDAR

Provide weekly content themes and posting schedule.

## KEY METRICS TO TRACK

List specific KPIs and targets.

Make it ACTIONABLE and SPECIFIC.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error('Failed to develop strategy: ' + error.message);
    }
  }

  /**
   * Create hashtag strategy
   */
  async createHashtagStrategy(hashtagData) {
    const prompt = `Based on this hashtag research:

${hashtagData}

Create a comprehensive hashtag strategy:

## HASHTAG STRATEGY

**Primary Mix (Use 80% of the time):**
- [List 20-25 hashtags]
- Why this mix: [explanation]

**Secondary Mix (Use 20% of the time):**
- [List 20-25 hashtags]
- Why this mix: [explanation]

**Testing Mix (Try weekly):**
- [List 10-15 new hashtags to test]
- Testing methodology: [how to measure]

**Hashtag Rotation Schedule:**
- [Weekly rotation plan]

**Performance Tracking:**
- [What to measure]
- [How to optimize]

Make it ACTIONABLE.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error('Failed to create hashtag strategy: ' + error.message);
    }
  }

  /**
   * Generate recommendations based on results
   */
  async generateRecommendations(results) {
    const prompt = `Analyze these workflow results and provide actionable recommendations:

${JSON.stringify(results, null, 2)}

# RECOMMENDATIONS

## IMMEDIATE ACTIONS (Do Today)
1. [Action] - Impact: High/Medium/Low, Effort: Low/Medium/High
2. [Action] - Impact: High/Medium/Low, Effort: Low/Medium/High
3. [Action] - Impact: High/Medium/Low, Effort: Low/Medium/High

## SHORT-TERM IMPROVEMENTS (This Week)
1. [Action] - Impact: High/Medium/Low, Effort: Low/Medium/High
2. [Action] - Impact: High/Medium/Low, Effort: Low/Medium/High
3. [Action] - Impact: High/Medium/Low, Effort: Low/Medium/High

## LONG-TERM STRATEGY (This Month)
1. [Action] - Impact: High/Medium/Low, Effort: Low/Medium/High
2. [Action] - Impact: High/Medium/Low, Effort: Low/Medium/High
3. [Action] - Impact: High/Medium/Low, Effort: Low/Medium/High

## WARNINGS & PITFALLS
- [What to avoid]
- [Common mistakes]

## OPTIMIZATION OPPORTUNITIES
- [Where to improve]
- [What to test]

Be SPECIFIC and ACTIONABLE.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      return 'Recommendations generation failed. Review results manually.';
    }
  }

  /**
   * Suggest next steps
   */
  async suggestNextSteps(results, userProfile) {
    const completedSteps = results.steps?.filter(s => s.status === 'success').map(s => s.step) || [];
    
    const allPossibleSteps = [
      'profile-optimization',
      'competitor-research',
      'viral-content-creation',
      'hashtag-optimization',
      'engagement-strategy',
      'network-growth'
    ];

    const nextSteps = allPossibleSteps.filter(step => 
      !completedSteps.some(completed => completed.includes(step.split('-')[0]))
    );

    return {
      completed: completedSteps,
      suggested: nextSteps.slice(0, 3),
      reasoning: `Based on current progress, focus on: ${nextSteps.slice(0, 3).join(', ')}`
    };
  }

  /**
   * Learn from execution (for future improvement)
   */
  async learnFromExecution(workflow, results) {
    const successRate = results.steps.filter(s => s.status === 'success').length / results.steps.length;
    
    this.performanceHistory.push({
      workflow: workflow.name,
      timestamp: new Date().toISOString(),
      successRate,
      duration: results.duration || 0
    });

    // Keep only last 100 executions
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }

    console.log(`📊 Workflow success rate: ${(successRate * 100).toFixed(1)}%`);
  }

  /**
   * Get performance insights
   */
  getPerformanceInsights() {
    if (this.performanceHistory.length === 0) {
      return { message: 'No execution history yet' };
    }

    const avgSuccessRate = this.performanceHistory.reduce((sum, h) => sum + h.successRate, 0) / this.performanceHistory.length;
    
    const workflowStats = {};
    this.performanceHistory.forEach(h => {
      if (!workflowStats[h.workflow]) {
        workflowStats[h.workflow] = { count: 0, totalSuccess: 0 };
      }
      workflowStats[h.workflow].count++;
      workflowStats[h.workflow].totalSuccess += h.successRate;
    });

    return {
      totalExecutions: this.performanceHistory.length,
      averageSuccessRate: (avgSuccessRate * 100).toFixed(1) + '%',
      workflowStats: Object.keys(workflowStats).map(workflow => ({
        workflow,
        executions: workflowStats[workflow].count,
        avgSuccess: ((workflowStats[workflow].totalSuccess / workflowStats[workflow].count) * 100).toFixed(1) + '%'
      }))
    };
  }
}

module.exports = new SuperAIManager();
