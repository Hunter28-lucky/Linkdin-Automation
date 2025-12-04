# LinkedIn Viral Automation Platform - AI Agent Instructions

## Project Overview
An AI-powered LinkedIn content automation platform that generates viral-optimized posts using Google Gemini API. Features viral analysis, trend hunting, image suggestions, and multi-format post generation. This is a **production-ready full-stack application** with Express backend and React frontend.

## Architecture & Service Boundaries

### Core Service Pattern: Service-Oriented Architecture
All AI and data services follow a **singleton pattern** exported via `module.exports = new ServiceClass()`. Services are stateless and imported directly into routes.

**Key Services:**
- `geminiService.js` - Wraps Google Gemini API (model: `gemini-2.0-flash`), provides reusable prompt templates
- `viralAnalysisService.js` - Deep viral analysis with LinkedIn algorithm insights (2025 rules)
- `trendService.js` - Simulated trend analysis (production would use real APIs)
- `imageService.js` - Free image source aggregation (Pexels, Unsplash, Lexica)
- `superAIManager.js` - Intelligent workflow orchestrator that routes to appropriate services
- Additional: `profileOptimizerService`, `hashtagResearchService`, `hookLibraryService`, `competitorAnalysisService`, `videoContentService`

**Route Layer:** Express routes in `/routes/*.js` orchestrate service calls and aggregate responses. Example pattern from `routes/generate.js`:
```javascript
// Step 1: Deep viral analysis
const viralAnalysis = await viralAnalysisService.deepViralAnalysis(topic, niche);
// Step 2: Trend analysis  
const trendData = await trendService.analyzeTrendingTopics(topic);
// Step 3: Generate posts
const viralPosts = await viralAnalysisService.generateViralPost(topic, viralAnalysis, userInput);
// Aggregate and return
```

### LinkedIn Algorithm Rules (2025)
Critical constraints in `utils/linkedinAlgorithm.js`:
- Hook: ≤7 words (validated in `validatePost()`)
- Hashtags: max 7, strategic mix (2 broad + 3 niche + 2 trending)
- Line breaks: every 1-2 lines for mobile readability
- Best posting times: 8:30 AM, 1:00 PM, 5:30 PM IST
- Engagement CTAs required (validated)
- Dwell time optimization: target 30+ seconds read time

**When adding content features:** Always validate against `algorithmRules` object and use `validatePost()` / `getOptimizationScore()`.

## Critical Developer Workflows

### Environment Setup
```bash
# Install dependencies
npm install
cd client && npm install && cd ..

# Configure API key (required)
GEMINI_API_KEY=your_key  # Get from https://makersuite.google.com/app/apikey

# Development
npm run dev:full        # Runs backend (port 5000) + frontend (port 3000)
npm run dev            # Backend only
npm run client         # Frontend only
```

### Adding New AI Features
1. **Create service in `/services/`** - Extend from Gemini base pattern
2. **Add route in `/routes/`** - Follow orchestration pattern (call multiple services, aggregate)
3. **Register in `server.js`** - Add `app.use('/api/<endpoint>', router)`
4. **Update frontend** - Add API call in `App.js`, create component if needed

**Example:** The video feature added `videoContentService.js`, `routes/video.js`, and `VideoOutputDisplay.js` component.

### Testing API Endpoints
```bash
# Health check
curl http://localhost:5000/api/health

# Generate content
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "AI automation", "niche": "Tech", "style": "Viral"}'
```

## Project-Specific Conventions

### Prompt Engineering Pattern
All Gemini prompts follow this structure (see `geminiService.js` and `viralAnalysisService.js`):
1. **Role declaration:** "You are [expert role] with [capabilities]"
2. **Structured input:** Use uppercase headers (TOPIC:, GOAL:, etc.)
3. **Numbered steps:** "# STEP 1: [Name]" for multi-stage analysis
4. **Output format:** "Provide EXACTLY this structure:" with clear delimiters
5. **Constraints:** "CRITICAL RULES:", "MANDATORY REQUIREMENTS:"
6. **Actionable directive:** End with "Be SPECIFIC and ACTIONABLE"

**Anti-pattern:** Generic prompts without structure lead to inconsistent outputs.

### Component State Management (React)
Simple useState pattern - no Redux. `App.js` holds main state:
```javascript
const [loading, setLoading] = useState(false);
const [result, setResult] = useState(null);
// Pass to children via props
```

### Error Handling Standard
Backend routes use try-catch with structured errors:
```javascript
catch (error) {
  res.status(500).json({ 
    error: 'Generation Failed', 
    message: error.message,
    timestamp: new Date().toISOString()
  });
}
```
Frontend uses `react-toastify` for user notifications.

