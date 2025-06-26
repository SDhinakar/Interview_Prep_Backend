#!/bin/bash

# Docker deployment script for Interview Prep Backend

echo "🚀 Starting Docker deployment..."

# Build the Docker image
echo "📦 Building Docker image..."
docker build -f Dockerfile.prod -t interview-prep-backend:latest .

# Stop and remove existing container if it exists
echo "🛑 Stopping existing container..."
docker stop interview-prep-backend 2>/dev/null || true
docker rm interview-prep-backend 2>/dev/null || true

# Run the new container
echo "▶️ Starting new container..."
docker run -d \
  --name interview-prep-backend \
  --restart unless-stopped \
  -p 5000:5000 \
  -e NODE_ENV=production \
  -e PORT=5000 \
  -e MONGO_URI="$MONGO_URI" \
  -e JWT_SECRET="$JWT_SECRET" \
  -e GOOGLE_API_KEY="$GOOGLE_API_KEY" \
  -v $(pwd)/uploads:/app/uploads \
  interview-prep-backend:latest

# Wait for container to start
echo "⏳ Waiting for container to start..."
sleep 5

# Check container status
echo "🔍 Checking container status..."
docker ps | grep interview-prep-backend

# Check health
echo "🏥 Checking application health..."
curl -f http://localhost:5000/api/health || echo "❌ Health check failed"

echo "✅ Deployment completed!"
echo "🌐 Your API is available at: http://localhost:5000" 