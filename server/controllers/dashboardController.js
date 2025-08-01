const User = require('../models/User');
const WorkoutPlan = require('../models/WorkoutPlan');
const Booking = require('../models/Booking');
const ProgressEntry = require('../models/ProgressEntry');

// @desc    Get member dashboard data
// @route   GET /api/dashboard/member
// @access  Private/Member
const getMemberDashboard = async (req, res) => {
  try {
    const memberId = req.user._id;
    const memberName = req.user.name;

    // Get total sessions booked
    const totalBookings = await Booking.countDocuments({
      member: memberId
    });

    // Get upcoming bookings (next 7 days)
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const upcomingBookings = await Booking.find({
      member: memberId,
      date: { $gte: new Date(), $lte: nextWeek },
      status: 'confirmed'
    })
    .populate('trainer', 'name')
    .sort({ date: 1, startTime: 1 })
    .limit(5);

    // Get total workouts assigned
    const totalWorkouts = await WorkoutPlan.countDocuments({
      member: memberId,
      isActive: true
    });

    // Get active workout plans
    const activeWorkouts = await WorkoutPlan.find({
      member: memberId,
      isActive: true
    })
    .populate('createdBy', 'name')
    .sort({ createdAt: -1 })
    .limit(3);

    // Get recent progress logs (last 5)
    const recentProgress = await ProgressEntry.find({
      member: memberId
    })
    .sort({ date: -1 })
    .limit(5)
    .select('date weight bmi energyLevel workoutDuration caloriesBurned');

    // Get progress statistics (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const progressStats = await ProgressEntry.aggregate([
      {
        $match: {
          member: memberId,
          date: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: null,
          totalEntries: { $sum: 1 },
          avgWeight: { $avg: '$weight' },
          avgBMI: { $avg: '$bmi' },
          avgEnergyLevel: { $avg: '$energyLevel' },
          totalWorkoutDuration: { $sum: '$workoutDuration' },
          totalCaloriesBurned: { $sum: '$caloriesBurned' },
          latestWeight: { $last: '$weight' },
          firstWeight: { $first: '$weight' }
        }
      }
    ]);

    const stats = progressStats.length > 0 ? progressStats[0] : {
      totalEntries: 0,
      avgWeight: 0,
      avgBMI: 0,
      avgEnergyLevel: 0,
      totalWorkoutDuration: 0,
      totalCaloriesBurned: 0,
      latestWeight: 0,
      firstWeight: 0
    };

    // Calculate weight change
    const weightChange = stats.latestWeight && stats.firstWeight 
      ? (stats.latestWeight - stats.firstWeight).toFixed(1)
      : 0;

    // Get workout completion rate
    const completedSessions = await Booking.countDocuments({
      member: memberId,
      status: 'completed'
    });

    res.status(200).json({
      success: true,
      dashboard: {
        welcomeMessage: `Welcome back, ${memberName}!`,
        memberName,
        stats: {
          totalBookings,
          totalWorkouts,
          completedSessions,
          progressEntries: stats.totalEntries,
          weightChange: parseFloat(weightChange)
        },
        upcomingBookings,
        activeWorkouts,
        recentProgress,
        progressStats: {
          avgWeight: stats.avgWeight ? parseFloat(stats.avgWeight.toFixed(1)) : 0,
          avgBMI: stats.avgBMI ? parseFloat(stats.avgBMI.toFixed(1)) : 0,
          avgEnergyLevel: stats.avgEnergyLevel ? parseFloat(stats.avgEnergyLevel.toFixed(1)) : 0,
          totalWorkoutDuration: stats.totalWorkoutDuration || 0,
          totalCaloriesBurned: stats.totalCaloriesBurned || 0
        }
      }
    });
  } catch (error) {
    console.error('Get member dashboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching member dashboard'
    });
  }
};

