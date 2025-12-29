# Automatic deployment script for RIRS Frontend
Write-Host "🚀 RIRS Auto-Deployment Starting..." -ForegroundColor Green

# Step 1: Navigate to clean frontend
Set-Location "rirs-frontend-clean"

# Step 2: Install Vercel CLI if not installed
Write-Host "📦 Checking Vercel CLI..." -ForegroundColor Yellow
try {
    vercel --version | Out-Null
    Write-Host "✅ Vercel CLI found" -ForegroundColor Green
} catch {
    Write-Host "📥 Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Step 3: Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Step 4: Build the project
Write-Host "🔨 Building project..." -ForegroundColor Yellow
npm run build

# Step 5: Deploy to Vercel
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Green
Write-Host "Please follow the prompts:" -ForegroundColor Cyan
Write-Host "- Set up and deploy? Y" -ForegroundColor Gray
Write-Host "- Which scope? (your account)" -ForegroundColor Gray
Write-Host "- Link to existing project? N" -ForegroundColor Gray
Write-Host "- Project name: rirs-frontend" -ForegroundColor Gray
Write-Host "- Directory: ./" -ForegroundColor Gray

vercel --prod

Write-Host "🎉 Deployment completed!" -ForegroundColor Green
Write-Host "🌐 Your app should be live now!" -ForegroundColor Cyan

# Go back to original directory
Set-Location ".."