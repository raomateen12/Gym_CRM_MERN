const Booking = require('../models/Booking');
const User = require('../models/User');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private/Member
const createBooking = async (req, res) => {
  try {
    const { trainer, date, time, duration, sessionType, notes, price } = req.body;

    // Verify trainer exists and has role 'trainer'
    const trainerUser = await User.findById(trainer);
    if (!trainerUser) {
      return res.status(404).json({
        success: false,
        error: 'Trainer not found'
      });
    }

    if (trainerUser.role !== 'trainer') {
      return res.status(400).json({
        success: false,
        error: 'Selected user is not a trainer'
      });
    }

    // Check if trainer is available at the requested time
    const existingBooking = await Booking.findOne({
      trainer,
      date: new Date(date),
      time,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        error: 'Trainer is not available at the requested time'
      });
    }

    // Check if member already has a booking at the same time
    const memberConflict = await Booking.findOne({
      member: req.user._id,
      date: new Date(date),
      time,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (memberConflict) {
      return res.status(409).json({
        success: false,
        error: 'You already have a booking at this time'
      });
    }

    // Create the booking
    const booking = await Booking.create({
      member: req.user._id,
      trainer,
      date: new Date(date),
      time,
      duration: duration || 60,
      sessionType: sessionType || 'personal-training',
      notes,
      price: price || 0
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    
    // Handle duplicate key error (booking conflict)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: 'Time slot is already booked'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error creating booking'
    });
  }
};

// @desc    Get member's bookings
// @route   GET /api/bookings/my
// @access  Private/Member
const getMemberBookings = async (req, res) => {
  try {
    const { status, startDate, endDate, page = 1, limit = 10 } = req.query;
    
    // Build filter
    const filter = { member: req.user._id };
    
    if (status) {
      filter.status = status;
    }
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const bookings = await Booking.find(filter)
      .sort({ date: 1, time: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalBookings = await Booking.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: bookings.length,
      totalBookings,
      totalPages: Math.ceil(totalBookings / limit),
      currentPage: parseInt(page),
      bookings
    });
  } catch (error) {
    console.error('Get member bookings error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching your bookings'
    });
  }
};

// @desc    Get trainer's bookings
// @route   GET /api/bookings/trainer
// @access  Private/Trainer
const getTrainerBookings = async (req, res) => {
  try {
    const { status, startDate, endDate, page = 1, limit = 10 } = req.query;
    
    // Build filter
    const filter = { trainer: req.user._id };
    
    if (status) {
      filter.status = status;
    }
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const bookings = await Booking.find(filter)
      .sort({ date: 1, time: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalBookings = await Booking.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: bookings.length,
      totalBookings,
      totalPages: Math.ceil(totalBookings / limit),
      currentPage: parseInt(page),
      bookings
    });
  } catch (error) {
    console.error('Get trainer bookings error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching trainer bookings'
    });
  }
};

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings
// @access  Private/Admin
const getAllBookings = async (req, res) => {
  try {
    const { status, trainerId, memberId, startDate, endDate, page = 1, limit = 10 } = req.query;
    
    // Build filter
    const filter = {};
    
    if (status) filter.status = status;
    if (trainerId) filter.trainer = trainerId;
    if (memberId) filter.member = memberId;
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const bookings = await Booking.find(filter)
      .sort({ date: 1, time: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalBookings = await Booking.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: bookings.length,
      totalBookings,
      totalPages: Math.ceil(totalBookings / limit),
      currentPage: parseInt(page),
      bookings
    });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching bookings'
    });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    // Check authorization
    const isMember = req.user.role === 'member' && booking.member._id.toString() === req.user._id.toString();
    const isTrainer = req.user.role === 'trainer' && booking.trainer._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isMember && !isTrainer && !isAdmin) {
      return res.status(403).json({
        success: false,
        error: 'Access denied. You can only view your own bookings'
      });
    }

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Get booking by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching booking'
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Trainer,Admin
const updateBookingStatus = async (req, res) => {
  try {
    const { status, cancellationReason, notes } = req.body;
    
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    // Check authorization - only trainer of the booking or admin can update
    if (req.user.role === 'trainer' && booking.trainer._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Trainers can only update their own bookings'
      });
    }

    // Prevent status changes for past bookings (except marking as completed or no-show)
    if (booking.isPast && !['completed', 'no-show'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Cannot change status of past bookings except to completed or no-show'
      });
    }

    const updateData = { status };
    
    if (status === 'cancelled') {
      updateData.cancellationReason = cancellationReason;
      updateData.cancelledBy = req.user._id;
    }
    
    if (notes) {
      updateData.notes = notes;
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: `Booking ${status} successfully`,
      booking: updatedBooking
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error updating booking status'
    });
  }
};

