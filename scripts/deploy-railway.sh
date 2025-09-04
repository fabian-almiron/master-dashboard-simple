#!/bin/bash

# Railway Deployment Script for Master Dashboard
# This script automates the Railway deployment process

set -e

echo "🚀 Starting Railway deployment for Master Dashboard..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo -e "${RED}❌ Railway CLI not found. Installing...${NC}"
    npm install -g @railway/cli
fi

# Check if logged in to Railway
if ! railway whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Railway. Please login first:${NC}"
    echo "railway login"
    exit 1
fi

echo -e "${BLUE}📋 Pre-deployment checklist:${NC}"

# Check for required files
required_files=("package.json" "next.config.mjs" "railway.json" "nixpacks.toml")
for file in "${required_files[@]}"; do
    if [[ -f "$file" ]]; then
        echo -e "${GREEN}✅ $file found${NC}"
    else
        echo -e "${RED}❌ $file missing${NC}"
        exit 1
    fi
done

# Check for environment variables template
if [[ -f ".env.railway.example" ]]; then
    echo -e "${GREEN}✅ Environment variables template found${NC}"
    echo -e "${YELLOW}⚠️  Make sure to set all environment variables in Railway dashboard${NC}"
else
    echo -e "${RED}❌ .env.railway.example missing${NC}"
    exit 1
fi

# Build the application locally first to catch any issues
echo -e "${BLUE}🔨 Building application locally...${NC}"
npm run build

if [[ $? -eq 0 ]]; then
    echo -e "${GREEN}✅ Local build successful${NC}"
else
    echo -e "${RED}❌ Local build failed. Fix build errors before deploying.${NC}"
    exit 1
fi

# Check if Railway project is linked
if railway status &> /dev/null; then
    echo -e "${GREEN}✅ Railway project linked${NC}"
else
    echo -e "${YELLOW}⚠️  No Railway project linked. Linking to existing project or creating new one...${NC}"
    railway init
fi

# Deploy to Railway
echo -e "${BLUE}🚀 Deploying to Railway...${NC}"
railway up

# Check deployment status
echo -e "${BLUE}📊 Checking deployment status...${NC}"
railway status

echo -e "${GREEN}✅ Deployment completed!${NC}"
echo -e "${BLUE}📱 Access your dashboard at:${NC}"
railway domain

echo -e "${YELLOW}📋 Post-deployment checklist:${NC}"
echo "1. Set all environment variables in Railway dashboard"
echo "2. Test the health endpoint: /api/health"
echo "3. Create a test CMS instance to verify the full flow"
echo "4. Set up custom domain (optional)"
echo "5. Configure monitoring and alerts"

echo -e "${GREEN}🎉 Master Dashboard is now deployed on Railway!${NC}"
