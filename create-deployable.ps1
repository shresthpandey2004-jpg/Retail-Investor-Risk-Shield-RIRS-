# PowerShell script to create deployable version
Write-Host "🚀 Creating deployable version for Vercel..." -ForegroundColor Green

# Create deployable directory
$deployPath = "../rirs-deployable"
if (Test-Path $deployPath) {
    Remove-Item $deployPath -Recurse -Force
}
New-Item -ItemType Directory -Path $deployPath

# Copy client files
Write-Host "📁 Copying client files..." -ForegroundColor Yellow
Copy-Item -Path "client/*" -Destination $deployPath -Recurse -Force

# Create simple README
$readmeContent = "# RIRS Frontend`n`nProfessional SaaS platform for retail investor protection.`n`n## Deploy to Vercel`n`n1. Push to GitHub`n2. Import to Vercel`n3. Deploy`n`n## Local Development`n`nnpm install`nnpm run dev`n`nBuilt with Next.js 14 + React 18"

$readmePath = Join-Path $deployPath "README.md"
Set-Content -Path $readmePath -Value $readmeContent

Write-Host "✅ Deployable version created!" -ForegroundColor Green
Write-Host "📂 Location: $deployPath" -ForegroundColor Cyan