### CSS Styling Convention
- Component-specific CSS files (e.g., `Header.css`, `InputForm.css`)
- Glass-morphism design: `backdrop-filter: blur(10px)`, `background: rgba()`
- Gradient text: `.gradient-text { background: linear-gradient(); -webkit-background-clip: text; }`
- No CSS-in-JS libraries - pure CSS modules

## Integration Points & Data Flows

### Client → Server → AI Flow
1. User fills `InputForm.js` → submits with topic, style, goal, link
2. `App.js` POSTs to `/api/generate` (or `/api/video/analyze` for video)
3. Route calls services in parallel where possible:
   - Viral analysis (Gemini AI)
   - Trend research (simulated/API)
   - Image suggestions (free sources)
4. Response structure:
```javascript
{
  success: true,
  viralAnalysis: { deepAnalysis, algorithmInsights },
  trends: { analysis, data, viralPotential },
  posts: { viralOptimized, bestPostingTimes },
  images: { suggestions, recommendation },
  meta: { hashtags, tips }
}
```
5. `OutputDisplay.js` renders sections with copy-to-clipboard functionality

### SuperAI Orchestration Pattern
`superAIManager.js` implements workflow-based execution:
- **analyzeIntent()** - AI determines workflow from user action (6 workflow types)
- **executeWorkflow()** - Sequential step execution with dependency passing
- **Step pattern:** Results from previous steps available to next (e.g., viral-analysis → content-generation)

**When to use:** Complex multi-service operations where service selection depends on context.

## External Dependencies

### Google Gemini API
- **Model:** `gemini-2.0-flash` (free tier, stable)
- **Library:** `@google/generative-ai`
- **Rate limits:** Not enforced in code - implement if scaling
- **Pattern:** All AI calls go through `geminiService.model.generateContent(prompt)`

### Free Image Sources (No API keys required)
- Pexels.com, Unsplash.com, Lexica.art
- Implementation: `imageService.js` returns search URLs, not direct downloads
- User clicks through to download

### Simulated vs Real APIs
- **Simulated:** `trendService.js` (Google Trends - would need real API)
- **Real:** Gemini AI, image search URLs
- **Production TODO:** Integrate real Google Trends API, News API for headlines

## Key Files for Reference

### Backend Core
- `server.js` - Express setup, 10 API routes registered, CORS config for Vercel
- `services/geminiService.js` - Base AI service, 5 methods: `generateContent`, `generateTrends`, `generatePosts`, `optimizePost`, `suggestImages`
- `services/viralAnalysisService.js` - Deep viral research, algorithm analysis
- `utils/linkedinAlgorithm.js` - Algorithm rules object, validation functions

### Frontend Core  
- `client/src/App.js` - Main component, routing logic for text vs video
- `client/src/components/InputForm.js` - Form with content type selector (text/video)
- `client/src/components/OutputDisplay.js` - Renders posts, trends, images with copy buttons

### Deployment
- `vercel.json` - Configured for Vercel serverless (rewrites to `server.js`)
- `server.js` - Checks `process.env.VERCEL` for serverless mode
- Production: Serves React build from `client/build`

## Development Guardrails

### Never Modify
- `algorithmRules` structure in `linkedinAlgorithm.js` without testing - tied to LinkedIn's 2025 algorithm
- Gemini model name - `gemini-2.0-flash` is stable free tier
- Service singleton pattern - breaks route imports

### Always Validate
- User input in routes before passing to services (topic required)
- Post content against `validatePost()` before returning
- Environment variable `GEMINI_API_KEY` exists on startup

### Performance Notes
- Gemini API calls take 5-10 seconds - never block UI
- Multiple service calls in routes run sequentially (could parallelize with `Promise.all()` where independent)
- Frontend shows `LoadingSpinner.js` during generation

### Vercel Deployment Notes
- `module.exports = app` enables serverless
- Frontend built with `npm run vercel-build` (defined in root `package.json`)
- Static files served from `client/build` in production

## Common Tasks

**Add a new post style:**
1. Add option to `styleOptions` array in `InputForm.js`
2. Update prompt in `geminiService.generatePosts()` or `viralAnalysisService.generateViralPost()`
3. No backend route changes needed

**Add new API endpoint:**
1. Create service in `/services/<name>Service.js`
2. Create route in `/routes/<name>.js` - export router
3. Register in `server.js`: `app.use('/api/<name>', require('./routes/<name>'))`
4. Add to health check endpoints list

**Debug AI output:**
1. Check `console.log()` in service method
2. Inspect prompt structure - ensure headers match parsing logic
3. Test prompt in Google AI Studio (https://makersuite.google.com/) directly

**Update LinkedIn algorithm rules:**
1. Modify `algorithmRules` object in `utils/linkedinAlgorithm.js`
2. Update validation logic in `validatePost()` if needed
3. Reflect changes in all service prompts mentioning algorithm rules

---

**Project Status:** Production-ready, fully functional, deployed on Vercel. Focus on extending viral analysis features and adding real-time data integrations.
