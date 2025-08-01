const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding');

    // Clear existing users (optional)
    // await User.deleteMany({});

    // Create default users
    const users = [
      {
        name: 'Admin User',
        email: 'admin@gym.com',
        password: 'admin123',
        phone: '03001234567',
        role: 'admin',
        dateOfBirth: '1990-01-15',
        address: 'Admin Office, Gym Building',
        emergencyContact: {
          name: 'Admin Emergency',
          phone: '03009876543',
          relationship: 'Office'
        },
        membershipType: 'VIP'
      },
      {
        name: 'Trainer John',
        email: 'trainer@gym.com',
        password: 'trainer123',
        phone: '03001234568',
        role: 'trainer',
        dateOfBirth: '1985-05-20',
        address: 'Trainer Quarters, Gym Building',
        emergencyContact: {
          name: 'John Emergency',
          phone: '03009876544',
          relationship: 'Family'
        },
        fitnessGoals: ['Strength Training', 'Athletic Performance'],
        membershipType: 'Premium'
      },
      {
        name: 'Member Ali',
        email: 'member@gym.com',
        password: 'member123',
        phone: '03001234569',
        role: 'member',
        dateOfBirth: '1995-08-10',
        address: 'Member Address, City',
        emergencyContact: {
          name: 'Ali Emergency',
          phone: '03009876545',
          relationship: 'Parent'
        },
        fitnessGoals: ['Weight Loss', 'Cardio Improvement'],
        membershipType: 'Basic'
      }
    ];

    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        const user = await User.create(userData);
        console.log(`Created ${user.role}: ${user.email}`);
      } else {
        console.log(`User already exists: ${userData.email}`);
      }
    }

    console.log('\nDefault users seeded successfully!');
    console.log('\nLogin Credentials:');
    console.log('Admin: admin@gym.com / admin123');
    console.log('Trainer: trainer@gym.com / trainer123');
    console.log('Member: member@gym.com / member123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
