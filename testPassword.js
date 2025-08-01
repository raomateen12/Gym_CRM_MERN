const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config();

// User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'trainer', 'member'], default: 'member' },
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    dateOfBirth: Date,
    joinDate: { type: Date, default: Date.now },
    emergencyContact: {
      name: String,
      phone: String
    }
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function testPasswordComparison() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find the admin user
    const user = await User.findOne({ email: 'admin@gym.com' });
    if (!user) {
      console.log(' User admin@gym.com not found');
      return;
    }

    console.log('Found user:', user.email);
    console.log('Stored password hash:', user.password);
    console.log('Hash length:', user.password.length);

    // Test password comparison
    const testPassword = 'password123';
    console.log(`\nTesting password: "${testPassword}"`);
    
    console.log('\n--- Direct bcrypt comparison ---');
    const isMatch1 = await bcrypt.compare(testPassword, user.password);
    console.log('bcrypt.compare result:', isMatch1);

    console.log('\n--- Manual hash generation for comparison ---');
    const newHash = await bcrypt.hash(testPassword, 12);
    console.log('New hash for same password:', newHash);
    const isMatch2 = await bcrypt.compare(testPassword, newHash);
    console.log('Compare with new hash:', isMatch2);

    console.log('\n--- Testing other common passwords ---');
    const commonPasswords = ['admin123', 'Admin123', 'password', 'admin'];
    for (const pwd of commonPasswords) {
      const match = await bcrypt.compare(pwd, user.password);
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
