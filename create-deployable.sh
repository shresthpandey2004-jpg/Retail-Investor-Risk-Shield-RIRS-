#!/bin/bash

echo "🚀 Creating deployable version for Vercel..."

# Create a new directory for deployable version
mkdir -p ../rirs-deployable

# Copy all client files to the deployable directory
cp -r client/* ../rirs-deployable/

# Copy necessary root files
cp README.md ../rirs-deployable/
cp .gitignore ../rirs-deployable/

# Create a simple README for the deployable version
cat > ../rirs-deployable/README.md << 'EOF'
# 🛡️ RIRS Frontend

Professional SaaS platform for retail investor protection.

## 🚀 Quick Deploy to Vercel

1. Push this repository to GitHub
2. Connect to Vercel
3. Deploy automatically

## 🛠️ Local Development

```bash
npm install
npm run dev
```

Built with Next.js 14 + React 18 + TypeScript + Tailwind CSS
EOF

echo "✅ Deployable version created in ../rirs-deployable"
echo "📁 Now you can:"
echo "   1. cd ../rirs-deployable"
echo "   2. git init && git add . && git commit -m 'Initial commit'"
echo "   3. Push to GitHub and deploy to Vercel"