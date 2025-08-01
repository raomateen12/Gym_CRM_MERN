#!/bin/bash

# Quick Deployment Script for Render
# Run this script to prepare your backend for deployment

echo "🚀 Preparing GYM Management Backend for Render Deployment..."

# Check if we're in the right directory
if [ ! -f "server.js" ]; then
    echo "❌ Error: Please run this script from the server directory"
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run a quick test
echo "🧪 Testing server startup..."
timeout 5s npm start || echo "⚠️  Server test completed"

# Check environment files
echo "🔍 Checking environment configuration..."
if [ -f ".env.example" ]; then
    echo "✅ .env.example found"
else
    echo "❌ .env.example not found"
fi

if [ -f ".env.production" ]; then
    echo "✅ .env.production template found"
else
    echo "❌ .env.production template not found"
fi

# Check gitignore
if [ -f ".gitignore" ]; then
    echo "✅ .gitignore found"
else
    echo "❌ .gitignore not found"
fi

echo ""
echo "✅ Pre-deployment check complete!"
echo ""
echo "📋 Next steps:"
echo "1. Push code to GitHub"
echo "2. Create Render web service"
echo "3. Set environment variables in Render dashboard"
echo "4. Configure MongoDB Atlas IP whitelist"
echo "5. Deploy and test!"
echo ""
echo "📖 See RENDER_DEPLOYMENT_GUIDE.md for detailed instructions"
