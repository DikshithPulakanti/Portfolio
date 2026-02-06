# 🚀 Deploy to www.dikshithreddypulakanti.com - Quick Guide

## Method 1: Netlify Drag & Drop (Easiest - No GitHub Needed!)

### Step 1: Build is Already Done ✅
Your `dist` folder is ready!

### Step 2: Deploy to Netlify

1. **Go to [netlify.com](https://netlify.com)**
   - Sign up/Login (free account)

2. **Drag & Drop Deployment**:
   - On Netlify dashboard, find "Sites" section
   - Drag the `dist` folder from your Portfolio directory
   - Drop it in the Netlify deploy area
   - Wait for deployment (~30 seconds)
   - Your site will be live at: `https://random-name.netlify.app`

### Step 3: Add Custom Domain

1. **In Netlify Dashboard**:
   - Go to your site → "Domain settings"
   - Click "Add custom domain"
   - Enter: `www.dikshithreddypulakanti.com`
   - Click "Verify"

2. **Netlify will show DNS instructions**:
   - Copy the CNAME value (something like `random-name.netlify.app`)

3. **Configure DNS at your domain registrar**:
   - Go to where you bought `dikshithreddypulakanti.com`
   - Add CNAME record:
     - Type: `CNAME`
     - Name: `www`
     - Value: `[Netlify shows this]`
     - TTL: `3600`

4. **Wait 5-60 minutes** for DNS propagation

5. **Done!** Your site will be live at `https://www.dikshithreddypulakanti.com`

---

## Method 2: Vercel CLI (Also Easy)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
cd /Users/pulakantidikshithreddy/Portfolio
vercel
```

Follow prompts:
- Set up and deploy? **Yes**
- Which scope? (Select your account)
- Link to existing project? **No**
- Project name? (Press Enter)
- Directory? (Press Enter for `./`)
- Override settings? **No**

### Step 3: Add Custom Domain

1. **In Vercel Dashboard**:
   - Go to your project → Settings → Domains
   - Add: `www.dikshithreddypulakanti.com`
   - Copy the DNS value shown

2. **Configure DNS** (same as Netlify above)

---

## Method 3: Fix GitHub & Deploy via Vercel Dashboard

### Step 1: Fix GitHub Remote

Update to your correct GitHub account:
```bash
git remote set-url origin https://github.com/DikshithPulakanti/Portfolio.git
```

### Step 2: Create Repository on GitHub

1. Go to github.com → Sign in as `DikshithPulakanti`
2. Create new repository named `Portfolio`
3. Don't initialize with README

### Step 3: Push Code

```bash
git push -u origin main
# Or if on master:
git branch -M main
git push -u origin main
```

### Step 4: Deploy on Vercel

1. Go to vercel.com → Sign up with GitHub
2. Import your `Portfolio` repository
3. Deploy

### Step 5: Add Custom Domain

Same as Method 2, Step 3 above.

---

## ⚡ FASTEST: Netlify Drag & Drop

**Right now, you can:**
1. Open Finder
2. Navigate to: `/Users/pulakantidikshithreddy/Portfolio/dist`
3. Go to netlify.com
4. Drag `dist` folder → Drop on Netlify
5. Add domain → Configure DNS
6. **Done in 5 minutes!**

---

## DNS Configuration Summary

At your domain registrar (where you bought dikshithreddypulakanti.com):

**For www:**
```
Type: CNAME
Name: www
Value: [provided by Netlify/Vercel]
TTL: 3600
```

**For root domain (optional):**
```
Type: A
Name: @
Value: [IP from hosting provider]
```

---

## Need Help?

- **Netlify Support**: [docs.netlify.com](https://docs.netlify.com)
- **Vercel Support**: [vercel.com/docs](https://vercel.com/docs)
- **Check DNS**: [whatsmydns.net](https://www.whatsmydns.net)
