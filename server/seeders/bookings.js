const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const User = require('../models/User');
require('dotenv').config();

const seedBookings = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🗄️  MongoDB Connected for booking seeding');

    // Clear existing bookings
    await Booking.deleteMany({});
    console.log('🧹 Cleared existing bookings');

    // Get users from database
    const admin = await User.findOne({ role: 'admin' });
    const trainer = await User.findOne({ role: 'trainer' });
    const member = await User.findOne({ role: 'member' });

    if (!admin || !trainer || !member) {
      console.log('❌ Please run user seeder first');
      process.exit(1);
    }

    // Create sample bookings
    const bookings = [
      {
        member: member._id,
        trainer: trainer._id,
        date: new Date('2025-01-15'),
        time: '09:00',
        duration: 60,
        sessionType: 'personal-training',
        status: 'confirmed',
        notes: 'Focus on strength training and form correction',
        price: 50,
        createdBy: admin._id
      },
      {
        member: member._id,
        trainer: trainer._id,
        date: new Date('2025-01-16'),
        time: '10:30',
        duration: 90,
        sessionType: 'personal-training',
        status: 'completed',
        notes: 'HIIT workout session - excellent progress',
        price: 75,
        createdBy: admin._id
      },
      {
        member: member._id,
        trainer: trainer._id,
        date: new Date('2025-01-17'),
        time: '14:00',
        duration: 45,
        sessionType: 'consultation',
        status: 'pending',
        notes: 'Nutrition consultation and meal planning',
        price: 40,
        createdBy: trainer._id
      },
      {
        member: member._id,
        trainer: trainer._id,
        date: new Date('2025-01-18'),
        time: '16:00',
        duration: 60,
        sessionType: 'assessment',
        status: 'confirmed',
        notes: 'Fitness assessment and goal setting',
        price: 30,
        createdBy: admin._id
      },
      {
        member: member._id,
        trainer: trainer._id,
        date: new Date('2025-01-19'),
        time: '11:00',
        duration: 75,
        sessionType: 'group-class',
        status: 'cancelled',
        notes: 'Group yoga class - cancelled due to low enrollment',
        price: 25,
        createdBy: trainer._id
      },
      {
        member: member._id,
        trainer: trainer._id,
        date: new Date('2025-01-20'),
        time: '08:30',
        duration: 60,
        sessionType: 'personal-training',
        status: 'pending',
        notes: 'Cardio and endurance training',
        price: 50,
        createdBy: member._id
      }
    ];

    // Create bookings
    for (let bookingData of bookings) {
      const booking = new Booking(bookingData);
      await booking.save();
      console.log(`✅ Created booking: ${bookingData.date.toDateString()} at ${bookingData.time}`);
    }

    console.log('🎉 Booking seeding completed successfully!');
    console.log(`📊 Created ${bookings.length} sample bookings`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding bookings:', error);
    process.exit(1);
  }
};

seedBookings();
