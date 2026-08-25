#!/bin/bash
# Vercel deployment
# Usage: ./vercel-deploy.sh

VERCEL_TOKEN="YOUR_VERCEL_TOKEN_HERE"

cd frontend

if ! command -v vercel &> /dev/null; then
    npm i -g vercel
fi

vercel --token $VERCEL_TOKEN --prod --yes     --name playbeat-digital     --env NEXT_PUBLIC_API_URL=https://playbeat-api.onrender.com     --env NEXT_PUBLIC_APP_URL=https://playbeat-digital.vercel.app
