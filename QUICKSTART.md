# 🚀 QUICK START GUIDE

## LinkedIn Viral Automation Platform
**⚡ Generate viral LinkedIn posts in 30 seconds**

---

## ⏱️ 5-Minute Setup

### Step 1: Install Dependencies
```bash
cd "Linkdin Automation"
./setup.sh
```

### Step 2: Get Free Gemini API Key
1. Visit: **https://makersuite.google.com/app/apikey**
2. Click **"Create API Key"**
3. Copy the key

### Step 3: Configure
```bash
# Edit .env file
nano .env

# Paste your API key:
GEMINI_API_KEY=your_actual_key_here
```

### Step 4: Run
```bash
npm run dev:full
```

**That's it! 🎉**

Open: **http://localhost:3000**

---

## 🎯 First Use

1. **Enter your topic**: "Website development"
2. **Choose style**: "Professional + Viral"
3. **Add goal** (optional): "Showcase my project"
4. **Click Generate**

You'll get:
- ✅ 3 viral post variations
- ✅ Trending analysis
- ✅ Image suggestions
- ✅ Best posting times
- ✅ Optimized hashtags

---

## 📱 What You'll See

### Input Form
```
Topic: AI automation
Style: Professional + Viral
Goal: Educate audience
Link: https://yoursite.com
```

### Output
1. **Viral Potential Score**: 85/100 (High)
2. **3 Post Formats**:
   - Short & Viral
   - Professional Authority
   - Story Hook
3. **Best Times**: 8:30 AM, 1:00 PM, 5:30 PM IST
4. **Hashtags**: 7 optimized hashtags
5. **Images**: Free sources with direct links

---

## 🔥 Pro Tips

### For Maximum Engagement:
- Post at **5:30 PM IST** (best time)
- Use **Format B** for authority
- Use **Format A** for quick viral hits
- Use **Format C** for storytelling

### Hook Formula:
```
[Number] + [Action] + [Benefit]
Example: "3 mistakes killing your career"
```

### Hashtag Strategy:
- 2 broad (#AI, #Tech)
- 3 niche (#ReactJS, #WebDev)
- 2 branded (#CareerGrowth, #TechTips)

---

## 🛠️ Troubleshooting

### "API Error"
- Check if GEMINI_API_KEY is in .env
- Verify key at: https://makersuite.google.com

### "Port in use"
```bash
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9
npm run dev:full
```

### "Module not found"
```bash
npm install
cd client && npm install
```

---

## 📊 Usage Example

### Input:
```
Topic: Building a portfolio website
Style: Professional + Viral
Goal: Share my journey
```

### You Get:
```
POST A (SHORT VIRAL):
Your portfolio speaks before you do.

3 elements that changed everything for me:
→ Clean UI
→ Fast load
→ Clear CTA

Built mine in 2 days.
You?

#WebDevelopment #Portfolio #TechTips

---

POST B (PROFESSIONAL):
[Detailed professional version]

---

POST C (STORY):
[Personal story version]
```

---

## ⚡ Power Features

- **Trend Analysis**: Real-time viral topics
- **Multi-Format**: 3 variations per request
- **Free Images**: Pexels, Unsplash, Lexica
- **Algorithm Optimized**: 2025 LinkedIn rules
- **Copy-Paste Ready**: No editing needed
- **Mobile Friendly**: Perfect formatting

---

## 🎓 Learning Resources

- **Full Docs**: README.md
- **Usage Guide**: USAGE.md
- **API Docs**: API.md

---

## 🔗 Quick Links

- **Gemini API**: https://makersuite.google.com/app/apikey
- **Pexels**: https://pexels.com
- **Unsplash**: https://unsplash.com
- **Lexica**: https://lexica.art

---

## 📈 Results You Can Expect

- **Content Creation**: 10x faster
- **Engagement**: 2-3x higher
- **Time Saved**: 10+ hours/week
- **Consistency**: Daily posts, zero effort

---

## 🎯 Next Steps

1. ✅ Generate your first 3 posts
2. ✅ Test different topics
3. ✅ Track what works
4. ✅ Iterate and improve

---

## 💡 Advanced Usage

### API Mode
```bash
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"topic":"AI automation","style":"Viral"}'
```

### Batch Generation
```javascript
const topics = ['AI', 'Web Dev', 'Career'];
const posts = await Promise.all(
  topics.map(topic => generatePost(topic))
);
```

---

**Made with ⚡ by Krish Goswami**

**Questions? Check USAGE.md for detailed guide**

🚀 **Start Creating Viral Content Now!**
