# 🏋️ GYM Management System - Backend

A secure, scalable backend API for gym management with role-based access control, comprehensive user management, and fitness tracking capabilities.

## 🚀 Live Demo
- **Backend API**: [Deploy on Render](https://render.com)
- **API Documentation**: Available at `/api/health` endpoint

## 📋 Features

### 🔐 Authentication & Security
- JWT-based authentication with HTTP-only cookies
- Role-based access control (Admin, Trainer, Member)
- Password hashing with bcrypt
- XSS protection and input sanitization
- Rate limiting and CORS configuration

### 👥 User Management
- User registration and login
- Role-based dashboards
- Profile management
- Admin panel for user control

### 💪 Fitness Features
- Workout plan management
- Session booking system
- Progress tracking with analytics
- Trainer-member assignments

### 📊 Analytics & Reporting
- Dashboard analytics for all user types
- Progress tracking and charts
- Booking statistics
- Admin audit logs

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Security**: Helmet, XSS-Clean, Rate Limiting
- **Validation**: Express-validator
- **Environment**: dotenv

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- MongoDB Atlas account
- Git

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/gym-backend.git
cd gym-backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
# Edit .env with your MongoDB URI and JWT secret

# Start development server
npm run dev
```

### Environment Variables
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_minimum_32_characters
JWT_EXPIRE=30m
COOKIE_EXPIRE=30
CLIENT_URL=http://localhost:5173
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/members` - Get members (Trainer/Admin)

### Workouts
- `GET /api/workouts` - Get workout plans
- `POST /api/workouts` - Create workout plan
- `PUT /api/workouts/:id` - Update workout plan
- `DELETE /api/workouts/:id` - Delete workout plan

### Bookings
- `GET /api/bookings` - Get bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Progress Tracking
- `GET /api/progress` - Get progress entries
- `POST /api/progress` - Log progress entry
- `PUT /api/progress/:id` - Update progress entry
- `GET /api/progress/stats` - Get progress statistics

### Dashboards
- `GET /api/dashboard/member` - Member dashboard
- `GET /api/dashboard/trainer` - Trainer dashboard
- `GET /api/dashboard/admin` - Admin dashboard

### Admin Panel
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/status` - Update user status
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user

## 🔒 Security Features

### Input Validation
- Comprehensive request validation
- XSS protection with input sanitization
- MongoDB injection prevention
- Rate limiting (100 requests per 15 minutes)

### Authentication Security
- JWT tokens with 30-minute expiration
- HTTP-only cookies for token storage
- Password hashing with bcrypt (12 rounds)
- Role-based access control

### Admin Security
- Self-protection (admins can't modify themselves)
- Audit logging for all admin actions
- Input validation and sanitization
- Secure role management

## 🚀 Deployment

### Render Deployment
1. **Prepare Repository**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Render Service**:
   - Connect GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`

3. **Configure Environment Variables**:
   ```
   NODE_ENV=production
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_secure_jwt_secret
   CLIENT_URL=https://your-frontend-domain.com
   ```

4. **MongoDB Atlas Setup**:
   - Add `0.0.0.0/0` to IP whitelist
   - Create production database user
   - Use production database

### Environment Configuration
See `RENDER_DEPLOYMENT_GUIDE.md` for detailed deployment instructions.

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: enum['admin', 'trainer', 'member'],
  status: enum['active', 'banned', 'deactivated'],
  phone: String,
  assignedTrainer: ObjectId,
  joinedDate: Date
}
```

### Workout Plan Model
```javascript
{
  title: String,
  description: String,
  member: ObjectId,
  createdBy: ObjectId,
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    weight: Number,
    rest: String,
    notes: String
  }],
  difficulty: enum['beginner', 'intermediate', 'advanced'],
  duration: Number,
  isActive: Boolean
}
```

### Progress Entry Model
```javascript
{
  member: ObjectId,
  date: Date,
  weight: Number,
  bmi: Number,
  bodyFat: Number,
  muscleMass: Number,
  measurements: Object,
  workoutData: Object,
  energyLevel: Number,
  notes: String,
  isPrivate: Boolean
}
```

## 🧪 Testing

### Manual Testing
```bash
# Health check
curl http://localhost:5000/api/health

# User registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test123!","phone":"1234567890"}'

# User login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

### API Testing Tools
- **Postman**: Import API collection
- **Insomnia**: REST client testing
- **curl**: Command-line testing

## 📚 Documentation

- `RENDER_DEPLOYMENT_GUIDE.md` - Deployment instructions
- `ADMIN_PANEL_API_DOCS.md` - Admin panel API documentation
- `DASHBOARD_API_GUIDE.md` - Dashboard API documentation
- `.env.example` - Environment variables template

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🔧 Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (placeholder)
npm run build      # Build step (not required for Node.js)
```

## 📞 Support

For deployment issues:
- Check `RENDER_DEPLOYMENT_GUIDE.md`
- Review environment variables
- Check MongoDB Atlas configuration
- Monitor Render service logs

## 🏆 Production Ready

This backend is production-ready with:
- ✅ Security best practices
- ✅ Error handling
- ✅ Input validation
- ✅ Audit logging
- ✅ Role-based access control
- ✅ Performance optimization
- ✅ Deployment configuration

---

**🎯 Ready to deploy your secure gym management backend!**
