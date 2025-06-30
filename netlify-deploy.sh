#!/bin/bash

# UAVS's Got Talent 2025 - Netlify Deploy Script

echo "🚀 Preparing for Netlify deployment..."

# Navigate to frontend directory
cd WEBSITE-UGT/FRONT-END

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building project for production..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🌐 Ready for Netlify deployment!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to https://www.netlify.com/"
    echo "2. Sign up/login to your account"
    echo "3. Click 'Add new site' → 'Deploy manually'"
    echo "4. Drag the 'build' folder to the deploy area"
    echo ""
    echo "OR for continuous deployment:"
    echo "1. Push this code to GitHub"
    echo "2. Connect your GitHub repo to Netlify"
    echo "3. Netlify will automatically use the netlify.toml config"
    echo ""
    echo "📁 Build folder location: $(pwd)/build"
    echo ""
    echo "🎉 Your site will be live instantly!"
else
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi 