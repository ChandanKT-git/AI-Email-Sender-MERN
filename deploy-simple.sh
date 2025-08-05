#!/bin/bash

echo "🚀 Deploying AI Email Sender..."

# Install dependencies
echo "📦 Installing dependencies..."
cd server && npm install
cd ../client && npm install
cd ..

# Build the React app
echo "🔨 Building React app..."
cd client && npm run build
cd ..

echo "✅ Build complete! Ready for deployment."
echo ""
echo "Next steps:"
echo "1. Push to GitHub: git add . && git commit -m 'Deploy ready' && git push"
echo "2. Deploy on Render.com using the render.yaml configuration"
echo "3. Set environment variables: GROQ_API_KEY, EMAIL_ID, EMAIL_PASS"