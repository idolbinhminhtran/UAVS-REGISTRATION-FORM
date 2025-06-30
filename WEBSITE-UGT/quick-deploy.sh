#!/bin/bash

# UAVS's Got Talent 2025 - Quick Deploy Script
# This script builds and deploys the website to GitHub Pages

echo "🚀 Starting deployment process..."

# Navigate to frontend directory
cd WEBSITE-UGT/FRONT-END

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    echo "🌐 Deploying to GitHub Pages..."
    npm run deploy
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
        echo "Your website will be available at: https://YOUR_USERNAME.github.io/UAVS"
        echo "Note: It may take a few minutes for changes to appear online."
    else
        echo "❌ Deployment failed. Please check the error messages above."
        exit 1
    fi
else
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

echo "✨ Done!" 