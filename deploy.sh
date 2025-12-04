#!/bin/bash

echo "🚀 Deploying LinkedIn Viral Automation to Vercel..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

echo "✅ Vercel CLI ready"
echo ""

# Check for .env file
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "   Make sure to add GEMINI_API_KEY in Vercel dashboard after deployment"
    echo ""
fi

# Deploy to Vercel
echo "📦 Starting deployment..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Add GEMINI_API_KEY environment variable in Vercel dashboard"
echo "   2. Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables"
echo "   3. Add GEMINI_API_KEY with your API key"
echo "   4. Redeploy if needed: vercel --prod"
echo ""
echo "🎉 Your app is live!"
