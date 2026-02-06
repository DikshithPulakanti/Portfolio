# 🌐 Custom Domain Setup: www.dikshithreddypulakanti.com

## Step-by-Step Guide to Host Your Portfolio

### Prerequisites:
- Domain purchased: `dikshithreddypulakanti.com` (or you need to purchase it)
- GitHub account (for easy deployment)

---

## Option 1: Vercel (Recommended - Easiest & Free)

### Step 1: Deploy to Vercel

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "Add New Project"
   - Import your repository
   - Click "Deploy"
   - Wait for deployment to complete

### Step 2: Add Custom Domain

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Settings" → "Domains"
   - Enter: `www.dikshithreddypulakanti.com`
   - Click "Add"

2. **Vercel will show DNS records**:
   - Note the CNAME record (e.g., `cname.vercel-dns.com`)

### Step 3: Configure DNS (at your domain registrar)

Go to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.):

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com` (or what Vercel shows)
- TTL: `3600` (or default)

**For root domain (optional - to support dikshithreddypulakanti.com):**
- Type: `A`
- Name: `@` (or blank)
- Value: `76.76.21.21` (Vercel's IP - check Vercel docs for latest)
- TTL: `3600`

**Or use ALIAS/ANAME if supported:**
- Type: `ALIAS` or `ANAME`
- Name: `@`
- Value: `cname.vercel-dns.com`

### Step 4: Wait for DNS Propagation

- DNS changes take 5 minutes to 48 hours
- Check status: `dig www.dikshithreddypulakanti.com`
- Or use: [whatsmydns.net](https://www.whatsmydns.net)

### Step 5: SSL Certificate (Automatic)

- Vercel automatically provisions SSL certificates
- Your site will be HTTPS automatically ✅

---

## Option 2: Google Cloud Platform (GCP)

### Step 1: Build Your Site

```bash
npm run build
```

### Step 2: Deploy to Google Cloud Storage + Cloud CDN

1. **Create a bucket**:
   ```bash
   gcloud storage buckets create gs://dikshithreddypulakanti.com
   ```

2. **Upload files**:
   ```bash
   gcloud storage cp -r dist/* gs://dikshithreddypulakanti.com/
   ```

3. **Make bucket public**:
   ```bash
   gcloud storage buckets update gs://dikshithreddypulakanti.com --public-access-prevention
   gsutil web set -m index.html -e index.html gs://dikshithreddypulakanti.com
   ```

4. **Set up Cloud Load Balancer** (for custom domain):
   - Create HTTPS load balancer
   - Point to your bucket
   - Configure SSL certificate
   - Set up DNS records

**Note**: GCP setup is more complex. Vercel is recommended for simplicity.

---

## Option 3: Netlify (Also Easy)

### Step 1: Deploy

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Import your repository
4. Deploy

### Step 2: Add Custom Domain

1. Go to "Domain settings"
2. Add custom domain: `www.dikshithreddypulakanti.com`
3. Follow DNS instructions
4. Netlify provides SSL automatically

---

## DNS Configuration Summary

### At Your Domain Registrar:

**For www.dikshithreddypulakanti.com:**
```
Type: CNAME
Name: www
Value: [provided by hosting platform]
TTL: 3600
```

**For root domain (dikshithreddypulakanti.com):**
```
Type: A (or ALIAS)
Name: @
Value: [IP or CNAME from hosting platform]
TTL: 3600
```

---

## Quick Checklist:

- [ ] Code pushed to GitHub
- [ ] Site deployed to hosting platform (Vercel/Netlify)
- [ ] Custom domain added in hosting platform
- [ ] DNS records configured at domain registrar
- [ ] Wait for DNS propagation (5 min - 48 hours)
- [ ] SSL certificate active (automatic)
- [ ] Test: `https://www.dikshithreddypulakanti.com`

---

## Recommended: Vercel

**Why Vercel?**
- ✅ Free hosting
- ✅ Automatic SSL
- ✅ Global CDN
- ✅ Easy custom domain setup
- ✅ Auto-deploy from GitHub
- ✅ Perfect for React/Vite projects

**Cost**: Free for personal projects

---

## Need Help?

1. **Check DNS propagation**: [whatsmydns.net](https://www.whatsmydns.net)
2. **Test your site**: Visit `https://www.dikshithreddypulakanti.com`
3. **Vercel docs**: [vercel.com/docs](https://vercel.com/docs)

---

## After Setup:

Your portfolio will be live at:
- 🌐 `https://www.dikshithreddypulakanti.com`
- 🔒 Automatic HTTPS/SSL
- ⚡ Fast global CDN
- 🚀 Auto-deploy on every git push