// @desc    Cancel booking (Member can cancel their own)
// @route   DELETE /api/bookings/:id
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const { cancellationReason } = req.body;
    
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    // Check authorization
    const isMember = req.user.role === 'member' && booking.member._id.toString() === req.user._id.toString();
    const isTrainer = req.user.role === 'trainer' && booking.trainer._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isMember && !isTrainer && !isAdmin) {
      return res.status(403).json({
        success: false,
        error: 'Access denied. You can only cancel your own bookings'
      });
    }

    // Check if booking can be cancelled
    if (!booking.canBeCancelled) {
      return res.status(400).json({
        success: false,
        error: 'Booking cannot be cancelled. Must cancel at least 24 hours in advance or booking is already past/cancelled'
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: 'cancelled',
        cancellationReason: cancellationReason || 'Cancelled by user',
        cancelledBy: req.user._id
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking: updatedBooking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error cancelling booking'
    });
  }
};

// @desc    Get booking statistics
// @route   GET /api/bookings/stats
// @access  Private/Trainer,Admin
const getBookingStats = async (req, res) => {
  try {
    let matchFilter = {};
    
    // If trainer, only show stats for their bookings
    if (req.user.role === 'trainer') {
      matchFilter.trainer = req.user._id;
    }

    const stats = await Booking.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          pendingBookings: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          confirmedBookings: {
            $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
          },
          cancelledBookings: {
            $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
          },
          completedBookings: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          totalRevenue: { $sum: '$price' },
          avgSessionDuration: { $avg: '$duration' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      stats: stats.length > 0 ? stats[0] : {
        totalBookings: 0,
        pendingBookings: 0,
        confirmedBookings: 0,
        cancelledBookings: 0,
        completedBookings: 0,
        totalRevenue: 0,
        avgSessionDuration: 0
      }
    });
  } catch (error) {
    console.error('Get booking stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching booking statistics'
    });
  }
};

// @desc    Get available trainers for a specific date/time
// @route   GET /api/bookings/available-trainers
// @access  Private/Member
const getAvailableTrainers = async (req, res) => {
  try {
    const { date, time } = req.query;

    if (!date || !time) {
      return res.status(400).json({
        success: false,
        error: 'Date and time are required'
      });
    }

    // Get all trainers
    const allTrainers = await User.find({ role: 'trainer', isActive: true });

    // Get trainers who are already booked at this time
    const bookedTrainers = await Booking.find({
      date: new Date(date),
      time,
      status: { $in: ['pending', 'confirmed'] }
    }).distinct('trainer');

    // Filter out booked trainers
    const availableTrainers = allTrainers.filter(
      trainer => !bookedTrainers.some(bookedId => bookedId.toString() === trainer._id.toString())
    );

    res.status(200).json({
      success: true,
      count: availableTrainers.length,
      trainers: availableTrainers
    });
  } catch (error) {
    console.error('Get available trainers error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching available trainers'
    });
  }
};

module.exports = {
  createBooking,
  getMemberBookings,
  getTrainerBookings,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
  getBookingStats,
  getAvailableTrainers
};
