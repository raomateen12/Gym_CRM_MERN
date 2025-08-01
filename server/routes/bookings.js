const express = require('express');
const {
  createBooking,
  getMemberBookings,
  getTrainerBookings,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
  getBookingStats,
  getAvailableTrainers
} = require('../controllers/bookingController');
const { protect, authorize, adminOnly, trainerOrAdmin } = require('../middleware/auth');
const {
  validateCreateBooking,
  validateUpdateBookingStatus,
  validateBookingId,
  handleBookingValidationErrors
} = require('../middleware/bookingValidation');

const router = express.Router();

// Get booking statistics - Trainer/Admin only
router.get('/stats', protect, trainerOrAdmin, getBookingStats);

// Get available trainers for specific date/time - Members only
router.get('/available-trainers', protect, authorize('member'), getAvailableTrainers);

// Get member's bookings - Members only
router.get('/my', protect, authorize('member'), getMemberBookings);

// Get trainer's bookings - Trainers only
router.get('/trainer', protect, authorize('trainer'), getTrainerBookings);

// Get all bookings - Admin only
router.get('/', protect, adminOnly, getAllBookings);

// Create booking - Members only
router.post('/', 
  protect, 
  authorize('member'), 
  validateCreateBooking, 
  handleBookingValidationErrors, 
  createBooking
);

// Get booking by ID - Role-based access (member, trainer, or admin)
router.get('/:id', 
  protect, 
  validateBookingId, 
  handleBookingValidationErrors, 
  getBookingById
);

// Update booking status - Trainer/Admin only
router.put('/:id/status', 
  protect, 
  trainerOrAdmin, 
  validateBookingId, 
  validateUpdateBookingStatus, 
  handleBookingValidationErrors, 
  updateBookingStatus
);

// Cancel booking - Member (own), Trainer (own), Admin (any)
router.delete('/:id', 
  protect, 
  validateBookingId, 
  handleBookingValidationErrors, 
  cancelBooking
);

module.exports = router;
