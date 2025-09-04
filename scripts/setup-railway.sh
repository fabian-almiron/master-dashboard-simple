#!/bin/bash

# Railway Setup Script for Master Dashboard
# This script helps set up the Railway deployment environment

set -e

echo "🚂 Setting up Railway deployment for Master Dashboard..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check dependencies
echo -e "${BLUE}📋 Checking dependencies...${NC}"

# Check Node.js
if command_exists node; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js found: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js not found. Please install Node.js 18+${NC}"
    exit 1
fi

# Check npm
if command_exists npm; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✅ npm found: $NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm not found. Please install npm${NC}"
    exit 1
fi

# Install Railway CLI if not present
if ! command_exists railway; then
    echo -e "${YELLOW}⚠️  Railway CLI not found. Installing...${NC}"
    npm install -g @railway/cli
    echo -e "${GREEN}✅ Railway CLI installed${NC}"
else
    RAILWAY_VERSION=$(railway --version)
    echo -e "${GREEN}✅ Railway CLI found: $RAILWAY_VERSION${NC}"
fi

# Check if logged in to Railway
echo -e "${BLUE}🔐 Checking Railway authentication...${NC}"
if railway whoami &> /dev/null; then
    RAILWAY_USER=$(railway whoami)
    echo -e "${GREEN}✅ Logged in to Railway as: $RAILWAY_USER${NC}"
else
    echo -e "${YELLOW}⚠️  Not logged in to Railway${NC}"
    echo -e "${BLUE}Please run: railway login${NC}"
    exit 1
fi

# Install project dependencies
echo -e "${BLUE}📦 Installing project dependencies...${NC}"
npm install --legacy-peer-deps

# Check for required configuration files
echo -e "${BLUE}📄 Checking configuration files...${NC}"

required_files=(
    "railway.json"
    "nixpacks.toml" 
    "Dockerfile"
    ".env.railway.example"
    "RAILWAY_DEPLOYMENT.md"
)

for file in "${required_files[@]}"; do
    if [[ -f "$file" ]]; then
        echo -e "${GREEN}✅ $file found${NC}"
    else
        echo -e "${RED}❌ $file missing${NC}"
        exit 1
    fi
done

# Test local build
echo -e "${BLUE}🔨 Testing local build...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ Local build successful${NC}"
else
    echo -e "${RED}❌ Local build failed. Please fix build errors first.${NC}"
    exit 1
fi

# Check environment variables template
echo -e "${BLUE}🔧 Environment variables setup...${NC}"
if [[ -f ".env.railway.example" ]]; then
    echo -e "${GREEN}✅ Environment variables template found${NC}"
    echo -e "${YELLOW}📋 Required environment variables:${NC}"
    echo "   - NEXT_PUBLIC_MASTER_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY" 
    echo "   - MASTER_SUPABASE_SERVICE_ROLE_KEY"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "   - SUPABASE_SERVICE_ROLE_KEY"
    echo "   - VERCEL_TOKEN"
    echo "   - BITBUCKET_USERNAME"
    echo "   - BITBUCKET_API_TOKEN"
    echo "   - BITBUCKET_WORKSPACE"
    echo "   - BITBUCKET_MASTER_REPO"
    echo ""
    echo -e "${BLUE}💡 Set these in Railway dashboard or use Railway CLI:${NC}"
    echo "   railway variables set VARIABLE_NAME=value"
fi

echo -e "${GREEN}✅ Railway setup complete!${NC}"
echo ""
echo -e "${BLUE}🚀 Next steps:${NC}"
echo "1. Set environment variables in Railway dashboard"
echo "2. Run: railway init (if not already done)"
echo "3. Run: railway up"
echo "4. Test deployment at the provided URL"
echo ""
echo -e "${YELLOW}📖 For detailed instructions, see RAILWAY_DEPLOYMENT.md${NC}"