// @desc    Get trainer dashboard data
// @route   GET /api/dashboard/trainer
// @access  Private/Trainer
const getTrainerDashboard = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const trainerName = req.user.name;

    // Get total members assigned to this trainer
    const totalMembers = await User.countDocuments({
      role: 'member',
      assignedTrainer: trainerId
    });

    // Get assigned members list
    const assignedMembers = await User.find({
      role: 'member',
      assignedTrainer: trainerId
    })
    .select('name email joinedDate')
    .sort({ joinedDate: -1 })
    .limit(10);

    // Get upcoming bookings for this trainer
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const upcomingBookings = await Booking.find({
      trainer: trainerId,
      date: { $gte: today, $lte: nextWeek },
      status: { $in: ['confirmed', 'pending'] }
    })
    .populate('member', 'name email')
    .sort({ date: 1, startTime: 1 })
    .limit(10);

    // Get today's bookings
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const todaysBookings = await Booking.find({
      trainer: trainerId,
      date: { $gte: todayStart, $lte: todayEnd }
    })
    .populate('member', 'name')
    .sort({ startTime: 1 });

    // Get workout plans created by this trainer
    const totalWorkoutPlans = await WorkoutPlan.countDocuments({
      createdBy: trainerId
    });

    const recentWorkoutPlans = await WorkoutPlan.find({
      createdBy: trainerId
    })
    .populate('member', 'name')
    .sort({ createdAt: -1 })
    .limit(5);

    // Get booking statistics
    const bookingStats = await Booking.aggregate([
      {
        $match: {
          trainer: trainerId
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const bookingStatusCounts = {
      confirmed: 0,
      pending: 0,
      completed: 0,
      cancelled: 0
    };

    bookingStats.forEach(stat => {
      bookingStatusCounts[stat._id] = stat.count;
    });

    // Get member progress insights (non-private entries only)
    const memberProgressInsights = await ProgressEntry.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'member',
          foreignField: '_id',
          as: 'memberInfo'
        }
      },
      {
        $match: {
          'memberInfo.assignedTrainer': trainerId,
          isPrivate: { $ne: true }
        }
      },
      {
        $group: {
          _id: '$member',
          memberName: { $first: { $arrayElemAt: ['$memberInfo.name', 0] } },
          totalEntries: { $sum: 1 },
          avgWeight: { $avg: '$weight' },
          latestEntry: { $last: '$$ROOT' }
        }
      },
      {
        $sort: { totalEntries: -1 }
      },
      {
        $limit: 5
      }
    ]);

    res.status(200).json({
      success: true,
      dashboard: {
        welcomeMessage: `Welcome back, ${trainerName}!`,
        trainerName,
        stats: {
          totalMembers,
          totalWorkoutPlans,
          totalBookings: Object.values(bookingStatusCounts).reduce((a, b) => a + b, 0),
          completedSessions: bookingStatusCounts.completed,
          pendingBookings: bookingStatusCounts.pending
        },
        assignedMembers,
        upcomingBookings,
        todaysBookings,
        recentWorkoutPlans,
        bookingStatusCounts,
        memberProgressInsights
      }
    });
  } catch (error) {
    console.error('Get trainer dashboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching trainer dashboard'
    });
  }
};

// @desc    Get admin dashboard data
// @route   GET /api/dashboard/admin
// @access  Private/Admin
const getAdminDashboard = async (req, res) => {
  try {
    const adminName = req.user.name;

    // Get total users with role breakdown
    const userStats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    const userRoleCounts = {
      admin: 0,
      trainer: 0,
      member: 0
    };

    userStats.forEach(stat => {
      userRoleCounts[stat._id] = stat.count;
    });

    const totalUsers = Object.values(userRoleCounts).reduce((a, b) => a + b, 0);

    // Get recent user registrations (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentUsers = await User.find({
      joinedDate: { $gte: sevenDaysAgo }
    })
    .select('name email role joinedDate')
    .sort({ joinedDate: -1 })
    .limit(10);

    // Get total bookings system-wide
    const totalBookings = await Booking.countDocuments();

    // Get booking statistics
    const bookingStats = await Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const systemBookingCounts = {
      confirmed: 0,
      pending: 0,
      completed: 0,
      cancelled: 0
    };

    bookingStats.forEach(stat => {
      systemBookingCounts[stat._id] = stat.count;
    });

    // Get total workout plans
    const totalWorkoutPlans = await WorkoutPlan.countDocuments();
    const activeWorkoutPlans = await WorkoutPlan.countDocuments({ isActive: true });

    // Get total progress entries
    const totalProgressEntries = await ProgressEntry.countDocuments();

    // Get daily booking trends (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyBookingTrends = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Get monthly user growth
    const monthlyUserGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$joinedDate" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $limit: 12
      }
    ]);

    // Get trainer performance overview
    const trainerPerformance = await Booking.aggregate([
      {
        $match: {
          status: 'completed'
        }
      },
      {
        $group: {
          _id: '$trainer',
          completedSessions: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'trainerInfo'
        }
      },
      {
        $project: {
          trainerName: { $arrayElemAt: ['$trainerInfo.name', 0] },
          completedSessions: 1
        }
      },
      {
        $sort: { completedSessions: -1 }
      },
      {
        $limit: 5
      }
    ]);

    // System health metrics
    const systemHealth = {
      activeUsers: await User.countDocuments({ isActive: { $ne: false } }),
      activeWorkoutPlans,
      recentActivity: await ProgressEntry.countDocuments({
        date: { $gte: sevenDaysAgo }
      })
    };

    res.status(200).json({
      success: true,
      dashboard: {
        welcomeMessage: `Welcome back, Admin ${adminName}!`,
        adminName,
        stats: {
          totalUsers,
          totalBookings,
          totalWorkoutPlans,
          totalProgressEntries,
          activeWorkoutPlans,
          newUsersThisWeek: recentUsers.length
        },
        userRoleCounts,
        systemBookingCounts,
        recentUsers,
        dailyBookingTrends,
        monthlyUserGrowth,
        trainerPerformance,
        systemHealth
      }
    });
  } catch (error) {
    console.error('Get admin dashboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching admin dashboard'
    });
  }
};

module.exports = {
  getMemberDashboard,
  getTrainerDashboard,
  getAdminDashboard
};
