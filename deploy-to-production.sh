#!/bin/bash
set -e

# ============================================================
# PLAYBEAT DIGITAL — AUTOMATED DEPLOYMENT SCRIPT
# Run this on YOUR local machine, not in a sandbox
# ============================================================

REPO="uzzirulzz-cyber/new1111"
GITHUB_TOKEN="YOUR_GITHUB_TOKEN_HERE"
VERCEL_TOKEN="YOUR_VERCEL_TOKEN_HERE"
RENDER_TOKEN="YOUR_RENDER_TOKEN_HERE"

echo "🚀 PlayBeat Digital Full-Stack Deployment"
echo "=========================================="

# ============================================================
# STEP 1: PUSH TO GITHUB
# ============================================================
echo ""
echo "📤 Step 1: Pushing to GitHub..."
git remote set-url origin https://${GITHUB_TOKEN}@github.com/${REPO}.git
git push origin main --force
echo "✅ Code pushed to GitHub"

# ============================================================
# STEP 2: DEPLOY BACKEND TO RENDER
# ============================================================
echo ""
echo "🖥️  Step 2: Deploying Backend to Render..."

# Check if Render CLI is installed
if ! command -v render &> /dev/null; then
    echo "Installing Render CLI..."
    curl -fsSL https://raw.githubusercontent.com/render-oss/render-cli/main/install.sh | bash
    export PATH="$HOME/.render/bin:$PATH"
fi

# Create/update web service via Render API
SERVICE_PAYLOAD=$(cat <<EOF
{
  "type": "web_service",
  "name": "playbeat-api",
  "ownerId": "usr-tyafWuDdQ6bdMH23d26AQv5apgOY",
  "repo": "https://github.com/${REPO}",
  "branch": "main",
  "rootDir": "backend",
  "runtime": "node",
  "plan": "starter",
  "buildFilter": {
    "paths": ["backend/**"]
  },
  "buildCommand": "npm install && npx prisma generate && npm run build",
  "startCommand": "npm start",
  "healthCheckPath": "/health",
  "envVars": [
    {"key": "NODE_ENV", "value": "production"},
    {"key": "PORT", "value": "10000"},
    {"key": "FRONTEND_URL", "value": "https://playbeat-digital.vercel.app"},
    {"key": "DATABASE_URL", "value": "postgresql://neondb_owner:npg_7PcHuOnXFyg5@ep-odd-butterfly-axizldmn-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"},
    {"key": "JWT_SECRET", "value": "playbeat-super-secret-jwt-key-min-32-chars-long-2024"},
    {"key": "JWT_REFRESH_SECRET", "value": "playbeat-refresh-secret-key-min-32-chars-long-2024"},
    {"key": "REDIS_HOST", "value": "localhost"},
    {"key": "REDIS_PORT", "value": "6379"}
  ]
}
EOF
)

curl -s -X POST   -H "Authorization: Bearer ${RENDER_TOKEN}"   -H "Content-Type: application/json"   -d "$SERVICE_PAYLOAD"   https://api.render.com/v1/services

echo "✅ Render service created/updated"

# ============================================================
# STEP 3: DEPLOY FRONTEND TO VERCEL
# ============================================================
echo ""
echo "🌐 Step 3: Deploying Frontend to Vercel..."

# Install Vercel CLI if not present
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm i -g vercel
fi

cd frontend

# Deploy with environment variables
vercel --token ${VERCEL_TOKEN} --prod --yes     --name playbeat-digital     --env NEXT_PUBLIC_API_URL=https://playbeat-api.onrender.com     --env NEXT_PUBLIC_APP_URL=https://playbeat-digital.vercel.app     --env NEXT_PUBLIC_SITE_NAME="PlayBeat Digital"

cd ..

echo ""
echo "🎉 DEPLOYMENT COMPLETE!"
echo "======================="
echo "🔗 Frontend: https://playbeat-digital.vercel.app"
echo "🔗 Backend:  https://playbeat-api.onrender.com"
echo ""
echo "⚠️  IMPORTANT: After Render deploys, run migrations:"
echo "   npx prisma migrate deploy"
echo "   npx prisma db seed"
