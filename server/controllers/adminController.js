const User = require('../models/User');
const WorkoutPlan = require('../models/WorkoutPlan');
const Booking = require('../models/Booking');
const ProgressEntry = require('../models/ProgressEntry');
const fs = require('fs').promises;
const path = require('path');

// @desc    Get all users with filtering and pagination
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      role,
      status,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (role) {
      filter.role = role;
    }
    
    if (status) {
      filter.status = status;
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query with pagination
    const users = await User.find(filter)
      .select('-password') // Exclude password
      .populate('assignedTrainer', 'name email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get total count for pagination
    const totalUsers = await User.countDocuments(filter);

    // Get role statistics
    const roleStats = await User.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get status statistics
    const statusStats = await User.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      count: users.length,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: parseInt(page),
      users,
      statistics: {
        roles: roleStats.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        statuses: statusStats.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching users'
    });
  }
};

// @desc    Get user by ID with detailed information
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('assignedTrainer', 'name email');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Get user's related data
    const userStats = {
      workoutPlans: await WorkoutPlan.countDocuments({ 
        $or: [
          { member: user._id },
          { createdBy: user._id }
        ]
      }),
      bookings: await Booking.countDocuments({
        $or: [
          { member: user._id },
          { trainer: user._id }
        ]
      }),
      progressEntries: user.role === 'member' ? 
        await ProgressEntry.countDocuments({ member: user._id }) : 0
    };

    // Get assigned members if user is a trainer
    let assignedMembers = [];
    if (user.role === 'trainer') {
      assignedMembers = await User.find({ assignedTrainer: user._id })
        .select('name email status joinedDate')
        .limit(10);
    }

    res.status(200).json({
      success: true,
      user,
      userStats,
      assignedMembers
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching user details'
    });
  }
};

// @desc    Update user status
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['active', 'banned', 'deactivated'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be active, banned, or deactivated'
      });
    }

    // Find the user to update
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Prevent admin from modifying their own status
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'You cannot modify your own status'
      });
    }

    // Update user status
    const oldStatus = user.status;
    user.status = status;
    await user.save();

    // Log admin action
    await logAdminAction(req.user._id, 'STATUS_UPDATE', {
      targetUserId: id,
      targetUserEmail: user.email,
      oldStatus,
      newStatus: status
    });

    res.status(200).json({
      success: true,
      message: `User status updated to ${status}`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error updating user status'
    });
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Validate role
    const validRoles = ['admin', 'trainer', 'member'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid role. Must be admin, trainer, or member'
      });
    }

    // Find the user to update
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Prevent admin from modifying their own role
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'You cannot modify your own role'
      });
    }

    // Update user role
    const oldRole = user.role;
    user.role = role;

    // Clear assigned trainer if changing from member
    if (oldRole === 'member' && role !== 'member') {
      user.assignedTrainer = undefined;
    }

    await user.save();

    // Log admin action
    await logAdminAction(req.user._id, 'ROLE_UPDATE', {
      targetUserId: id,
      targetUserEmail: user.email,
      oldRole,
      newRole: role
    });

    res.status(200).json({
      success: true,
      message: `User role updated to ${role}`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error updating user role'
    });
  }
};

// @desc    Soft delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { hardDelete = false } = req.body;

    // Find the user to delete
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'You cannot delete your own account'
      });
    }

    // Check if user has critical data
    const hasBookings = await Booking.countDocuments({
      $or: [{ member: id }, { trainer: id }]
    });

    const hasWorkoutPlans = await WorkoutPlan.countDocuments({
      $or: [{ member: id }, { createdBy: id }]
    });

    if (hardDelete) {
      // Hard delete - remove all related data
      await Promise.all([
        Booking.deleteMany({ $or: [{ member: id }, { trainer: id }] }),
        WorkoutPlan.deleteMany({ $or: [{ member: id }, { createdBy: id }] }),
        ProgressEntry.deleteMany({ member: id }),
        User.findByIdAndDelete(id)
      ]);

      // Log admin action
      await logAdminAction(req.user._id, 'HARD_DELETE', {
        targetUserId: id,
        targetUserEmail: user.email,
        targetUserRole: user.role,
        relatedData: {
          bookings: hasBookings,
          workoutPlans: hasWorkoutPlans
        }
      });

      res.status(200).json({
        success: true,
        message: 'User and all related data permanently deleted'
      });
    } else {
      // Soft delete - deactivate user
      user.status = 'deactivated';
      user.email = `deleted_${Date.now()}_${user.email}`;
      await user.save();

      // Log admin action
      await logAdminAction(req.user._id, 'SOFT_DELETE', {
        targetUserId: id,
        targetUserEmail: user.email,
        targetUserRole: user.role
      });

      res.status(200).json({
        success: true,
        message: 'User account deactivated (soft delete)',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status
        }
      });
    }
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error deleting user'
    });
  }
};

