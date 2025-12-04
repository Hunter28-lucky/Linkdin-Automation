# 🚀 LinkedIn Viral Content Automation Platform

**AI-Powered LinkedIn Growth Agent** by Krish Goswami

## 🎯 Features

- 🔥 **Trend Hunting Engine** - Automatically discovers viral LinkedIn topics
- 📝 **Multi-Format Post Generator** - Creates 3 post variations (Viral, Professional, Story)
- 🖼️ **Smart Image Suggestions** - Free image sourcing with engagement optimization
- ⚡ **Algorithm Optimization** - 2025 LinkedIn algorithm compliance
- 📊 **Performance Analytics** - Learn and improve from post metrics
- 🤖 **Powered by Google Gemini** - 100% free AI processing

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **AI Engine**: Google Gemini API (Free)
- **Frontend**: React, Modern UI
- **Free Tools**: Pexels, Unsplash, Lexica.art, Google Trends

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API Key (free from Google AI Studio)

### Setup Steps

1. **Clone and Install**
```bash
cd "Linkdin Automation"
npm install
```

2. **Configure Environment**
```bash
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

3. **Get Your Free Gemini API Key**
- Visit: https://makersuite.google.com/app/apikey
- Click "Create API Key"
- Copy and paste into `.env` file

4. **Install Client Dependencies**
```bash
cd client
npm install
cd ..
```

5. **Run Development Server**
```bash
# Run both backend and frontend
npm run dev:full

# Or separately:
npm run dev        # Backend only (port 5000)
npm run client     # Frontend only (port 3000)
```

## 🎮 Usage

### Input Format
```
Topic: Website development
Style: Professional + Viral
Goal: Showcase my project
Link: https://krishgoswami.me
Assets: (optional)
```

### Output Package
- 3 viral-ready post variations
- Trending topics analysis
- Image recommendations
- Best posting times (IST)
- Algorithm-optimized format

## 🔧 API Endpoints

- `POST /api/generate` - Generate LinkedIn posts
- `GET /api/trends` - Get trending topics
- `POST /api/images` - Get image suggestions
- `POST /api/optimize` - Optimize existing post

## 📊 LinkedIn Algorithm Rules (2025)

- ✅ Hook under 7 words
- ✅ Line breaks every 1-2 lines
- ✅ Max 7 hashtags
- ✅ Engagement CTAs
- ✅ Mobile-friendly formatting
- ✅ Best times: 8:30 AM, 1:00 PM, 5:30 PM IST

## 🌟 Roadmap

- [ ] Auto-scheduling integration
- [ ] DM automation
- [ ] Comment reply automation
- [ ] A/B testing module
- [ ] Content calendar
- [ ] Lead generation system

## 📄 License

MIT © Krish Goswami

## 🤝 Contributing

This is a personal automation tool. Feel free to fork and customize for your needs.

---

**Made with ⚡ by Krish Goswami**
