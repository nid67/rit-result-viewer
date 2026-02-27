# 🚀 Deploying to Vercel

This guide shows how to deploy the RIT Result Viewer to Vercel with **zero CORS issues**.

## Why Vercel?

- ✅ **Fixes CORS completely** - Uses Vercel Functions as a backend proxy
- ✅ **Free tier** - Covers this project
- ✅ **Fast** - Global CDN
- ✅ **Easy to deploy** - One-click from GitHub
- ✅ **Mobile-ready** - Full PWA support

## Quick Deploy

### Option 1: Click to Deploy (Easiest)

Click this button (add to repo if wanted):
```
[Deploy to Vercel Button Code]
```

### Option 2: Manual Vercel Setup

1. **Fork this repository** on GitHub

2. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign in with GitHub
   - Click "Add New" → "Project"
   - Import your forked repository

3. **Configure Project:**
   - Framework: Select "Other"
   - Root Directory: `./` (default)
   - Build Command: Leave empty
   - Output Directory: Leave empty
   - Environment Variables: Leave empty (not needed)

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (1-2 minutes)

5. **Your app is live!**
   - You'll get a URL like: `https://your-project.vercel.app`
   - API endpoints will be at: `https://your-project.vercel.app/api/token` and `/api/login`

## How It Works

### Architecture

```
Browser (Vercel)
    ↓
Frontend (index.html, app.js, styles.css)
    ↓
Vercel Serverless Function (/api/token, /api/login)
    ↓
RIT IMS Server (ims.ritchennai.edu.in)
```

### Why No CORS Issues?

- Browser → Vercel: **Same origin** (both on vercel.app)
- Vercel → RIT: **Server-to-server** (CORS headers not needed)
- No browser CORS restrictions!

### API Endpoints

**Fetch CSRF Token:**
```
GET /api/token
```

**Submit Login:**
```
POST /api/login
Content-Type: application/json

{
  "token": "csrf_token_here",
  "email": "1234567890123",
  "password": "your_password"
}
```

## File Structure

```
rit-result-viewer/
├── index.html          ← Frontend
├── app.js              ← Frontend logic (auto-detects Vercel)
├── styles.css          ← Styling
├── manifest.json       ← PWA manifest
├── vercel.json         ← Vercel config
├── api/
│   ├── token.js        ← API: Get CSRF token
│   └── login.js        ← API: Submit login
├── extension/          ← Chrome Extension files
│   ├── manifest.json
│   ├── popup.html
│   └── popup.js
└── README.md
```

## Testing Locally

### Install Vercel CLI

```bash
npm install -g vercel
```

### Run Locally

```bash
cd rit-result-viewer
vercel dev
```

Then visit: `http://localhost:3000`

## Monitoring

Once deployed, you can monitor:

1. **Vercel Dashboard:** https://vercel.com/dashboard
2. **Logs:** Click project → "Logs" tab
3. **Deployments:** See all deployment history

## Troubleshooting

### "404 Not Found" on /api/token

- Check that `api/token.js` exists in repo
- Verify it was pushed to GitHub
- Try redeploying: Go to Vercel → Project → "Redeploy"

### Login fails with "Internal server error"

- Check Vercel Logs for details
- Verify RIT IMS server is accessible
- Check CSRF token extraction regex patterns in `api/token.js`

### Still getting CORS error

- Ensure you're on Vercel (`*.vercel.app` URL)
- Clear browser cache
- Try private/incognito window
- Check console logs for exact error

## Updating Code

After making changes:

1. **Push to GitHub:**
   ```bash
   git add -A
   git commit -m "Update: description"
   git push origin main
   ```

2. **Vercel auto-deploys** when you push to `main` branch

3. **Check deployment status:** Go to Vercel Dashboard

## Custom Domain (Optional)

Want a custom domain like `rit-results.com`?

1. Go to Vercel Project Settings → Domains
2. Add your domain
3. Update DNS records (Vercel will guide you)

## Environment Variables (Advanced)

To add custom variables, go to Project Settings → Environment Variables:

```
RIT_BASE_URL=https://ims.ritchennai.edu.in
```

Then use in API: `const baseUrl = process.env.RIT_BASE_URL`

## Performance

Vercel provides:
- ✅ Global CDN for fast loading
- ✅ Auto-scaling for high traffic
- ✅ Edge caching for static assets
- ✅ Serverless functions (fast cold starts)

## Security Notes

- All communication is **HTTPS only**
- API endpoints validate input
- No data is stored on servers
- Credentials sent directly to RIT IMS

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Report Issues:** GitHub Issues in repo
- **Community:** Vercel Community Forums

---

**You're all set!** Your PWA is now live with full CORS support. 🎉