// @desc    Assign trainer to member
// @route   PUT /api/admin/users/:id/assign-trainer
// @access  Private/Admin
const assignTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const { trainerId } = req.body;

    // Find the member
    const member = await User.findById(id);
    if (!member) {
      return res.status(404).json({
        success: false,
        error: 'Member not found'
      });
    }

    if (member.role !== 'member') {
      return res.status(400).json({
        success: false,
        error: 'Can only assign trainers to members'
      });
    }

    // Validate trainer if provided
    let trainer = null;
    if (trainerId) {
      trainer = await User.findById(trainerId);
      if (!trainer || trainer.role !== 'trainer') {
        return res.status(400).json({
          success: false,
          error: 'Invalid trainer ID'
        });
      }
    }

    // Update member's assigned trainer
    const oldTrainerId = member.assignedTrainer;
    member.assignedTrainer = trainerId || undefined;
    await member.save();

    // Log admin action
    await logAdminAction(req.user._id, 'TRAINER_ASSIGNMENT', {
      memberId: id,
      memberEmail: member.email,
      oldTrainerId,
      newTrainerId: trainerId,
      trainerEmail: trainer?.email
    });

    res.status(200).json({
      success: true,
      message: trainerId ? 'Trainer assigned successfully' : 'Trainer unassigned',
      member: {
        _id: member._id,
        name: member.name,
        email: member.email,
        assignedTrainer: trainer ? {
          _id: trainer._id,
          name: trainer.name,
          email: trainer.email
        } : null
      }
    });
  } catch (error) {
    console.error('Assign trainer error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error assigning trainer'
    });
  }
};

// @desc    Get admin audit logs
// @route   GET /api/admin/audit-logs
// @access  Private/Admin
const getAuditLogs = async (req, res) => {
  try {
    const { page = 1, limit = 50, action, adminId } = req.query;

    // Read logs from file
    const logsPath = path.join(__dirname, '..', 'logs', 'admin-actions.log');
    
    try {
      const logsData = await fs.readFile(logsPath, 'utf8');
      const logs = logsData.trim().split('\n')
        .filter(line => line.trim())
        .map(line => {
          try {
            return JSON.parse(line);
          } catch (e) {
            return null;
          }
        })
        .filter(log => log !== null);

      // Filter logs
      let filteredLogs = logs;
      
      if (action) {
        filteredLogs = filteredLogs.filter(log => log.action === action);
      }
      
      if (adminId) {
        filteredLogs = filteredLogs.filter(log => log.adminId === adminId);
      }

      // Sort by timestamp (newest first)
      filteredLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      // Paginate
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedLogs = filteredLogs.slice(startIndex, endIndex);

      res.status(200).json({
        success: true,
        count: paginatedLogs.length,
        totalLogs: filteredLogs.length,
        totalPages: Math.ceil(filteredLogs.length / limit),
        currentPage: parseInt(page),
        logs: paginatedLogs
      });
    } catch (fileError) {
      // If log file doesn't exist, return empty array
      res.status(200).json({
        success: true,
        count: 0,
        totalLogs: 0,
        totalPages: 0,
        currentPage: 1,
        logs: []
      });
    }
  } catch (error) {
    console.error('Get audit logs error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching audit logs'
    });
  }
};

