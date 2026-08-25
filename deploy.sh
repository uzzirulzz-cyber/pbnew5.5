#!/bin/bash
# ═══════════════════════════════════════════════════════════════
#  PLAYBEAT DIGITAL — ONE-COMMAND DEPLOYMENT
#  Run this script on your local machine (Mac/Linux/WSL)
# ═══════════════════════════════════════════════════════════════

set -e

# ─── CONFIG ───
REPO="uzzirulzz-cyber/new1111"
GITHUB_TOKEN="YOUR_GITHUB_TOKEN_HERE"
VERCEL_TOKEN="YOUR_VERCEL_TOKEN_HERE"
RENDER_TOKEN="YOUR_RENDER_TOKEN_HERE"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() { echo -e "${BLUE}[PLAYBEAT]${NC} $1"; }
success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

# ─── STEP 0: CHECK DEPENDENCIES ───
log "Checking dependencies..."
for cmd in git curl node npm; do
  if ! command -v $cmd &> /dev/null; then
    error "$cmd is required but not installed."
    exit 1
  fi
done
success "All dependencies found"

# ─── STEP 1: PUSH TO GITHUB ───
log "Pushing latest code to GitHub..."
git add . 2>/dev/null || true
git commit -m "deploy: Auto-deploy $(date -u +%Y-%m-%d-%H:%M)" 2>/dev/null || true
git push https://${GITHUB_TOKEN}@github.com/${REPO}.git main --force
success "Code pushed to GitHub"

# ─── STEP 2: DEPLOY BACKEND TO RENDER ───
echo ""
log "═══════════════════════════════════════════════════════"
log "  DEPLOYING BACKEND TO RENDER"
log "═══════════════════════════════════════════════════════"

# Check if service exists
RENDER_RESPONSE=$(curl -s --max-time 15   -H "Authorization: Bearer ${RENDER_TOKEN}"   -H "Accept: application/json"   "https://api.render.com/v1/services?name=playbeat-api&limit=1" || echo "{}")

SERVICE_ID=$(echo "$RENDER_RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('service',[{}])[0].get('id',''))" 2>/dev/null || echo "")

if [ -z "$SERVICE_ID" ]; then
  warn "No existing 'playbeat-api' service found."
  warn "Creating new Web Service via Render API..."

  # Create service via API
  CREATE_PAYLOAD='{
    "type": "web_service",
    "name": "playbeat-api",
    "ownerId": "usr-uzzirulzz-cyber",
    "repo": "https://github.com/uzzirulzz-cyber/new1111",
    "branch": "main",
    "rootDir": "backend",
    "runtime": "node",
    "plan": "starter",
    "buildCommand": "npm install && npx prisma generate && npm run build",
    "startCommand": "npm start",
    "healthCheckPath": "/health",
    "envVars": [
      {"key":"NODE_ENV","value":"production"},
      {"key":"PORT","value":"10000"},
      {"key":"FRONTEND_URL","value":"https://playbeat-digital.vercel.app"},
      {"key":"DATABASE_URL","value":"postgresql://neondb_owner:npg_7PcHuOnXFyg5@ep-odd-butterfly-axizldmn-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"},
      {"key":"JWT_SECRET","value":"playbeat-super-secret-jwt-key-2024-change-me"},
      {"key":"JWT_REFRESH_SECRET","value":"playbeat-refresh-secret-key-2024-change-me"}
    ]
  }'

  CREATE_RESPONSE=$(curl -s --max-time 30 -X POST     -H "Authorization: Bearer ${RENDER_TOKEN}"     -H "Content-Type: application/json"     -d "$CREATE_PAYLOAD"     "https://api.render.com/v1/services" || echo "{}")

  SERVICE_ID=$(echo "$CREATE_RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('service',{}).get('id',''))" 2>/dev/null || echo "")

  if [ -n "$SERVICE_ID" ]; then
    success "Render service created! ID: $SERVICE_ID"
  else
    error "Failed to create Render service."
    error "Response: $CREATE_RESPONSE"
    echo ""
    warn "FALLBACK: Please create manually:"
    warn "  1. Go to https://dashboard.render.com"
    warn "  2. Click 'New +' → 'Web Service'"
    warn "  3. Connect: github.com/uzzirulzz-cyber/new1111"
    warn "  4. Root Directory: backend"
    warn "  5. Build: npm install && npx prisma generate && npm run build"
    warn "  6. Start: npm start"
    warn "  7. Add env vars from backend/.env.example"
  fi
else
  success "Found existing Render service: $SERVICE_ID"
  log "Triggering deployment..."

  DEPLOY_RESPONSE=$(curl -s --max-time 15 -X POST     -H "Authorization: Bearer ${RENDER_TOKEN}"     -H "Content-Type: application/json"     "https://api.render.com/v1/services/${SERVICE_ID}/deploys" || echo "{}")

  DEPLOY_ID=$(echo "$DEPLOY_RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('deploy',{}).get('id',''))" 2>/dev/null || echo "")

  if [ -n "$DEPLOY_ID" ]; then
    success "Render deployment triggered! Deploy ID: $DEPLOY_ID"
  else
    warn "Could not trigger auto-deploy. Render will auto-deploy on push."
  fi
fi

# ─── STEP 3: DEPLOY FRONTEND TO VERCEL ───
echo ""
log "═══════════════════════════════════════════════════════"
log "  DEPLOYING FRONTEND TO VERCEL"
log "═══════════════════════════════════════════════════════"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  log "Installing Vercel CLI..."
  npm install -g vercel@latest
fi

cd frontend

# Link project if not already linked
if [ ! -d ".vercel" ]; then
  log "Linking Vercel project..."
  vercel link --token "$VERCEL_TOKEN" --yes --project playbeat-digital 2>/dev/null ||   vercel --token "$VERCEL_TOKEN" --yes
fi

# Set environment variables
log "Setting Vercel environment variables..."
vercel env add NEXT_PUBLIC_API_URL production --token "$VERCEL_TOKEN" <<< "https://playbeat-api.onrender.com" 2>/dev/null || true
vercel env add NEXT_PUBLIC_APP_URL production --token "$VERCEL_TOKEN" <<< "https://playbeat-digital.vercel.app" 2>/dev/null || true
vercel env add NEXT_PUBLIC_SITE_NAME production --token "$VERCEL_TOKEN" <<< "PlayBeat Digital" 2>/dev/null || true

# Deploy
log "Building and deploying..."
vercel --prod --token "$VERCEL_TOKEN" --yes

cd ..

success "Frontend deployed to Vercel!"

# ─── DONE ───
echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                   🎉 DEPLOYMENT COMPLETE                       ║"
echo "╠═══════════════════════════════════════════════════════════════╣"
echo "║                                                               ║"
echo "║  🌐 Frontend: https://playbeat-digital.vercel.app             ║"
echo "║  🖥️  Backend:  https://playbeat-api.onrender.com              ║"
echo "║                                                               ║"
echo "║  📊 Render Dashboard:                                         ║"
echo "║     https://dashboard.render.com/web/srv-playbeat-api         ║"
echo "║                                                               ║"
echo "║  ⚡ Next push will auto-deploy via GitHub Actions!            ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
