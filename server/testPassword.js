const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function testPasswordComparison() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find the admin user with password included
    const user = await User.findOne({ email: 'admin@gym.com' }).select('+password');
    if (!user) {
      console.log('❌ User admin@gym.com not found');
      return;
    }

    console.log('Found user:', user.email);
    console.log('Stored password hash:', user.password);
    console.log('Hash length:', user.password.length);

    // Test password comparison using the User model method
    const testPassword = 'password123';
    console.log(`\nTesting password: "${testPassword}"`);
    
    console.log('\n--- Using User.matchPassword method (actual auth method) ---');
    const isMatchModel = await user.matchPassword(testPassword);
    console.log('user.matchPassword result:', isMatchModel);
    
    console.log('\n--- Direct bcrypt comparison ---');
    const isMatch1 = await bcrypt.compare(testPassword, user.password);
    console.log('bcrypt.compare result:', isMatch1);

    console.log('\n--- Testing other common passwords with matchPassword ---');
    const commonPasswords = ['admin123', 'Admin123', 'password', 'admin'];
    for (const pwd of commonPasswords) {
      const match = await user.matchPassword(pwd);
      console.log(`Password "${pwd}": ${match}`);
    }

    // Test if hash is valid bcrypt format
    console.log('\n--- Hash validation ---');
    const isValidHash = user.password.startsWith('$2b$') || user.password.startsWith('$2a$') || user.password.startsWith('$2y$');
    console.log('Is valid bcrypt hash format:', isValidHash);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

testPasswordComparison();