// Helper function to log admin actions
const logAdminAction = async (adminId, action, details) => {
  try {
    const logEntry = {
      adminId: adminId.toString(),
      action,
      details,
      timestamp: new Date().toISOString(),
      userAgent: 'Admin Panel'
    };

    // Ensure logs directory exists
    const logsDir = path.join(__dirname, '..', 'logs');
    await fs.mkdir(logsDir, { recursive: true });

    // Append to log file
    const logsPath = path.join(logsDir, 'admin-actions.log');
    await fs.appendFile(logsPath, JSON.stringify(logEntry) + '\n');
  } catch (error) {
    console.error('Error logging admin action:', error);
  }
};

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard-stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    // Get user counts by role
    const userStats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get total bookings and recent bookings
    const totalBookings = await Booking.countDocuments();
    const recentBookings = await Booking.find()
      .populate('member', 'name email')
      .populate('trainer', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get total workouts
    const totalWorkouts = await WorkoutPlan.countDocuments();

    // Get booking status distribution
    const bookingStatusStats = await Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get top performing trainers (by booking count)
    const topTrainers = await Booking.aggregate([
      {
        $group: {
          _id: '$trainer',
          bookingCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'trainer'
        }
      },
      {
        $unwind: '$trainer'
      },
      {
        $sort: { bookingCount: -1 }
      },
      {
        $limit: 5
      },
      {
        $project: {
          name: '$trainer.name',
          email: '$trainer.email',
          bookingCount: 1
        }
      }
    ]);

    // Get growth trends (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const growthTrends = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Format user stats
    const formattedUserStats = {
      total: 0,
      admin: 0,
      trainer: 0,
      member: 0
    };

    userStats.forEach(stat => {
      formattedUserStats[stat._id] = stat.count;
      formattedUserStats.total += stat.count;
    });

    res.status(200).json({
      success: true,
      data: {
        userStats: formattedUserStats,
        totalBookings,
        totalWorkouts,
        recentBookings,
        bookingStatusStats,
        topTrainers,
        growthTrends
      }
    });
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get all bookings
// @route   GET /api/admin/bookings
// @access  Private/Admin
const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, trainer, member } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (trainer) filter.trainer = trainer;
    if (member) filter.member = member;

    const bookings = await Booking.find(filter)
      .populate('member', 'name email phone')
      .populate('trainer', 'name email phone specializations')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(filter);

    // Calculate statistics
    const stats = {
      total: total,
      pending: await Booking.countDocuments({ ...filter, status: 'pending' }),
      confirmed: await Booking.countDocuments({ ...filter, status: 'confirmed' }),
      completed: await Booking.countDocuments({ ...filter, status: 'completed' }),
      cancelled: await Booking.countDocuments({ ...filter, status: 'cancelled' })
    };

    res.status(200).json({
      success: true,
      data: {
        bookings,
        stats,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get trainer performance
// @route   GET /api/admin/trainer-performance
// @access  Private/Admin
const getTrainerPerformance = async (req, res) => {
  try {
    const trainers = await User.find({ role: 'trainer' }).select('name email');
    const performance = [];

    for (const trainer of trainers) {
      const bookingCount = await Booking.countDocuments({ trainer: trainer._id });
      const completedSessions = await Booking.countDocuments({ 
        trainer: trainer._id, 
        status: 'completed' 
      });
      const workoutCount = await WorkoutPlan.countDocuments({ trainer: trainer._id });
      const assignedMembers = await User.countDocuments({ assignedTrainer: trainer._id });

      performance.push({
        trainer: {
          _id: trainer._id,
          name: trainer.name,
          email: trainer.email
        },
        stats: {
          totalBookings: bookingCount,
          completedSessions,
          workoutPlans: workoutCount,
          assignedMembers
        }
      });
    }

    // Sort by total bookings
    performance.sort((a, b) => b.stats.totalBookings - a.stats.totalBookings);

    res.status(200).json({
      success: true,
      data: performance
    });
  } catch (error) {
    console.error('Error fetching trainer performance:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get all workout plans
// @route   GET /api/admin/workouts
// @access  Private/Admin
const getAllWorkouts = async (req, res) => {
  try {
    const { page = 1, limit = 10, trainer, category } = req.query;
    
    // Build filter object
    const filter = {};
    if (trainer) filter.trainer = trainer;
    if (category) filter.category = category;

    const workouts = await WorkoutPlan.find(filter)
      .populate('trainer', 'name email')
      .populate('assignedMembers', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await WorkoutPlan.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        workouts,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Create a new user
// @route   POST /api/admin/users
// @access  Private/Admin
const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      dateOfBirth,
      address,
      emergencyContact
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'User with this email already exists' 
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      role,
      phone,
      dateOfBirth,
      address,
      emergencyContact
    });

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      data: userResponse,
      message: `${role} created successfully`
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error while creating user' 
    });
  }
};

// @desc    Update user information
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Remove password from update data if it's empty
    if (updateData.password === '') {
      delete updateData.password;
    }

    // Check if email is being changed and if it's already taken
    if (updateData.email) {
      const existingUser = await User.findOne({ 
        email: updateData.email, 
        _id: { $ne: userId } 
      });
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          error: 'Email already in use by another user' 
        });
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    res.json({
      success: true,
      data: user,
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error while updating user' 
    });
  }
};

