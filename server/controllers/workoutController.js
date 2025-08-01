const WorkoutPlan = require('../models/WorkoutPlan');
const User = require('../models/User');

// @desc    Create workout plan
// @route   POST /api/workouts
// @access  Private/Trainer,Admin
const createWorkout = async (req, res) => {
  try {
    const { title, description, member, exercises, difficulty, duration, endDate } = req.body;

    // Verify that the member exists and has role 'member'
    const memberUser = await User.findById(member);
    if (!memberUser) {
      return res.status(404).json({
        success: false,
        error: 'Member not found'
      });
    }

    if (memberUser.role !== 'member') {
      return res.status(400).json({
        success: false,
        error: 'Workout plans can only be assigned to members'
      });
    }

    // Create workout plan
    const workoutPlan = await WorkoutPlan.create({
      title,
      description,
      member,
      exercises,
      assignedBy: req.user._id,
      difficulty,
      duration,
      endDate
    });

    res.status(201).json({
      success: true,
      message: 'Workout plan created successfully',
      workoutPlan
    });
  } catch (error) {
    console.error('Create workout error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error creating workout plan'
    });
  }
};

// @desc    Get all workout plans (Admin/Trainer)
// @route   GET /api/workouts
// @access  Private/Trainer,Admin
const getAllWorkouts = async (req, res) => {
  try {
    const { page = 1, limit = 10, difficulty, isActive = true } = req.query;
    
    // Build filter object
    const filter = { isActive };
    if (difficulty) filter.difficulty = difficulty;

    // If trainer, only show workouts they created
    if (req.user.role === 'trainer') {
      filter.assignedBy = req.user._id;
    }

    const workouts = await WorkoutPlan.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const totalWorkouts = await WorkoutPlan.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: workouts.length,
      totalWorkouts,
      totalPages: Math.ceil(totalWorkouts / limit),
      currentPage: parseInt(page),
      workouts
    });
  } catch (error) {
    console.error('Get all workouts error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching workouts'
    });
  }
};

// @desc    Get member's workout plans
// @route   GET /api/workouts/member
// @access  Private/Member
const getMemberWorkouts = async (req, res) => {
  try {
    const { isActive = true } = req.query;
    
    const workouts = await WorkoutPlan.find({
      member: req.user._id,
      isActive
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: workouts.length,
      workouts
    });
  } catch (error) {
    console.error('Get member workouts error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching your workouts'
    });
  }
};

// @desc    Get workout plan by ID
// @route   GET /api/workouts/:id
// @access  Private/Trainer,Admin or assigned member
const getWorkoutById = async (req, res) => {
  try {
    const workout = await WorkoutPlan.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        error: 'Workout plan not found'
      });
    }

    // Check authorization
    const isAssignedMember = req.user.role === 'member' && workout.member._id.toString() === req.user._id.toString();
    const isAuthorizedTrainer = req.user.role === 'trainer' && workout.assignedBy._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isAssignedMember && !isAuthorizedTrainer && !isAdmin) {
      return res.status(403).json({
        success: false,
        error: 'Access denied. You can only view your own workouts or workouts you created'
      });
    }

    res.status(200).json({
      success: true,
      workout
    });
  } catch (error) {
    console.error('Get workout by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching workout'
    });
  }
};

// @desc    Update workout plan
// @route   PUT /api/workouts/:id
// @access  Private/Trainer,Admin
const updateWorkout = async (req, res) => {
  try {
    const workout = await WorkoutPlan.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        error: 'Workout plan not found'
      });
    }

    // Check if trainer can only update their own workouts
    if (req.user.role === 'trainer' && workout.assignedBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Trainers can only update their own workout plans'
      });
    }

    const updatedWorkout = await WorkoutPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Workout plan updated successfully',
      workout: updatedWorkout
    });
  } catch (error) {
    console.error('Update workout error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error updating workout plan'
    });
  }
};

// @desc    Delete workout plan
// @route   DELETE /api/workouts/:id
// @access  Private/Trainer,Admin
const deleteWorkout = async (req, res) => {
  try {
    const workout = await WorkoutPlan.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        error: 'Workout plan not found'
      });
    }

    // Check if trainer can only delete their own workouts
    if (req.user.role === 'trainer' && workout.assignedBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Trainers can only delete their own workout plans'
      });
    }

    await WorkoutPlan.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Workout plan deleted successfully'
    });
  } catch (error) {
    console.error('Delete workout error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error deleting workout plan'
    });
  }
};

// @desc    Get workout statistics
// @route   GET /api/workouts/stats
// @access  Private/Trainer,Admin
const getWorkoutStats = async (req, res) => {
  try {
    let matchFilter = {};
    
    // If trainer, only show stats for their workouts
    if (req.user.role === 'trainer') {
      matchFilter.assignedBy = req.user._id;
    }

    const stats = await WorkoutPlan.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: null,
          totalWorkouts: { $sum: 1 },
          activeWorkouts: {
            $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
          },
          avgExerciseCount: { $avg: { $size: '$exercises' } },
          difficultyBreakdown: {
            $push: '$difficulty'
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalWorkouts: 1,
          activeWorkouts: 1,
          inactiveWorkouts: { $subtract: ['$totalWorkouts', '$activeWorkouts'] },
          avgExerciseCount: { $round: ['$avgExerciseCount', 1] },
          difficultyBreakdown: 1
        }
      }
    ]);

    // Count difficulty levels
    const difficultyStats = {};
    if (stats.length > 0) {
      stats[0].difficultyBreakdown.forEach(difficulty => {
        difficultyStats[difficulty] = (difficultyStats[difficulty] || 0) + 1;
      });
    }

    res.status(200).json({
      success: true,
      stats: stats.length > 0 ? { ...stats[0], difficultyBreakdown: difficultyStats } : {
        totalWorkouts: 0,
        activeWorkouts: 0,
        inactiveWorkouts: 0,
        avgExerciseCount: 0,
        difficultyBreakdown: {}
      }
    });
  } catch (error) {
    console.error('Get workout stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching workout statistics'
    });
  }
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getMemberWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
  getWorkoutStats
};
