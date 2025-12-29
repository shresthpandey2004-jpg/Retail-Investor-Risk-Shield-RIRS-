@echo off
echo 🚀 RIRS Auto-Deployment
echo =====================

cd rirs-frontend-clean

echo 📦 Installing Vercel CLI...
npm install -g vercel

echo 📦 Installing dependencies...
npm install

echo 🔨 Building project...
npm run build

echo 🚀 Deploying to Vercel...
echo.
echo Please answer the prompts:
echo - Set up and deploy? Y
echo - Which scope? (your account)
echo - Link to existing project? N  
echo - Project name: rirs-frontend
echo - Directory: ./
echo.

vercel --prod

echo.
echo 🎉 Deployment completed!
echo 🌐 Your app should be live now!

cd ..
pause