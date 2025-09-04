#!/bin/bash

# Railway Setup Verification Script
# Verifies that all Railway deployment requirements are met

set -e

echo "🔍 Verifying Railway deployment setup..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ERRORS=0

# Function to check file exists
check_file() {
    if [[ -f "$1" ]]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ $1 (missing)${NC}"
        ((ERRORS++))
    fi
}

# Function to check command exists
check_command() {
    if command -v "$1" &> /dev/null; then
        echo -e "${GREEN}✅ $1 installed${NC}"
    else
        echo -e "${RED}❌ $1 (not installed)${NC}"
        ((ERRORS++))
    fi
}

echo -e "${BLUE}📋 Checking required files...${NC}"
check_file "railway.json"
check_file "nixpacks.toml"
check_file "Dockerfile"
check_file ".railwayignore"
check_file ".env.railway.example"
check_file "app/api/health/route.ts"
check_file "lib/railway-config.ts"
check_file "RAILWAY_DEPLOYMENT.md"
check_file "RAILWAY_QUICKSTART.md"

echo -e "\n${BLUE}🛠️  Checking dependencies...${NC}"
check_command "node"
check_command "npm"

echo -e "\n${BLUE}📦 Checking package.json configuration...${NC}"
if grep -q '"@railway/cli"' package.json; then
    echo -e "${GREEN}✅ Railway CLI in devDependencies${NC}"
else
    echo -e "${YELLOW}⚠️  Railway CLI not in devDependencies (optional)${NC}"
fi

if grep -q '"deploy:railway"' package.json; then
    echo -e "${GREEN}✅ Railway deploy script configured${NC}"
else
    echo -e "${RED}❌ Railway deploy script missing${NC}"
    ((ERRORS++))
fi

echo -e "\n${BLUE}🔨 Testing build process...${NC}"
if npm run build &> /dev/null; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    ((ERRORS++))
fi

echo -e "\n${BLUE}🏥 Checking health endpoint...${NC}"
if [[ -f "app/api/health/route.ts" ]]; then
    if grep -q "getRailwayEnvironmentInfo" app/api/health/route.ts; then
        echo -e "${GREEN}✅ Health endpoint configured for Railway${NC}"
    else
        echo -e "${YELLOW}⚠️  Health endpoint basic (Railway info not included)${NC}"
    fi
fi

echo -e "\n${BLUE}⚙️  Checking Next.js configuration...${NC}"
if grep -q 'output.*standalone' next.config.mjs; then
    echo -e "${GREEN}✅ Standalone output enabled${NC}"
else
    echo -e "${RED}❌ Standalone output not configured${NC}"
    ((ERRORS++))
fi

echo -e "\n${BLUE}📝 Checking documentation...${NC}"
check_file "RAILWAY_DEPLOYMENT.md"
check_file "RAILWAY_QUICKSTART.md"

echo -e "\n${BLUE}🔐 Environment variables checklist...${NC}"
echo "Make sure you have these ready:"
echo "   🔹 Master Supabase project (URL, anon key, service key)"
echo "   🔹 Shared CMS Supabase project (URL, anon key, service key)"  
echo "   🔹 Vercel API token"
echo "   🔹 Bitbucket credentials (username, API token, workspace)"
echo "   🔹 Optional: Anthropic API key for AI features"

echo ""
if [[ $ERRORS -eq 0 ]]; then
    echo -e "${GREEN}🎉 Railway setup verification passed!${NC}"
    echo -e "${BLUE}Ready to deploy with: ./scripts/railway-deploy-complete.sh${NC}"
    exit 0
else
    echo -e "${RED}❌ Found $ERRORS error(s). Please fix them before deploying.${NC}"
    exit 1
fi
