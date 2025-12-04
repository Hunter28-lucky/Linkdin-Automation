# 🚀 Vercel Deployment Guide

## Prerequisites
- Vercel account (free at [vercel.com](https://vercel.com))
- Vercel CLI installed globally: `npm i -g vercel`

## Quick Deploy Steps

### 1. Install Vercel CLI (if not installed)
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from Root Directory
```bash
cd "Linkdin Automation"
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → linkedin-viral-automation (or your choice)
- **Directory?** → `./` (root)
- **Override settings?** → No

### 4. Set Environment Variables
After deployment, add your Gemini API key:

```bash
vercel env add GEMINI_API_KEY
```

Or via Vercel Dashboard:
1. Go to your project → Settings → Environment Variables
2. Add `GEMINI_API_KEY` with your API key value
3. Select all environments (Production, Preview, Development)

### 5. Redeploy with Environment Variables
```bash
vercel --prod
```

## Important Configuration

### Environment Variables Required:
- `GEMINI_API_KEY` - Your Google Gemini API key (get from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Optional Variables:
- `NODE_ENV=production` (automatically set by Vercel)
- `PORT` (automatically managed by Vercel)

## Post-Deployment

### Your URLs:
- **Production**: `https://your-project.vercel.app`
- **API Health**: `https://your-project.vercel.app/api/health`

### Update Client API URL:
The client is configured to use relative URLs, so it will automatically work with Vercel's deployment.

### Testing:
1. Visit your production URL
2. Check `/api/health` endpoint
3. Test content generation

## Troubleshooting

### Build Fails?
- Check that all dependencies are in `package.json` (not devDependencies)
- Verify `client/build` directory exists after build

### API Not Working?
- Verify `GEMINI_API_KEY` is set in Vercel dashboard
- Check function logs in Vercel dashboard
- Ensure API routes are accessible at `/api/*`

### Client Not Loading?
- Check build output in Vercel logs
- Verify `client/build` contains `index.html`
- Check browser console for errors

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions

## Continuous Deployment

Vercel automatically deploys:
- **Production**: Push to `main` branch
- **Preview**: Push to any other branch or PR

Connect your GitHub repo for automatic deployments:
```bash
vercel --prod
# Then link to GitHub in Vercel dashboard
```

## Local Development vs Production

### Local (Development):
```bash
npm run dev:full  # Both servers
```

### Production (Vercel):
- Frontend: Static build served by Vercel
- Backend: Serverless functions on Vercel

## Performance Tips

1. **Enable caching** - Vercel caches static assets automatically
2. **Edge Network** - Your app runs on Vercel's global CDN
3. **Serverless functions** - Auto-scale based on traffic

## Cost

- **Free Tier**: 100GB bandwidth, unlimited serverless function invocations
- Perfect for this project's needs!

---

**Need Help?** Check [Vercel Documentation](https://vercel.com/docs) or [Vercel Discord](https://vercel.com/discord)
