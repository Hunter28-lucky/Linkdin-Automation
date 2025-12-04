#!/bin/bash

# LinkedIn Automation - Installation Verification Script
# Checks if all required files and dependencies are in place

echo "🔍 LinkedIn Viral Automation - Installation Check"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

TOTAL_CHECKS=0
PASSED_CHECKS=0

check_file() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} $1"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
    else
        echo -e "${RED}❌${NC} $1 ${RED}(MISSING)${NC}"
    fi
}

check_dir() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅${NC} $1/"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
    else
        echo -e "${RED}❌${NC} $1/ ${RED}(MISSING)${NC}"
    fi
}

# Check documentation files
echo -e "${BLUE}📚 Documentation Files:${NC}"
check_file "README.md"
check_file "QUICKSTART.md"
check_file "USAGE.md"
check_file "API.md"
check_file "STRUCTURE.md"
check_file "ARCHITECTURE.md"
check_file "PROJECT_SUMMARY.md"
check_file "GET_STARTED.md"
echo ""

# Check configuration files
echo -e "${BLUE}⚙️  Configuration Files:${NC}"
check_file "package.json"
check_file ".env.example"
check_file ".gitignore"
check_file "setup.sh"
echo ""

# Check backend files
echo -e "${BLUE}🔧 Backend Files:${NC}"
check_file "server.js"
check_dir "services"
check_file "services/geminiService.js"
check_file "services/trendService.js"
check_file "services/imageService.js"
check_dir "routes"
check_file "routes/generate.js"
check_file "routes/trends.js"
check_file "routes/images.js"
check_file "routes/optimize.js"
check_dir "utils"
check_file "utils/linkedinAlgorithm.js"
echo ""

# Check frontend files
echo -e "${BLUE}🎨 Frontend Files:${NC}"
check_dir "client"
check_file "client/package.json"
check_dir "client/public"
check_file "client/public/index.html"
check_dir "client/src"
check_file "client/src/index.js"
check_file "client/src/index.css"
check_file "client/src/App.js"
check_file "client/src/App.css"
echo ""

# Check components
echo -e "${BLUE}🧩 React Components:${NC}"
check_dir "client/src/components"
check_file "client/src/components/Header.js"
check_file "client/src/components/Header.css"
check_file "client/src/components/InputForm.js"
check_file "client/src/components/InputForm.css"
check_file "client/src/components/LoadingSpinner.js"
check_file "client/src/components/LoadingSpinner.css"
check_file "client/src/components/OutputDisplay.js"
check_file "client/src/components/OutputDisplay.css"
echo ""

# Check Node.js
echo -e "${BLUE}🟢 Runtime Environment:${NC}"
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅${NC} Node.js $NODE_VERSION"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${RED}❌${NC} Node.js ${RED}(NOT INSTALLED)${NC}"
fi

TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✅${NC} npm $NPM_VERSION"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${RED}❌${NC} npm ${RED}(NOT INSTALLED)${NC}"
fi
echo ""

# Check if dependencies are installed
echo -e "${BLUE}📦 Dependencies:${NC}"
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅${NC} Backend dependencies installed"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${YELLOW}⚠️${NC}  Backend dependencies ${YELLOW}(Run: npm install)${NC}"
fi

TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
if [ -d "client/node_modules" ]; then
    echo -e "${GREEN}✅${NC} Frontend dependencies installed"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${YELLOW}⚠️${NC}  Frontend dependencies ${YELLOW}(Run: cd client && npm install)${NC}"
fi
echo ""

# Check environment configuration
echo -e "${BLUE}🔑 Environment Configuration:${NC}"
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
if [ -f ".env" ]; then
    echo -e "${GREEN}✅${NC} .env file exists"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
    
    if grep -q "GEMINI_API_KEY=" .env; then
        if grep -q "GEMINI_API_KEY=your" .env; then
            echo -e "${YELLOW}⚠️${NC}  GEMINI_API_KEY ${YELLOW}(NEEDS TO BE CONFIGURED)${NC}"
        else
            echo -e "${GREEN}✅${NC} GEMINI_API_KEY configured"
        fi
    else
        echo -e "${RED}❌${NC} GEMINI_API_KEY ${RED}(NOT FOUND IN .env)${NC}"
    fi
else
    echo -e "${YELLOW}⚠️${NC}  .env file ${YELLOW}(Run: cp .env.example .env)${NC}"
fi
echo ""

# Summary
echo "=================================================="
echo -e "${BLUE}📊 VERIFICATION SUMMARY${NC}"
echo "=================================================="
echo ""
echo -e "Total Checks: $TOTAL_CHECKS"
echo -e "${GREEN}Passed: $PASSED_CHECKS${NC}"
echo -e "${RED}Failed: $((TOTAL_CHECKS - PASSED_CHECKS))${NC}"
echo ""

PERCENTAGE=$((PASSED_CHECKS * 100 / TOTAL_CHECKS))
echo -e "Completion: ${GREEN}$PERCENTAGE%${NC}"
echo ""

if [ $PASSED_CHECKS -eq $TOTAL_CHECKS ]; then
    echo -e "${GREEN}🎉 PERFECT! Everything is installed correctly!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Make sure GEMINI_API_KEY is configured in .env"
    echo "2. Run: npm run dev:full"
    echo "3. Open: http://localhost:3000"
    echo ""
elif [ $PERCENTAGE -ge 80 ]; then
    echo -e "${YELLOW}⚠️  Almost there! A few items need attention.${NC}"
    echo ""
    echo "Please:"
    echo "1. Install missing dependencies if needed"
    echo "2. Configure .env file with your Gemini API key"
    echo "3. Run: ./setup.sh"
    echo ""
else
    echo -e "${RED}❌ Installation incomplete. Please run setup.${NC}"
    echo ""
    echo "Run:"
    echo "  chmod +x setup.sh"
    echo "  ./setup.sh"
    echo ""
fi

echo "=================================================="
