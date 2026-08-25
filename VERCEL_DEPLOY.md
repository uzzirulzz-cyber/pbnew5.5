# Vercel Deployment Guide

## Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push -u origin main
```

## Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import `uzzirulzz-cyber/new1111`
4. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)

## Step 3: Add Environment Variables

Go to **Project Settings → Environment Variables** and add each variable from `.env.local`:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend.com` | Production |
| `NEXT_PUBLIC_API_URL` | `https://your-staging-backend.com` | Preview |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` | Production |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` | Preview |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | `AaBbCc...` | All |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | `123...apps.googleusercontent.com` | All |
| `NEXT_PUBLIC_GITHUB_CLIENT_ID` | `Ov23li...` | All |
| `NEXT_PUBLIC_FACEBOOK_APP_ID` | `123456...` | All |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | `G-XXXXXXXXXX` | Production |
| `NEXT_PUBLIC_SITE_NAME` | `PlayBeat Digital` | All |

> **Tip:** Use "All" environment if the value is the same for Production, Preview, and Development.

## Step 4: Deploy

Click **Deploy**. Vercel will build and deploy automatically.

## Step 5: Custom Domain (Optional)

1. Go to **Project Settings → Domains**
2. Add your domain (e.g., `playbeat.digital`)
3. Follow DNS configuration instructions

## Backend Deployment (Railway — Recommended)

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub repo
3. Select `uzzirulzz-cyber/new1111`
4. Set **Root Directory:** `backend`
5. Add environment variables from `backend/.env.example`
6. Add **Start Command:** `npm start`
7. Generate domain: `https://playbeat-api.up.railway.app`
8. Copy this URL to Vercel's `NEXT_PUBLIC_API_URL`

### Required Backend Env Vars for Railway:

```
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://playbeat-digital.vercel.app
DATABASE_URL=<your Neon PostgreSQL connection string>
JWT_SECRET=your-super-secret-32-char-key-here!!!
JWT_REFRESH_SECRET=another-super-secret-32-char-key!!
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxx
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check `frontend/package.json` has all dependencies |
| API 404 | Verify `NEXT_PUBLIC_API_URL` has no trailing slash |
| CORS errors | Update `FRONTEND_URL` in backend to match Vercel URL |
| Images broken | Add image domains to `next.config.js` |
| Fonts not loading | Check `globals.css` import URL is accessible |

## Important Security Notes

- **NEVER** add backend secrets (Stripe secret key, JWT secrets, DB password) to frontend env vars
- Only use `NEXT_PUBLIC_` prefix for values safe to expose in browser
- Backend secrets go in Railway/Render environment, NOT Vercel
- Use `pk_test_` for preview deployments, `pk_live_` for production
