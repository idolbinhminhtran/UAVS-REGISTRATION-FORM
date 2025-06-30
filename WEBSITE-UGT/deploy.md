# UAVS's Got Talent 2025 - Deployment Guide

## 🚀 GitHub Pages Deployment

This guide will help you deploy the UAVS's Got Talent 2025 website to GitHub Pages.

### Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **Repository**: Your code should be in a GitHub repository
3. **Node.js**: Ensure Node.js is installed (version 16+)

### Method 1: Automatic Deployment with GitHub Actions (Recommended)

#### Step 1: Push Your Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: UAVS Got Talent 2025 website"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/UAVS.git

# Push to main branch
git push -u origin main
```

#### Step 2: Enable GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically trigger when you push to main branch

#### Step 3: Access Your Website

After successful deployment, your website will be available at:
```
https://YOUR_USERNAME.github.io/UAVS
```

### Method 2: Manual Deployment

If you prefer manual deployment, you can use the gh-pages package:

```bash
# Navigate to the frontend directory
cd WEBSITE-UGT/FRONT-END

# Install dependencies (if not already done)
npm install

# Deploy to GitHub Pages
npm run deploy
```

### Configuration Details

#### Package.json Configuration
```json
{
  "name": "uavs-got-talent-2025",
  "homepage": "https://YOUR_USERNAME.github.io/UAVS",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

#### Router Configuration
The app uses React Router with basename="/UAVS" to handle GitHub Pages subdirectory routing.

### Updating the Deployment

#### For Automatic Deployment:
Simply push your changes to the main branch:
```bash
git add .
git commit -m "Update website content"
git push origin main
```

#### For Manual Deployment:
```bash
cd WEBSITE-UGT/FRONT-END
npm run deploy
```

### Troubleshooting

#### 1. 404 Error on Refresh
If you get 404 errors when refreshing pages other than home, this is normal for GitHub Pages with React Router. The app handles routing internally.

#### 2. Build Errors
If the build fails, check:
- All dependencies are installed (`npm install`)
- No console errors in development (`npm start`)
- All imports are correct and files exist

#### 3. Deployment Permissions
If GitHub Actions fails due to permissions:
1. Go to **Settings** > **Actions** > **General**
2. Under **Workflow permissions**, select **Read and write permissions**
3. Check **Allow GitHub Actions to create and approve pull requests**

#### 4. Custom Domain (Optional)
To use a custom domain:
1. Add a `CNAME` file in the `public` folder with your domain
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

### Environment Variables

If you need environment variables for production:
1. Create them in GitHub repository **Settings** > **Secrets and variables** > **Actions**
2. Use them in the workflow file with `${{ secrets.YOUR_SECRET }}`

### Performance Optimization

The build includes:
- ✅ Code splitting
- ✅ Minification
- ✅ Compression
- ✅ Optimized images
- ✅ CSS optimization

### Monitoring

After deployment, monitor:
- **GitHub Actions**: Check workflow status
- **Repository Insights**: Monitor traffic and performance
- **Issues**: Track any user-reported problems

### Support

For deployment issues:
1. Check GitHub Actions logs
2. Verify all files are committed and pushed
3. Ensure package.json homepage URL is correct
4. Test build locally with `npm run build`

---

## 📱 Live Website

Once deployed, your UAVS's Got Talent 2025 website will be live at:
**https://YOUR_USERNAME.github.io/UAVS**

### Features Available:
- ✨ Beautiful hero section with kaleidoscope animation
- 📝 Complete registration form
- 📱 Mobile-responsive design
- 🎨 Modern UI with smooth animations
- 🔗 Working navigation between pages

---

**Happy Deploying! 🎉** 