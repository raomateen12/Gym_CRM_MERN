const ProgressEntry = require('../models/ProgressEntry');
const User = require('../models/User');
const mongoose = require('mongoose');

// @desc    Create progress entry
// @route   POST /api/progress
// @access  Private/Member
const createProgressEntry = async (req, res) => {
  try {
    const progressData = {
      ...req.body,
      member: req.user._id
    };

    // Check if entry already exists for this date
    const existingEntry = await ProgressEntry.findOne({
      member: req.user._id,
      date: progressData.date || new Date().toDateString()
    });

    if (existingEntry) {
      return res.status(409).json({
        success: false,
        error: 'Progress entry already exists for this date. Use update instead.'
      });
    }

    const progressEntry = await ProgressEntry.create(progressData);

    res.status(201).json({
      success: true,
      message: 'Progress entry created successfully',
      progressEntry
    });
  } catch (error) {
    console.error('Create progress entry error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: 'Progress entry already exists for this date'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error creating progress entry'
    });
  }
};

// @desc    Get member's progress entries
// @route   GET /api/progress
// @access  Private/Member
const getMemberProgress = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      limit = 50,
      page = 1,
      sortBy = 'date',
      sortOrder = 'desc'
    } = req.query;

    // Build filter
    const filter = { member: req.user._id };
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const progressEntries = await ProgressEntry.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalEntries = await ProgressEntry.countDocuments(filter);

    // Get progress summary
    const summary = await ProgressEntry.getProgressSummary(
      req.user._id,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined
    );

    res.status(200).json({
      success: true,
      count: progressEntries.length,
      totalEntries,
      totalPages: Math.ceil(totalEntries / limit),
      currentPage: parseInt(page),
      summary,
      progressEntries
    });
  } catch (error) {
    console.error('Get member progress error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching progress entries'
    });
  }
};

// @desc    Get progress entry by ID
// @route   GET /api/progress/:id
// @access  Private
const getProgressById = async (req, res) => {
  try {
    const progressEntry = await ProgressEntry.findById(req.params.id);

    if (!progressEntry) {
      return res.status(404).json({
        success: false,
        error: 'Progress entry not found'
      });
    }

    // Check authorization
    const isMember = req.user.role === 'member' && progressEntry.belongsToUser(req.user._id);
    const canViewPrivate = !progressEntry.isPrivate;
    const isAuthorizedToView = req.user.role === 'admin' || 
                              (req.user.role === 'trainer' && canViewPrivate);

    if (!isMember && !isAuthorizedToView) {
      return res.status(403).json({
        success: false,
        error: 'Access denied. You can only view your own progress entries'
      });
    }

    res.status(200).json({
      success: true,
      progressEntry
    });
  } catch (error) {
    console.error('Get progress by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching progress entry'
    });
  }
};

// @desc    Update progress entry
// @route   PUT /api/progress/:id
// @access  Private/Member (own entries only)
const updateProgressEntry = async (req, res) => {
  try {
    const progressEntry = await ProgressEntry.findById(req.params.id);

    if (!progressEntry) {
      return res.status(404).json({
        success: false,
        error: 'Progress entry not found'
      });
    }

    // Check if member owns this entry
    if (!progressEntry.belongsToUser(req.user._id)) {
      return res.status(403).json({
        success: false,
        error: 'You can only update your own progress entries'
      });
    }

    const updatedEntry = await ProgressEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Progress entry updated successfully',
      progressEntry: updatedEntry
    });
  } catch (error) {
    console.error('Update progress entry error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error updating progress entry'
    });
  }
};

// @desc    Delete progress entry
// @route   DELETE /api/progress/:id
// @access  Private/Member (own entries only)
const deleteProgressEntry = async (req, res) => {
  try {
    const progressEntry = await ProgressEntry.findById(req.params.id);

    if (!progressEntry) {
      return res.status(404).json({
        success: false,
        error: 'Progress entry not found'
      });
    }

    // Check if member owns this entry
    if (!progressEntry.belongsToUser(req.user._id)) {
      return res.status(403).json({
        success: false,
        error: 'You can only delete your own progress entries'
      });
    }

    await ProgressEntry.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Progress entry deleted successfully'
    });
  } catch (error) {
    console.error('Delete progress entry error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error deleting progress entry'
    });
  }
};

