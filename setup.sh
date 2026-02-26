#!/bin/bash

# Employee Leave Management System - Setup Script
# This script automates the initial setup process

echo "🚀 Employee Leave Management System - Setup"
echo "==========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "📦 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js v16 or higher from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js ${NODE_VERSION} found${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm ${NPM_VERSION} found${NC}"

# Check if MongoDB is installed (optional)
if command -v mongod &> /dev/null; then
    MONGO_VERSION=$(mongod --version | head -n 1)
    echo -e "${GREEN}✅ MongoDB found${NC}"
else
    echo -e "${YELLOW}⚠️  MongoDB not found locally${NC}"
    echo "You can use MongoDB Atlas instead"
fi

echo ""
echo "📥 Installing dependencies..."
echo ""

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
if npm install; then
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi
cd ..

# Install frontend dependencies
echo ""
echo "Installing frontend dependencies..."
cd frontend
if npm install; then
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi
cd ..

# Setup environment file
echo ""
echo "⚙️  Setting up environment configuration..."
cd backend
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ Created .env file${NC}"
    echo -e "${YELLOW}⚠️  Please edit backend/.env and configure:${NC}"
    echo "   - MONGODB_URI (your MongoDB connection string)"
    echo "   - JWT_SECRET (a secure random string)"
else
    echo -e "${YELLOW}⚠️  .env file already exists${NC}"
fi
cd ..

echo ""
echo "✨ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Configure backend/.env with your MongoDB URI and JWT secret"
echo "2. Start MongoDB (if using local): brew services start mongodb-community"
echo "3. Seed the database: cd backend && npm run seed"
echo "4. Start backend: cd backend && npm run dev"
echo "5. Start frontend (new terminal): cd frontend && npm start"
echo ""
echo "📚 Documentation:"
echo "   - Quick Start: QUICKSTART.md"
echo "   - Full Setup: SETUP_CHECKLIST.md"
echo "   - Troubleshooting: TROUBLESHOOTING.md"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
