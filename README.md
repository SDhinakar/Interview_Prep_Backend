# Interview Prep Backend API

A Node.js backend API for an interview preparation application with AI-powered question generation and session management.

## 🚀 Features

- **User Authentication** - JWT-based authentication system
- **AI Integration** - Google Gemini AI for question generation and explanations
- **Session Management** - Track interview sessions and progress
- **File Upload** - Handle audio/video responses
- **MongoDB Database** - Persistent data storage

## 🛠️ Tech Stack

- **Runtime**: Node.js 18
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **AI**: Google Gemini AI
- **File Upload**: Multer

## 📋 Prerequisites

- Node.js 18 or higher
- MongoDB database
- Google Gemini API key

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

## 🚀 Deployment

Deploy to your preferred Node.js hosting platform. Set the required environment variables as above.

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
└── server.js                 # Main server file
```

## 🔒 Security Features

- JWT-based authentication
- CORS configuration
- Environment variable protection
- Input validation and sanitization

## 📈 Performance Benefits

- **Instant Responses**: No 10-15 second delays
- **Better Resource Utilization**: Efficient resource allocation
- **Scalability**: Easy horizontal scaling
- **Consistency**: Same environment across development and production

## 🛠️ Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Check your `MONGO_URI` in environment variables
   - Ensure MongoDB is accessible

2. **Environment Variables Not Working**

   - Ensure no spaces around `=` in `.env` file
   - Check variable names match exactly

3. **Port Already in Use**
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
