# 🚀 Quick Deploy Guide

## Method 1: Vercel (Recommended - 2 minutes)

### Option A: Via Vercel Dashboard (Easiest)

1. **Push to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" → Use GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite settings ✅
   - Click "Deploy"
   - **Done!** Your site is live at `https://your-project.vercel.app`

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /Users/pulakantidikshithreddy/Portfolio
vercel

# Follow prompts, then:
vercel --prod
```

---

## Method 2: Netlify (Also Easy)

1. **Build your project**:
   ```bash
   npm run build
   ```

2. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop the `dist` folder
   - **Done!** Your site is live

Or use CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## Method 3: GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json** - add to scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. **Update vite.config.js** - add base:
   ```js
   export default defineConfig({
     base: '/your-repo-name/',
     plugins: [react()],
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

---

## ⚡ Fastest Way (Vercel Dashboard):

1. Push code to GitHub
2. Go to vercel.com → Import Project
3. Click Deploy
4. **Done in 2 minutes!**

Your portfolio will be live globally! 🌍
