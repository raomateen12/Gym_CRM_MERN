# Render Deployment Configuration
# This file contains instructions for deploying to Render

## Environment Variables to Set in Render Dashboard:

NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://raomateen:Mateen.234.saeed@cluster0.8eerplv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_super_secure_jwt_secret_here_change_this_in_production_minimum_32_characters
JWT_EXPIRE=30m
COOKIE_EXPIRE=30
CLIENT_URL=https://your-frontend-domain.onrender.com

## Render Settings:
- Build Command: npm install
- Start Command: npm start
- Node Version: 18.x or higher
- Auto-Deploy: Yes (recommended)

## Important Notes:
1. Change JWT_SECRET to a secure random string in production
2. Update CLIENT_URL to your actual frontend domain
3. Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0 for Render access
4. Set up proper MongoDB Atlas user with read/write permissions