// Get all bookings (admin only)
// Create new booking (admin only)
const createBooking = async (req, res) => {
  try {
    const { member, trainer, date, time, duration, sessionType, notes, price } = req.body;
    
    // Validate required fields
    if (!member || !trainer || !date || !time || !price) {
      return res.status(400).json({
        success: false,
        message: 'Member, trainer, date, time, and price are required'
      });
    }

    // Check if trainer exists
    const trainerExists = await User.findById(trainer);
    if (!trainerExists || trainerExists.role !== 'trainer') {
      return res.status(400).json({
        success: false,
        message: 'Invalid trainer selected'
      });
    }

    // Check if member exists
    const memberExists = await User.findById(member);
    if (!memberExists || memberExists.role !== 'member') {
      return res.status(400).json({
        success: false,
        message: 'Invalid member selected'
      });
    }

    // Check for scheduling conflicts
    const existingBooking = await Booking.findOne({
      trainer,
      date: new Date(date),
      time,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'Trainer is already booked at this time'
      });
    }

    const booking = new Booking({
      member,
      trainer,
      date: new Date(date),
      time,
      duration: duration || 60,
      sessionType: sessionType || 'personal-training',
      notes: notes || '',
      price: parseFloat(price),
      status: 'pending'
    });

    await booking.save();

    // Populate the booking for response
    const populatedBooking = await Booking.findById(booking._id)
      .populate('member', 'name email')
      .populate('trainer', 'name email');

    res.status(201).json({
      success: true,
      data: populatedBooking,
      message: 'Booking created successfully'
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking'
    });
  }
};

// Update booking (admin only)
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { member, trainer, date, time, duration, sessionType, notes, price, status } = req.body;

    // Find the booking
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Validate trainer and member if they're being updated
    if (trainer && trainer !== booking.trainer.toString()) {
      const trainerExists = await User.findById(trainer);
      if (!trainerExists || trainerExists.role !== 'trainer') {
        return res.status(400).json({
          success: false,
          message: 'Invalid trainer selected'
        });
      }
    }

    if (member && member !== booking.member.toString()) {
      const memberExists = await User.findById(member);
      if (!memberExists || memberExists.role !== 'member') {
        return res.status(400).json({
          success: false,
          message: 'Invalid member selected'
        });
      }
    }

    // Check for scheduling conflicts if date/time is being changed
    if ((date && date !== booking.date) || (time && time !== booking.time) || (trainer && trainer !== booking.trainer.toString())) {
      const existingBooking = await Booking.findOne({
        _id: { $ne: id },
        trainer: trainer || booking.trainer,
        date: new Date(date || booking.date),
        time: time || booking.time,
        status: { $in: ['pending', 'confirmed'] }
      });

      if (existingBooking) {
        return res.status(400).json({
          success: false,
          message: 'Trainer is already booked at this time'
        });
      }
    }

    // Update the booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      {
        ...(member && { member }),
        ...(trainer && { trainer }),
        ...(date && { date: new Date(date) }),
        ...(time && { time }),
        ...(duration && { duration: parseInt(duration) }),
        ...(sessionType && { sessionType }),
        ...(notes !== undefined && { notes }),
        ...(price && { price: parseFloat(price) }),
        ...(status && { status })
      },
      { new: true }
    ).populate('member', 'name email').populate('trainer', 'name email');

    res.json({
      success: true,
      data: updatedBooking,
      message: 'Booking updated successfully'
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating booking'
    });
  }
};

// Delete booking (admin only)
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    await Booking.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting booking'
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserStatus,
  updateUserRole,
  deleteUser,
  assignTrainer,
  getAuditLogs,
  getDashboardStats,
  getAllBookings,
  getTrainerPerformance,
  getAllWorkouts,
  createUser,
  updateUser,
  createBooking,
  updateBooking,
  deleteBooking
};
