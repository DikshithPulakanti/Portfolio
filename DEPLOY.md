# Deployment Guide

## Option 1: Deploy to Vercel (Recommended - Easiest)

### Steps:

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:
   ```bash
   cd /Users/pulakantidikshithreddy/Portfolio
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No**
   - Project name? (Press Enter for default or enter custom name)
   - Directory? (Press Enter for `./`)
   - Override settings? **No**

5. **Your site will be live** at a URL like: `https://your-project-name.vercel.app`

6. **For production deployment**:
   ```bash
   vercel --prod
   ```

### Alternative: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite settings
6. Click "Deploy"

---

## Option 2: Deploy to Netlify

### Steps:

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build your project**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Or use Netlify Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder after running `npm run build`

---

## Option 3: Deploy to GitHub Pages

### Steps:

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json** scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Update vite.config.js**:
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

## Option 4: Deploy to Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Select "Pages" → "Create a project"
3. Connect your GitHub repository
4. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Click "Save and Deploy"

---

## Quick Deploy Commands

### Vercel (Fastest):
```bash
npm install -g vercel
vercel
```

### Netlify:
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

---

## Important Notes:

- Make sure your `package.json` has a build script: `"build": "vite build"`
- The build output will be in the `dist` folder
- For React Router to work, you need server-side routing configuration (already included in `vercel.json`)
- Your site will be accessible globally once deployed!
