#!/bin/bash

# Deploy only client to Vercel
echo "🚀 Deploying RIRS Client to Vercel"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "client/package.json" ]; then
    echo "❌ Error: Please run this script from the rirs-saas root directory"
    exit 1
fi

# Navigate to client directory
cd client

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building the application..."
npm run build

echo "🚀 Deploying to Vercel..."
npx vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your app should be live at the URL shown above"