// @desc    Get member's progress (for trainers/admins)
// @route   GET /api/progress/member/:memberId
// @access  Private/Trainer,Admin
const getMemberProgressByTrainer = async (req, res) => {
  try {
    const { memberId } = req.params;
    const {
      startDate,
      endDate,
      limit = 50,
      page = 1,
      sortBy = 'date',
      sortOrder = 'desc'
    } = req.query;

    // Verify member exists
    const member = await User.findById(memberId);
    if (!member || member.role !== 'member') {
      return res.status(404).json({
        success: false,
        error: 'Member not found'
      });
    }

    // Build filter (exclude private entries for trainers)
    const filter = { member: memberId };
    if (req.user.role === 'trainer') {
      filter.isPrivate = { $ne: true };
    }
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const progressEntries = await ProgressEntry.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalEntries = await ProgressEntry.countDocuments(filter);

    // Get progress summary
    const summary = await ProgressEntry.getProgressSummary(
      memberId,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined
    );

    res.status(200).json({
      success: true,
      member: {
        id: member._id,
        name: member.name,
        email: member.email
      },
      count: progressEntries.length,
      totalEntries,
      totalPages: Math.ceil(totalEntries / limit),
      currentPage: parseInt(page),
      summary,
      progressEntries
    });
  } catch (error) {
    console.error('Get member progress by trainer error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching member progress'
    });
  }
};

// @desc    Get progress statistics
// @route   GET /api/progress/stats
// @access  Private/Member
const getProgressStats = async (req, res) => {
  try {
    const { timeframe = '30' } = req.query; // days
    const days = parseInt(timeframe);
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const stats = await ProgressEntry.aggregate([
      {
        $match: {
          member: req.user._id,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalEntries: { $sum: 1 },
          avgWeight: { $avg: '$weight' },
          avgBMI: { $avg: '$bmi' },
          avgEnergyLevel: { $avg: '$energyLevel' },
          avgSleepQuality: { $avg: '$sleepQuality' },
          avgStressLevel: { $avg: '$stressLevel' },
          totalWorkoutDuration: { $sum: '$workoutDuration' },
          totalCaloriesBurned: { $sum: '$caloriesBurned' },
          totalWaterIntake: { $sum: '$waterIntake' },
          firstEntry: { $first: '$$ROOT' },
          lastEntry: { $last: '$$ROOT' }
        }
      },
      {
        $addFields: {
          weightChange: {
            $cond: {
              if: { $and: ['$firstEntry.weight', '$lastEntry.weight'] },
              then: { $subtract: ['$lastEntry.weight', '$firstEntry.weight'] },
              else: 0
            }
          },
          bmiChange: {
            $cond: {
              if: { $and: ['$firstEntry.bmi', '$lastEntry.bmi'] },
              then: { $subtract: ['$lastEntry.bmi', '$firstEntry.bmi'] },
              else: 0
            }
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      timeframe: `${days} days`,
      stats: stats.length > 0 ? stats[0] : {
        totalEntries: 0,
        avgWeight: 0,
        avgBMI: 0,
        avgEnergyLevel: 0,
        avgSleepQuality: 0,
        avgStressLevel: 0,
        totalWorkoutDuration: 0,
        totalCaloriesBurned: 0,
        totalWaterIntake: 0,
        weightChange: 0,
        bmiChange: 0
      }
    });
  } catch (error) {
    console.error('Get progress stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching progress statistics'
    });
  }
};

// @desc    Get progress chart data
// @route   GET /api/progress/chart
// @access  Private/Member
const getProgressChartData = async (req, res) => {
  try {
    const { 
      metric = 'weight', 
      timeframe = '90', 
      groupBy = 'day' 
    } = req.query;
    
    const days = parseInt(timeframe);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Validate metric
    const validMetrics = ['weight', 'bmi', 'bodyFat', 'muscleMass', 'energyLevel', 'sleepQuality', 'stressLevel'];
    if (!validMetrics.includes(metric)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid metric specified'
      });
    }

    let groupFormat;
    switch (groupBy) {
      case 'week':
        groupFormat = { $dateToString: { format: "%Y-W%U", date: "$date" } };
        break;
      case 'month':
        groupFormat = { $dateToString: { format: "%Y-%m", date: "$date" } };
        break;
      default: // day
        groupFormat = { $dateToString: { format: "%Y-%m-%d", date: "$date" } };
    }

    const chartData = await ProgressEntry.aggregate([
      {
        $match: {
          member: req.user._id,
          date: { $gte: startDate },
          [metric]: { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: groupFormat,
          value: { $avg: `$${metric}` },
          count: { $sum: 1 },
          date: { $first: '$date' }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $project: {
          _id: 0,
          period: '$_id',
          value: { $round: ['$value', 2] },
          count: 1,
          date: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      metric,
      timeframe: `${days} days`,
      groupBy,
      chartData
    });
  } catch (error) {
    console.error('Get progress chart data error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching chart data'
    });
  }
};

module.exports = {
  createProgressEntry,
  getMemberProgress,
  getProgressById,
  updateProgressEntry,
  deleteProgressEntry,
  getMemberProgressByTrainer,
  getProgressStats,
  getProgressChartData
};
