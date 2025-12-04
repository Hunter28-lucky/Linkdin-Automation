#!/bin/bash

echo "🔍 LinkedIn Automation - Final Verification"
echo "==========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

PASS=0
FAIL=0

check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} $2"
        ((PASS++))
    else
        echo -e "${RED}❌${NC} $2 - MISSING"
        ((FAIL++))
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅${NC} $2"
        ((PASS++))
    else
        echo -e "${RED}❌${NC} $2 - MISSING"
        ((FAIL++))
    fi
}

echo -e "${BLUE}📁 Checking Project Structure...${NC}"
echo ""

# Root Files
echo "Root Configuration:"
check_file "package.json" "package.json"
check_file "server.js" "server.js"
check_file ".env.example" ".env.example"
check_file ".gitignore" ".gitignore"
check_file "setup.sh" "setup.sh (executable)"
echo ""

# Documentation
echo "Documentation:"
check_file "README.md" "README.md"
check_file "QUICKSTART.md" "QUICKSTART.md"
check_file "USAGE.md" "USAGE.md"
check_file "API.md" "API.md"
check_file "STRUCTURE.md" "STRUCTURE.md"
check_file "PROJECT_SUMMARY.md" "PROJECT_SUMMARY.md"
echo ""

# Backend Directories
echo "Backend Directories:"
check_dir "services" "services/"
check_dir "routes" "routes/"
check_dir "utils" "utils/"
echo ""

# Backend Services
echo "Services:"
check_file "services/geminiService.js" "geminiService.js"
check_file "services/trendService.js" "trendService.js"
check_file "services/imageService.js" "imageService.js"
echo ""

# Backend Routes
echo "Routes:"
check_file "routes/generate.js" "generate.js"
check_file "routes/trends.js" "trends.js"
check_file "routes/images.js" "images.js"
check_file "routes/optimize.js" "optimize.js"
echo ""

# Utils
echo "Utilities:"
check_file "utils/linkedinAlgorithm.js" "linkedinAlgorithm.js"
echo ""

# Frontend Structure
echo "Frontend Structure:"
check_dir "client" "client/"
check_file "client/package.json" "client/package.json"
check_dir "client/src" "client/src/"
check_dir "client/public" "client/public/"
check_file "client/public/index.html" "client/public/index.html"
echo ""

# React Files
echo "React Core:"
check_file "client/src/index.js" "index.js"
check_file "client/src/index.css" "index.css"
check_file "client/src/App.js" "App.js"
check_file "client/src/App.css" "App.css"
echo ""

# React Components
echo "React Components:"
check_dir "client/src/components" "components/"
check_file "client/src/components/Header.js" "Header.js"
check_file "client/src/components/Header.css" "Header.css"
check_file "client/src/components/InputForm.js" "InputForm.js"
check_file "client/src/components/InputForm.css" "InputForm.css"
check_file "client/src/components/LoadingSpinner.js" "LoadingSpinner.js"
check_file "client/src/components/LoadingSpinner.css" "LoadingSpinner.css"
check_file "client/src/components/OutputDisplay.js" "OutputDisplay.js"
check_file "client/src/components/OutputDisplay.css" "OutputDisplay.css"
echo ""

# Check executable permissions
echo -e "${BLUE}🔐 Checking Permissions...${NC}"
if [ -x "setup.sh" ]; then
    echo -e "${GREEN}✅${NC} setup.sh is executable"
    ((PASS++))
else
    echo -e "${RED}❌${NC} setup.sh is not executable"
    ((FAIL++))
fi
echo ""

# Check Node.js
echo -e "${BLUE}⚙️  Checking System Requirements...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅${NC} Node.js ${NODE_VERSION}"
    ((PASS++))
else
    echo -e "${RED}❌${NC} Node.js not found"
    ((FAIL++))
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✅${NC} npm ${NPM_VERSION}"
    ((PASS++))
else
    echo -e "${RED}❌${NC} npm not found"
    ((FAIL++))
fi
echo ""

# Count files
echo -e "${BLUE}📊 Project Statistics...${NC}"
JS_FILES=$(find . -name "*.js" -not -path "*/node_modules/*" | wc -l | tr -d ' ')
CSS_FILES=$(find . -name "*.css" -not -path "*/node_modules/*" | wc -l | tr -d ' ')
MD_FILES=$(find . -name "*.md" | wc -l | tr -d ' ')
TOTAL_FILES=$((JS_FILES + CSS_FILES + MD_FILES))

echo "JavaScript files: ${JS_FILES}"
echo "CSS files: ${CSS_FILES}"
echo "Documentation files: ${MD_FILES}"
echo "Total core files: ${TOTAL_FILES}"
echo ""

# Final Summary
TOTAL=$((PASS + FAIL))
PERCENT=$((PASS * 100 / TOTAL))

echo "==========================================="
echo -e "${BLUE}📋 VERIFICATION SUMMARY${NC}"
echo "==========================================="
echo -e "Total Checks: ${TOTAL}"
echo -e "${GREEN}Passed: ${PASS}${NC}"
echo -e "${RED}Failed: ${FAIL}${NC}"
echo -e "Success Rate: ${PERCENT}%"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}🎉 ALL CHECKS PASSED!${NC}"
    echo ""
    echo "✅ Project is complete and ready to use!"
    echo ""
    echo "Next steps:"
    echo "1. Run: ./setup.sh"
    echo "2. Get Gemini API key: https://makersuite.google.com/app/apikey"
    echo "3. Add key to .env file"
    echo "4. Run: npm run dev:full"
    echo ""
else
    echo -e "${YELLOW}⚠️  Some checks failed${NC}"
    echo "Please review the issues above"
fi

echo "==========================================="
