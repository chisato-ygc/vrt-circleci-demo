#!/bin/bash
# Quick Start Script for VRT CircleCI Demo

echo "🎨 VRT CircleCI Demo - Quick Start"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo -e "${BLUE}📦 Creating Python virtual environment...${NC}"
    python3 -m venv venv
fi

# Activate virtual environment
echo -e "${BLUE}🔌 Activating virtual environment...${NC}"
source venv/bin/activate

# Install Python dependencies
echo -e "${BLUE}📥 Installing Python dependencies...${NC}"
pip install -q -r requirements.txt

# Install Node dependencies
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📥 Installing Node.js dependencies...${NC}"
    npm install --silent
fi

# Install Playwright browsers if needed
if [ ! -d "$HOME/.cache/ms-playwright" ]; then
    echo -e "${BLUE}🌐 Installing Playwright browsers (this may take a few minutes)...${NC}"
    npx playwright install
fi

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${YELLOW}📚 Available Commands:${NC}"
echo ""
echo "  Start Flask app:"
echo "    python app/app.py"
echo ""
echo "  Run VRT tests:"
echo "    npm test"
echo ""
echo "  Generate baseline screenshots:"
echo "    npm run update-snapshots"
echo ""
echo "  View test report:"
echo "    npm run report"
echo ""
echo -e "${YELLOW}🌐 URLs:${NC}"
echo "  Homepage:  http://localhost:5000/"
echo "  Dashboard: http://localhost:5000/dashboard"
echo "  Profile:   http://localhost:5000/profile"
echo ""
echo -e "${GREEN}Happy testing! 🎉${NC}"

