# 🚀 DEPLOY NOW — 3 Steps

## ⚠️ IMPORTANT: Run these on YOUR computer, NOT in a sandbox

The sandbox has network restrictions. These commands must run on your local machine.

---

## STEP 1: Download & Extract

Download this ZIP and extract it:
**[Download PlayBeat Digital](sandbox:///mnt/agents/output/playbeat-digital.zip)**

Or clone from GitHub:
```bash
git clone https://github.com/uzzirulzz-cyber/new1111.git
cd new1111
```

---

## STEP 2: Deploy Backend to Render (ONE COMMAND)

Open terminal in the `new1111` folder and run:

```bash
./render-deploy.sh
```

**What this does:**
- Creates a `web_service` (not static site) on Render
- Connects to your GitHub repo
- Sets build command: `npm install && npx prisma generate && npm run build`
- Sets start command: `npm start`
- Configures all environment variables

**Manual fallback** if the script fails:
1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub repo: `uzzirulzz-cyber/new1111`
4. Configure:
   - **Name:** `playbeat-api`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npm start`
5. Add these Environment Variables:

```
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://playbeat-digital.vercel.app
DATABASE_URL=postgresql://neondb_owner:npg_7PcHuOnXFyg5@ep-odd-butterfly-axizldmn-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET=playbeat-super-secret-key-32chars-long-2024
JWT_REFRESH_SECRET=playbeat-refresh-secret-key-32chars-long-2024
REDIS_HOST=localhost
REDIS_PORT=6379
```

6. Click **"Create Web Service"**

---

## STEP 3: Deploy Frontend to Vercel (ONE COMMAND)

```bash
./vercel-deploy.sh
```

**What this does:**
- Installs Vercel CLI if needed
- Deploys the `frontend/` folder
- Sets all environment variables

**Manual fallback:**
1. Go to https://vercel.com
2. Click **"Add New Project"**
3. Import `uzzirulzz-cyber/new1111`
4. Set **Root Directory:** `frontend`
5. Add Environment Variables:

```
NEXT_PUBLIC_API_URL=https://playbeat-api.onrender.com
NEXT_PUBLIC_APP_URL=https://playbeat-digital.vercel.app
NEXT_PUBLIC_SITE_NAME=PlayBeat Digital
```

6. Click **Deploy**

---

## STEP 4: Run Database Migrations (AFTER Render deploys)

Go to Render Dashboard → `playbeat-api` → **"Shell"** tab, then run:

```bash
cd backend
npx prisma migrate deploy
npx prisma db seed
```

---

## ✅ VERIFY

- Frontend: https://playbeat-digital.vercel.app
- Backend Health: https://playbeat-api.onrender.com/health
- API Test: https://playbeat-api.onrender.com/api/v1/categories

Default login:
- Email: `superadmin@playbeat.digital`
- Password: `admin123`

---

## 🔧 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Render build fails | Check that service is **Web Service** not **Static Site** |
| "npm start" not found | Make sure `backend/package.json` has `"start": "node dist/server.js"` |
| CORS errors | Update `FRONTEND_URL` in Render to match your Vercel URL |
| Database connection failed | Check `DATABASE_URL` is correct; allow all IPs in Neon |
| Prisma errors | Run `npx prisma generate` then `npx prisma migrate deploy` |

---

## 📁 PROJECT STRUCTURE

```
new1111/
├── frontend/          → Deploys to Vercel
│   ├── app/
│   ├── components/
│   └── .env.local
├── backend/           → Deploys to Render
│   ├── src/
│   ├── prisma/
│   └── package.json
├── render-deploy.sh   → Render deployment script
├── vercel-deploy.sh   → Vercel deployment script
└── DEPLOY.md          → This file
```
