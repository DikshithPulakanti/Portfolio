# 🚀 Quick Setup: www.dikshithreddypulakanti.com

## Fastest Path (5 minutes):

### 1. Deploy to Vercel (2 min)

```bash
# If not already on GitHub:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

Then:
- Go to [vercel.com](https://vercel.com) → Sign up with GitHub
- Click "Add New Project" → Import your repo → Deploy

### 2. Add Domain in Vercel (1 min)

- Project → Settings → Domains
- Add: `www.dikshithreddypulakanti.com`
- Copy the CNAME value shown

### 3. Configure DNS (2 min)

Go to your domain registrar (where you bought dikshithreddypulakanti.com):

**Add CNAME record:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com` (or what Vercel shows)
- Save

### 4. Wait & Test

- Wait 5-60 minutes for DNS propagation
- Visit: `https://www.dikshithreddypulakanti.com`
- ✅ Done!

---

## That's it! Your site will be live globally! 🌍
