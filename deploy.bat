@echo off
REM PlayBeat Digital Deployment Script for Windows
REM Run this in Command Prompt or PowerShell

echo [PLAYBEAT] Starting deployment...

REM Step 1: Push to GitHub
git add .
git commit -m "deploy: Auto-deploy %date% %time%" 2>nul || echo No changes to commit
git push https://YOUR_GITHUB_TOKEN_HERE@github.com/uzzirulzz-cyber/new1111.git main --force

echo [SUCCESS] Code pushed to GitHub

REM Step 2: Deploy Frontend to Vercel
cd frontend

if not exist .vercel (
    echo [PLAYBEAT] Linking Vercel project...
    call npx vercel --token YOUR_VERCEL_TOKEN_HERE --yes
)

echo [PLAYBEAT] Deploying to Vercel...
call npx vercel --prod --token YOUR_VERCEL_TOKEN_HERE --yes

cd ..

echo [SUCCESS] Frontend deployed!
echo.
echo === DEPLOYMENT COMPLETE ===
echo Frontend: https://playbeat-digital.vercel.app
echo.
echo For backend, go to https://dashboard.render.com
echo and create a Web Service from this repo.
