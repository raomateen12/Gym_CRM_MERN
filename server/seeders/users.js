const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@gym.com',
    password: 'password123',
    role: 'admin',
    phone: '1234567890',
    dateOfBirth: new Date('1990-01-01'),
    address: '123 Admin Street, City',
    emergencyContact: {
      name: 'Emergency Admin',
      phone: '1234567891',
      relationship: 'Family'
    }
  },
  {
    name: 'Trainer John',
    email: 'trainer@gym.com', 
    password: 'password123',
    role: 'trainer',
    phone: '1234567892',
    dateOfBirth: new Date('1988-05-15'),
    address: '456 Trainer Ave, City',
    emergencyContact: {
      name: 'Emergency Trainer',
      phone: '1234567893',
      relationship: 'Spouse'
    },
    specializations: ['Strength Training', 'HIIT', 'Weight Loss'],
    experience: 5,
    certifications: ['NASM-CPT', 'ACSM']
  },
  {
    name: 'Member Mike',
    email: 'member@gym.com',
    password: 'password123', 
    role: 'member',
    phone: '1234567894',
    dateOfBirth: new Date('1995-10-20'),
    address: '789 Member Blvd, City',
    emergencyContact: {
      name: 'Emergency Member',
      phone: '1234567895',
      relationship: 'Parent'
    },
    membershipPlan: 'premium',
    joinDate: new Date(),
    healthInfo: {
      height: 180,
      weight: 75,
      fitnessGoals: ['Weight Loss', 'Muscle Gain'],
      medicalConditions: [],
      allergies: []
    }
  }
];

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🗄️  MongoDB Connected for seeding');

    // Clear existing users
    await User.deleteMany({});
    console.log('🧹 Cleared existing users');

    // Create users (password hashing will be handled by User model pre-save hook)
    for (let userData of users) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ Created user: ${userData.name} (${userData.email})`);
    }

    console.log('🎉 User seeding completed successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('Admin: admin@gym.com / password123');
    console.log('Trainer: trainer@gym.com / password123'); 
    console.log('Member: member@gym.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
