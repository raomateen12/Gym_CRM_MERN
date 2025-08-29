const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(' MongoDB Connected');

    const users = await User.find({});
    console.log(' Total users in database:', users.length);
    
    users.forEach(user => {
      console.log(` ${user.email} | Role: ${user.role} | Name: ${user.name}`);
    });

    // Test password for admin user
    const adminUser = await User.findOne({ email: 'admin@gym.com' }).select('+password');
    if (adminUser) {
      console.log('\n Admin user found:');
      console.log('Email:', adminUser.email);
      console.log('Role:', adminUser.role);
      console.log('Password hash exists:', !!adminUser.password);
      console.log('Password hash length:', adminUser.password?.length);
    } else {
      console.log(' Admin user not found!');
    }

    process.exit(0);
  } catch (error) {
    console.error(' Error:', error);
    process.exit(1);
  }
};

checkUsers();
