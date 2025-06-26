# Docker Deployment Guide for Interview Prep Backend

This guide will help you deploy your backend application using Docker to avoid cold start issues.

## 🐳 Prerequisites

- Docker installed on your system
- Docker Compose (optional, for easier management)
- Your environment variables ready

## 📋 Environment Variables

Create a `.env` file in your project root with the following variables:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_API_KEY=your_google_api_key
```

## 🚀 Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

### Option 2: Using Docker directly

```bash
# Build the image
docker build -f Dockerfile.prod -t interview-prep-backend:latest .

# Run the container
docker run -d \
  --name interview-prep-backend \
  --restart unless-stopped \
  -p 5000:5000 \
  --env-file .env \
  -v $(pwd)/uploads:/app/uploads \
  interview-prep-backend:latest
```

### Option 3: Using the deployment script

```bash
# Make the script executable
chmod +x deploy.sh

# Run the deployment
./deploy.sh
```

## 🌐 Accessing Your Application

- **Local**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 📊 Monitoring

### Check container status

```bash
docker ps
```

### View logs

```bash
docker logs interview-prep-backend
```

### Monitor resource usage

```bash
docker stats interview-prep-backend
```

## 🔧 Useful Commands

```bash
# Stop the container
docker stop interview-prep-backend

# Start the container
docker start interview-prep-backend

# Restart the container
docker restart interview-prep-backend

# Remove the container
docker rm interview-prep-backend

# Remove the image
docker rmi interview-prep-backend:latest

# Execute commands inside the container
docker exec -it interview-prep-backend sh
```

## 🚀 Deployment Platforms

### Railway

1. Connect your GitHub repository
2. Railway will automatically detect the Dockerfile
3. Set your environment variables in Railway dashboard
4. Deploy!

### Render

1. Connect your GitHub repository
2. Choose "Docker" as the environment
3. Set your environment variables
4. Deploy!

### DigitalOcean App Platform

1. Connect your GitHub repository
2. Choose "Docker" as the source
3. Configure your environment variables
4. Deploy!

### AWS ECS/Fargate

1. Build and push your image to ECR
2. Create an ECS service
3. Configure environment variables
4. Deploy!

## 🔒 Security Features

- Non-root user execution
- Minimal Alpine Linux base image
- Health checks for monitoring
- Environment variable injection
- Volume mounting for persistent uploads

## 📈 Performance Benefits

- **No Cold Starts**: Container stays warm
- **Faster Response Times**: Consistent performance
- **Better Resource Utilization**: Efficient resource allocation
- **Scalability**: Easy horizontal scaling
- **Isolation**: Secure environment separation

## 🛠️ Troubleshooting

### Container won't start

```bash
# Check logs
docker logs interview-prep-backend

# Check if port is already in use
lsof -i :5000
```

### Health check failing

```bash
# Check if the application is responding
curl http://localhost:5000/api/health

# Check container logs
docker logs interview-prep-backend
```

### Environment variables not working

```bash
# Check environment variables in container
docker exec interview-prep-backend env

# Verify .env file format
cat .env
```

## 📝 Notes

- The application runs on port 5000 inside the container
- Uploads are persisted in the `./uploads` directory
- Health checks run every 30 seconds
- The container automatically restarts unless manually stopped
