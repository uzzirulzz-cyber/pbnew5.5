#!/bin/bash
# Simple Render deployment via curl
# Usage: ./render-deploy.sh

RENDER_TOKEN="rnd_Rw95UAgAjUiGXoA8dGfY9zDGPfdS"

echo "Creating Render Web Service..."

curl -X POST https://api.render.com/v1/services   -H "Authorization: Bearer $RENDER_TOKEN"   -H "Content-Type: application/json"   -d '{
    "type": "web_service",
    "name": "playbeat-api",
    "repo": "https://github.com/uzzirulzz-cyber/new1111",
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
      {"key":"DATABASE_URL","value":"postgresql://neondb_owner:npg_7PcHuOnXFyg5@ep-odd-butterfly-axizldmn-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"},
      {"key":"JWT_SECRET","value":"playbeat-super-secret-key-32chars-long"},
      {"key":"JWT_REFRESH_SECRET","value":"playbeat-refresh-secret-key-32chars"}
    ]
  }'
