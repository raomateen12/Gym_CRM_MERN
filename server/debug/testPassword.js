const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const testPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🗄️  MongoDB Connected');

    // Find admin user with password
    const user = await User.findOne({ email: 'admin@gym.com' }).select('+password');
    
    if (!user) {
      console.log('❌ User not found');
      process.exit(1);
    }

    console.log('✅ User found:', user.email);
    console.log('🔒 Password hash:', user.password);
    
    // Test password
    const testPassword = 'password123';
    console.log('🧪 Testing password:', testPassword);
    
    const isMatch = await user.matchPassword(testPassword);
    console.log('🎯 Password match result:', isMatch);

    if (isMatch) {
      console.log('✅ Password matches! Login should work.');
    } else {
      console.log('❌ Password does not match! There is an issue.');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

testPassword();
