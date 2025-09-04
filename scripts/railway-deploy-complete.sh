#!/bin/bash

# Complete Railway Deployment Script
# This script handles the full deployment process including environment setup

set -e

echo "🚂 Complete Railway Deployment for Master Dashboard"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Function to print section headers
print_section() {
    echo -e "\n${PURPLE}=== $1 ===${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

print_section "Pre-flight Checks"

# Check Railway CLI
if ! command_exists railway; then
    echo -e "${YELLOW}Installing Railway CLI...${NC}"
    npm install -g @railway/cli
fi

# Check login status
if ! railway whoami &> /dev/null; then
    echo -e "${RED}❌ Not logged in to Railway${NC}"
    echo -e "${BLUE}Please run: railway login${NC}"
    exit 1
fi

RAILWAY_USER=$(railway whoami)
echo -e "${GREEN}✅ Logged in as: $RAILWAY_USER${NC}"

print_section "Environment Variables Check"

# Check if .env.railway.example exists
if [[ ! -f ".env.railway.example" ]]; then
    echo -e "${RED}❌ .env.railway.example not found${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Environment variables template found${NC}"
echo -e "${YELLOW}⚠️  Make sure to set these variables in Railway:${NC}"

# Extract required variables from the example file
grep -E "^[A-Z_]+=.*" .env.railway.example | grep -v "^#" | cut -d'=' -f1 | while read -r var; do
    echo "   - $var"
done

print_section "Project Setup"

# Check if Railway project exists
if railway status &> /dev/null; then
    echo -e "${GREEN}✅ Railway project already linked${NC}"
    railway status
else
    echo -e "${YELLOW}⚠️  No Railway project found. Creating new project...${NC}"
    railway init
fi

print_section "Build Test"

echo -e "${BLUE}🔨 Testing local build...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed. Please fix errors before deploying.${NC}"
    exit 1
fi

print_section "Deployment"

echo -e "${BLUE}🚀 Deploying to Railway...${NC}"
railway up --detach

print_section "Post-Deployment"

echo -e "${BLUE}⏳ Waiting for deployment to complete...${NC}"
sleep 10

# Get deployment URL
DEPLOYMENT_URL=$(railway domain 2>/dev/null || echo "URL will be available after deployment completes")

echo -e "${GREEN}✅ Deployment initiated successfully!${NC}"
echo ""
echo -e "${BLUE}📱 Dashboard URL:${NC} $DEPLOYMENT_URL"
echo ""

print_section "Health Check"

if [[ "$DEPLOYMENT_URL" != "URL will be available after deployment completes" ]]; then
    echo -e "${BLUE}🏥 Testing health endpoint...${NC}"
    
    # Wait a bit more for the service to be fully ready
    sleep 15
    
    if curl -f "${DEPLOYMENT_URL}/api/health" &> /dev/null; then
        echo -e "${GREEN}✅ Health check passed${NC}"
    else
        echo -e "${YELLOW}⚠️  Health check failed - service may still be starting${NC}"
        echo -e "${BLUE}💡 Check logs with: railway logs${NC}"
    fi
fi

print_section "Next Steps"

echo -e "${GREEN}🎉 Master Dashboard deployed successfully!${NC}"
echo ""
echo -e "${YELLOW}📋 Complete these steps:${NC}"
echo "1. 🔧 Set environment variables in Railway dashboard"
echo "2. 🏥 Test health endpoint: $DEPLOYMENT_URL/api/health"
echo "3. 🧪 Create a test CMS instance to verify functionality"
echo "4. 🌐 Set up custom domain (optional)"
echo "5. 📊 Configure monitoring and alerts"
echo ""
echo -e "${BLUE}📖 Commands for monitoring:${NC}"
echo "   railway logs          - View application logs"
echo "   railway status        - Check service status"
echo "   railway variables     - View environment variables"
echo "   railway open          - Open Railway dashboard"
echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
