#!/bin/bash
# Simple Render deployment via curl
# Usage: ./render-deploy.sh

if [ -z "$RENDER_TOKEN" ] || [ -z "$DATABASE_URL" ] || [ -z "$JWT_SECRET" ] || [ -z "$JWT_REFRESH_SECRET" ]; then
  echo "Set RENDER_TOKEN, DATABASE_URL, JWT_SECRET, and JWT_REFRESH_SECRET in your environment before running this script."
  exit 1
fi

echo "Creating Render Web Service..."

payload=$(python3 - <<'PY'
import json
import os

print(json.dumps({
    "type": "web_service",
    "name": "playbeat-api",
    "repo": "https://github.com/uzzirulzz-cyber/pbnew5.5",
    "branch": "main",
    "rootDir": "backend",
    "runtime": "node",
    "plan": "starter",
    "buildCommand": "npm install && npx prisma generate && npm run build",
    "startCommand": "npm start",
    "envVars": [
      {"key":"NODE_ENV","value":"production"},
      {"key":"PORT","value":"10000"},
      {"key":"FRONTEND_URL","value":"https://playbeat-digital.vercel.app"},
      {"key":"DATABASE_URL","value":os.environ["DATABASE_URL"]},
      {"key":"JWT_SECRET","value":os.environ["JWT_SECRET"]},
      {"key":"JWT_REFRESH_SECRET","value":os.environ["JWT_REFRESH_SECRET"]}
    ]
}))
PY
)

curl -X POST https://api.render.com/v1/services \
  -H "Authorization: Bearer $RENDER_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$payload"
