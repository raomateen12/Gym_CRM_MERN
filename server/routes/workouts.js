const express = require('express');
const {
  createWorkout,
  getAllWorkouts,
  getMemberWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
  getWorkoutStats
} = require('../controllers/workoutController');
const { protect, authorize, trainerOrAdmin } = require('../middleware/auth');
const {
  validateCreateWorkout,
  validateUpdateWorkout,
  validateWorkoutId,
  handleWorkoutValidationErrors
} = require('../middleware/workoutValidation');

const router = express.Router();

// Get workout statistics - Trainer/Admin only
router.get('/stats', protect, trainerOrAdmin, getWorkoutStats);

// Get member's workout plans - Members only
router.get('/member', protect, authorize('member'), getMemberWorkouts);

// Get all workout plans - Trainer/Admin only
router.get('/', protect, trainerOrAdmin, getAllWorkouts);

// Create workout plan - Trainer/Admin only
router.post('/', 
  protect, 
  trainerOrAdmin, 
  validateCreateWorkout, 
  handleWorkoutValidationErrors, 
  createWorkout
);

// Get workout plan by ID - Role-based access
router.get('/:id', 
  protect, 
  validateWorkoutId, 
  handleWorkoutValidationErrors, 
  getWorkoutById
);

// Update workout plan - Trainer/Admin only
router.put('/:id', 
  protect, 
  trainerOrAdmin, 
  validateWorkoutId, 
  validateUpdateWorkout, 
  handleWorkoutValidationErrors, 
  updateWorkout
);

// Delete workout plan - Trainer/Admin only
router.delete('/:id', 
  protect, 
  trainerOrAdmin, 
  validateWorkoutId, 
  handleWorkoutValidationErrors, 
  deleteWorkout
);

module.exports = router;
