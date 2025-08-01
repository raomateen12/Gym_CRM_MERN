const { body, param, validationResult } = require('express-validator');

// Validation rules for creating a booking
const validateCreateBooking = [
  body('trainer')
    .isMongoId()
    .withMessage('Please provide a valid trainer ID'),
  
  body('date')
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid date')
    .custom((value) => {
      const bookingDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (bookingDate < today) {
        throw new Error('Cannot book sessions in the past');
      }
      
      // Don't allow bookings more than 3 months in advance
      const threeMonthsFromNow = new Date();
      threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
      
      if (bookingDate > threeMonthsFromNow) {
        throw new Error('Cannot book sessions more than 3 months in advance');
      }
      
      return true;
    }),
  
  body('time')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Please provide a valid time format (HH:MM)')
    .custom((value, { req }) => {
      const [hours, minutes] = value.split(':').map(Number);
      
      // Business hours: 6:00 AM to 10:00 PM
      if (hours < 6 || hours > 22 || (hours === 22 && minutes > 0)) {
        throw new Error('Bookings are only available between 6:00 AM and 10:00 PM');
      }
      
      // Check if the time is in the future if booking is for today
      const bookingDate = new Date(req.body.date);
      const today = new Date();
      
      if (bookingDate.toDateString() === today.toDateString()) {
        const bookingTime = new Date();
        bookingTime.setHours(hours, minutes, 0, 0);
        
        const oneHourFromNow = new Date();
        oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);
        
        if (bookingTime < oneHourFromNow) {
          throw new Error('Must book at least 1 hour in advance');
        }
      }
      
      return true;
    }),
  
  body('duration')
    .optional()
    .isInt({ min: 30, max: 180 })
    .withMessage('Duration must be between 30 and 180 minutes'),
  
  body('sessionType')
    .optional()
    .isIn(['personal-training', 'group-class', 'consultation', 'assessment'])
    .withMessage('Invalid session type'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters')
    .escape(),
  
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price cannot be negative')
];

// Validation rules for updating booking status
const validateUpdateBookingStatus = [
  body('status')
    .isIn(['pending', 'confirmed', 'cancelled', 'completed', 'no-show'])
    .withMessage('Invalid status'),
  
  body('cancellationReason')
    .if(body('status').equals('cancelled'))
    .notEmpty()
    .withMessage('Cancellation reason is required when cancelling a booking')
    .isLength({ max: 200 })
    .withMessage('Cancellation reason cannot exceed 200 characters')
    .escape(),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters')
    .escape()
];

// Validation for booking ID parameter
const validateBookingId = [
  param('id')
    .isMongoId()
    .withMessage('Please provide a valid booking ID')
];

// Validation for date query parameter
const validateDateQuery = [
  body('startDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid start date'),
  
  body('endDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid end date')
    .custom((value, { req }) => {
      if (req.body.startDate && value < new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    })
];

// Middleware to handle validation errors
const handleBookingValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  
  next();
};

module.exports = {
  validateCreateBooking,
  validateUpdateBookingStatus,
  validateBookingId,
  validateDateQuery,
  handleBookingValidationErrors
};
