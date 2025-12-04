# 📖 LinkedIn Viral Automation - Complete Guide

## 🎯 Overview

This is a professional-grade LinkedIn content automation platform that uses AI to generate viral posts, analyze trends, suggest images, and optimize content for maximum engagement.

## 🚀 Quick Start

### 1. Installation

```bash
# Make setup script executable
chmod +x setup.sh

# Run setup
./setup.sh
```

### 2. Get Your Free Gemini API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated key

### 3. Configure Environment

```bash
# Open .env file
nano .env

# Add your API key
GEMINI_API_KEY=your_actual_api_key_here
```

### 4. Run the Application

```bash
# Start both backend and frontend
npm run dev:full

# Or run separately:
npm run dev        # Backend only (port 5000)
npm run client     # Frontend only (port 3000)
```

## 📋 Features Breakdown

### 🔥 Trend Hunting Engine
- Analyzes current LinkedIn trends
- Provides viral potential scores
- Suggests best posting times (IST)
- Recommends trending hashtags

### ✍️ Post Generator
Creates 3 optimized variations:
- **Format A**: Short & Viral (3-5 lines)
- **Format B**: Professional Authority (8-12 lines)
- **Format C**: Story Hook (10-15 lines)

### 🖼️ Image Suggestions
- Free image sources (Pexels, Unsplash, Lexica)
- AI-generated search queries
- Engagement optimization tips
- Platform-specific recommendations

### ⚡ Algorithm Optimization
- Hook under 7 words
- Line breaks every 1-2 lines
- Max 7 hashtags
- Engagement CTAs
- Mobile-friendly formatting

## 🎨 How to Use

### Basic Usage

1. **Open the application** at `http://localhost:3000`

2. **Fill in the form**:
   ```
   Topic: Website development
   Style: Professional + Viral
   Goal: Showcase my project
   Link: https://yourwebsite.com (optional)
   ```

3. **Click "Generate Viral Posts"**

4. **Review the results**:
   - 3 post variations
   - Trending analysis
   - Image suggestions
   - Hashtag recommendations
   - Best posting times

5. **Copy and paste** to LinkedIn!

### API Usage

#### Generate Posts
```bash
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "AI automation",
    "style": "Professional + Viral",
    "goal": "Educate audience"
  }'
```

#### Get Trends
```bash
curl "http://localhost:5000/api/trends?topic=web%20development"
```

#### Get Image Suggestions
```bash
curl -X POST http://localhost:5000/api/images \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "AI automation",
    "style": "Professional"
  }'
```

#### Optimize Existing Post
```bash
curl -X POST http://localhost:5000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "postContent": "Your existing post content here..."
  }'
```

## 📊 Best Practices

### Posting Times (IST)
- **8:30 AM** - Morning commute (high engagement)
- **1:00 PM** - Lunch break (peak activity)
- **5:30 PM** - Evening wind-down (excellent reach)

### Content Structure
1. **Hook** (Line 1): Under 7 words, attention-grabbing
2. **Body**: Line breaks every 1-2 lines
3. **Value**: Clear benefit or insight
4. **CTA**: End with engagement question

### Hashtag Strategy
- **Total**: Max 7 hashtags
- **Mix**: 2 broad + 3 niche + 2 branded
- **Placement**: End of post
- **Research**: Check follower count and engagement

### Image Guidelines
- **Aspect Ratio**: 16:9 or 4:5
- **Quality**: High resolution
- **Style**: Professional, clean, high contrast
- **Text Overlay**: Max 5 words
- **Mobile Test**: Ensure visibility on phone

## 🛠️ Troubleshooting

### "Failed to generate content"
- Check if GEMINI_API_KEY is correctly set in `.env`
- Verify API key is active at https://makersuite.google.com/app/apikey
- Check internet connection

### Port already in use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Dependencies issues
```bash
# Clean install
rm -rf node_modules client/node_modules
rm package-lock.json client/package-lock.json
npm install
cd client && npm install
```

## 🔧 Configuration

### Environment Variables (.env)
```bash
# Required
GEMINI_API_KEY=your_api_key

# Optional
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
ENABLE_ANALYTICS=true
```

## 📈 Performance Tips

1. **Hook Quality**: First 7 words are crucial
2. **Line Breaks**: Improve mobile readability by 3x
3. **CTAs**: Posts with questions get 2x more comments
4. **Images**: High-contrast visuals increase CTR by 2-3x
5. **Timing**: Posting at optimal times increases reach by 40%

## 🎓 LinkedIn Algorithm Rules (2025)

### What Works:
✅ Short, punchy hooks  
✅ Frequent line breaks  
✅ Engagement questions  
✅ Personal stories  
✅ Actionable insights  
✅ Mobile-first format  
✅ Strategic hashtags  

### What Doesn't:
❌ Generic content  
❌ Too many hashtags (>7)  
❌ Long paragraphs  
❌ No CTA  
❌ Poor mobile formatting  
❌ Clickbait  

## 🚀 Advanced Features (Coming Soon)

- Auto-scheduling
- DM automation
- Comment reply automation
- A/B testing
- Content calendar
- Lead generation
- Performance analytics
- Multi-account support

## 📞 Support

### Get Help:
- Check README.md
- Review USAGE.md (this file)
- Check API documentation

### Report Issues:
Create detailed bug reports with:
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Error messages

## 🎉 Success Stories

Use this tool to:
- Generate 3+ high-quality posts in 30 seconds
- Increase engagement by 2-3x with algorithm optimization
- Save 10+ hours per week on content creation
- Maintain consistent LinkedIn presence
- Build thought leadership

## 📝 Example Workflow

1. **Morning**: Generate 3 posts for the week
2. **Review**: Choose best variations
3. **Enhance**: Add personal touch/images
4. **Schedule**: Post at optimal times
5. **Engage**: Respond to comments
6. **Analyze**: Track performance
7. **Improve**: Adjust based on data

---

**Made with ⚡ by Krish Goswami**

*Happy Automating! 🚀*
