# 🌐 Deploy to www.dikshithreddypulakanti.com

## Step 1: Deploy to Vercel (2 minutes)

### Option A: Via Vercel Dashboard (Easiest)

1. **Go to [vercel.com](https://vercel.com)**
   - Sign up/Login (use "Continue with GitHub")
   - Authorize Vercel to access your GitHub

2. **Import Your Repository**:
   - Click **"Add New Project"**
   - Find and select **"Portfolio"** repository
   - Click **"Import"**

3. **Configure Project**:
   - Framework Preset: **Vite** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `dist` (auto-filled)
   - Click **"Deploy"**

4. **Wait for deployment** (~30 seconds)
   - Your site will be live at: `https://portfolio-xxxxx.vercel.app`

---

## Step 2: Add Custom Domain (2 minutes)

### In Vercel Dashboard:

1. **Go to your project** → Click on it
2. **Settings** → **Domains**
3. **Add Domain**:
   - Enter: `www.dikshithreddypulakanti.com`
   - Click **"Add"**

4. **Vercel will show DNS instructions**:
   - Copy the **CNAME** value (e.g., `cname.vercel-dns.com`)

---

## Step 3: Configure DNS at Your Domain Registrar

### Go to where you bought `dikshithreddypulakanti.com`:

**Common Registrars:**
- GoDaddy
- Namecheap
- Google Domains
- Cloudflare
- Others

### Add CNAME Record:

1. **Go to DNS Management / DNS Settings**
2. **Add new record**:
   - **Type:** `CNAME`
   - **Name/Host:** `www`
   - **Value/Target:** `[value from Vercel]` (e.g., `cname.vercel-dns.com`)
   - **TTL:** `3600` (or default)
3. **Save**

### Optional: Add Root Domain (dikshithreddypulakanti.com without www)

**In Vercel:**
- Also add: `dikshithreddypulakanti.com` (without www)

**At Domain Registrar:**
- Add **A record**:
  - Type: `A`
  - Name: `@` (or blank)
  - Value: `76.76.21.21` (Vercel's IP - check Vercel docs for latest)
  - TTL: `3600`

**OR** if your registrar supports **ALIAS/ANAME**:
- Type: `ALIAS` or `ANAME`
- Name: `@`
- Value: `cname.vercel-dns.com`

---

## Step 4: Wait for DNS Propagation

- **Time:** 5 minutes to 60 minutes
- **Check status:** [whatsmydns.net](https://www.whatsmydns.net/#CNAME/www.dikshithreddypulakanti.com)

---

## Step 5: SSL Certificate (Automatic)

- Vercel automatically provisions SSL certificates
- Your site will be **HTTPS** automatically ✅
- No action needed!

---

## ✅ Done!

Your portfolio will be live at:
- 🌐 **https://www.dikshithreddypulakanti.com**
- 🔒 Automatic HTTPS/SSL
- ⚡ Fast global CDN
- 🚀 Auto-deploy on every git push

---

## Quick Checklist:

- [ ] Deploy to Vercel via dashboard
- [ ] Add domain `www.dikshithreddypulakanti.com` in Vercel
- [ ] Configure CNAME record at domain registrar
- [ ] Wait for DNS propagation (5-60 min)
- [ ] Test: `https://www.dikshithreddypulakanti.com`

---

## Troubleshooting:

**Domain not working?**
- Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net)
- Verify DNS records are correct
- Wait longer (can take up to 48 hours)

**SSL certificate issues?**
- Vercel handles this automatically
- Wait a few minutes after adding domain

**Need help?**
- Vercel docs: [vercel.com/docs](https://vercel.com/docs)
- Vercel support: Check your project dashboard
