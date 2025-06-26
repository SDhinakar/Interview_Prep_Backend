# Interview Prep Backend API

A Node.js backend API for an interview preparation application with AI-powered question generation and session management.

## 🚀 Features

- **User Authentication** - JWT-based authentication system
- **AI Integration** - Google Gemini AI for question generation and explanations
- **Session Management** - Track interview sessions and progress
- **File Upload** - Handle audio/video responses
- **MongoDB Database** - Persistent data storage
- **Docker Support** - Containerized deployment

## 🛠️ Tech Stack

- **Runtime**: Node.js 18
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **AI**: Google Gemini AI
- **File Upload**: Multer
- **Containerization**: Docker

## 📋 Prerequisites

- Node.js 18 or higher
- MongoDB database
- Google Gemini API key
- Docker (for containerized deployment)

## 🏠 Local Development

### Traditional Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:

   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_API_KEY=your_google_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Docker Setup (Recommended)

1. **Build and run with Docker Compose**

   ```bash
   docker-compose up -d
   ```

2. **Or build and run manually**

   ```bash
   # Build the image
   docker build -f Dockerfile.prod -t interview-prep-backend:latest .

   # Run the container
   docker run -d --name interview-prep-backend -p 5000:5000 --env-file .env interview-prep-backend:latest
   ```

## 🚀 Deployment

### Railway (Recommended - No Cold Starts)

1. **Connect to Railway**

   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Railway will automatically detect the Dockerfile

2. **Environment Variables**
   Set these in Railway dashboard:

   - `NODE_ENV=production`
   - `PORT=5000`
   - `MONGO_URI=your_mongodb_connection_string`
   - `JWT_SECRET=your_jwt_secret_key`
   - `GOOGLE_API_KEY=your_google_api_key`

3. **Deploy**
   - Railway will automatically build and deploy your Docker container
   - No cold start issues - container runs continuously

### Other Platforms

- **Render**: Choose "Docker" environment
- **DigitalOcean App Platform**: Select "Docker" as source
- **AWS ECS/Fargate**: Push to ECR and deploy

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Sessions

- `GET /api/sessions` - Get user sessions
- `POST /api/sessions` - Create new session
- `PUT /api/sessions/:id` - Update session

### Questions

- `GET /api/questions` - Get questions
- `POST /api/questions` - Create question

### AI Integration

- `POST /api/ai/generate-questions` - Generate interview questions
- `POST /api/ai/generate-explanation` - Generate concept explanations

### Interview

- `POST /api/interview/answers` - Submit interview answers
- `GET /api/interview/questions` - Get interview questions

### Health Check

- `GET /api/health` - Server health status

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Start production server
npm start

# Docker commands
docker-compose up -d          # Start with Docker Compose
docker-compose down           # Stop Docker Compose
docker logs interview-prep-backend  # View logs
docker restart interview-prep-backend  # Restart container
```

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   ├── aiController.js       # AI integration
│   ├── authController.js     # Authentication logic
│   └── interview/            # Interview-specific controllers
├── middlewares/
│   ├── authMiddleware.js     # JWT authentication
│   └── uploadMiddleware.js   # File upload handling
├── models/
│   ├── Question.js           # Question model
│   ├── Session.js            # Session model
│   ├── User.js               # User model
│   └── UserAnswer.js         # User answer model
├── routes/
│   ├── authRoutes.js         # Authentication routes
│   ├── sessionRoutes.js      # Session routes
│   └── interview/            # Interview-specific routes
├── uploads/                  # File upload directory
├── utils/
│   └── prompts.js            # AI prompts
├── Dockerfile                # Docker configuration
├── docker-compose.yml        # Docker Compose setup
└── server.js                 # Main server file
```

## 🔒 Security Features

- JWT-based authentication
- CORS configuration
- Environment variable protection
- Non-root Docker user
- Input validation and sanitization

## 📈 Performance Benefits

- **No Cold Starts**: Docker containers run continuously
- **Instant Responses**: No 10-15 second delays
- **Better Resource Utilization**: Efficient resource allocation
- **Scalability**: Easy horizontal scaling
- **Consistency**: Same environment across development and production

## 🛠️ Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Check your `MONGO_URI` in environment variables
   - Ensure MongoDB is accessible

2. **Docker Build Fails**

   - Check if Docker Desktop is running
   - Verify `.dockerignore` file excludes unnecessary files

3. **Environment Variables Not Working**

   - Ensure no spaces around `=` in `.env` file
   - Check variable names match exactly

4. **Port Already in Use**
   - Change port in `.env` file
   - Or stop existing process using port 5000

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Note**: This backend is designed to work with a frontend application. Make sure to update CORS settings if deploying to production.
