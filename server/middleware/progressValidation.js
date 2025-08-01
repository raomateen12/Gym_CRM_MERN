const { body, param, query, validationResult } = require('express-validator');

// Validation rules for creating progress entry
const validateCreateProgress = [
  body('date')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid date')
    .custom((value) => {
      const entryDate = new Date(value);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // End of today
      
      if (entryDate > today) {
        throw new Error('Cannot log progress for future dates');
      }
      
      // Don't allow entries older than 1 year
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      
      if (entryDate < oneYearAgo) {
        throw new Error('Cannot log progress for dates older than 1 year');
      }
      
      return true;
    }),
  
  body('weight')
    .optional()
    .isFloat({ min: 20, max: 300 })
    .withMessage('Weight must be between 20kg and 300kg'),
  
  body('bodyFat')
    .optional()
    .isFloat({ min: 5, max: 50 })
    .withMessage('Body fat percentage must be between 5% and 50%'),
  
  body('muscleMass')
    .optional()
    .isFloat({ min: 10, max: 150 })
    .withMessage('Muscle mass must be between 10kg and 150kg'),
  
  body('reps')
    .optional()
    .isInt({ min: 0, max: 10000 })
    .withMessage('Reps must be between 0 and 10000'),
  
  body('sets')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Sets must be between 0 and 100'),
  
  body('workoutDuration')
    .optional()
    .isInt({ min: 5, max: 300 })
    .withMessage('Workout duration must be between 5 and 300 minutes'),
  
  body('caloriesBurned')
    .optional()
    .isInt({ min: 0, max: 5000 })
    .withMessage('Calories burned must be between 0 and 5000'),
  
  body('bmi')
    .optional()
    .isFloat({ min: 10, max: 50 })
    .withMessage('BMI must be between 10 and 50'),
  
  body('height')
    .optional()
    .isFloat({ min: 100, max: 250 })
    .withMessage('Height must be between 100cm and 250cm'),
  
  body('waistCircumference')
    .optional()
    .isFloat({ min: 50, max: 200 })
    .withMessage('Waist circumference must be between 50cm and 200cm'),
  
  body('chestCircumference')
    .optional()
    .isFloat({ min: 60, max: 200 })
    .withMessage('Chest circumference must be between 60cm and 200cm'),
  
  body('armCircumference')
    .optional()
    .isFloat({ min: 15, max: 60 })
    .withMessage('Arm circumference must be between 15cm and 60cm'),
  
  body('legCircumference')
    .optional()
    .isFloat({ min: 30, max: 100 })
    .withMessage('Leg circumference must be between 30cm and 100cm'),
  
  body('fitnessGoal')
    .optional()
    .isIn(['weight-loss', 'weight-gain', 'muscle-building', 'endurance', 'strength', 'maintenance'])
    .withMessage('Invalid fitness goal'),
  
  body('energyLevel')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Energy level must be between 1 and 10'),
  
  body('sleepQuality')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Sleep quality must be between 1 and 10'),
  
  body('stressLevel')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Stress level must be between 1 and 10'),
  
  body('waterIntake')
    .optional()
    .isFloat({ min: 0, max: 20 })
    .withMessage('Water intake must be between 0 and 20 liters'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters')
    .escape(),
  
  body('isPrivate')
    .optional()
    .isBoolean()
    .withMessage('isPrivate must be a boolean value'),
  
  body('photos')
    .optional()
    .isArray()
    .withMessage('Photos must be an array'),
  
  body('photos.*.url')
    .optional()
    .isURL()
    .withMessage('Photo URL must be valid'),
  
  body('photos.*.description')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Photo description cannot exceed 200 characters')
    .escape()
];

// Validation rules for updating progress entry
const validateUpdateProgress = [
  body('date')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid date')
    .custom((value) => {
      const entryDate = new Date(value);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      
      if (entryDate > today) {
        throw new Error('Cannot log progress for future dates');
      }
      
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      
      if (entryDate < oneYearAgo) {
        throw new Error('Cannot log progress for dates older than 1 year');
      }
      
      return true;
    }),
  
  body('weight')
    .optional()
    .isFloat({ min: 20, max: 300 })
    .withMessage('Weight must be between 20kg and 300kg'),
  
  body('bodyFat')
    .optional()
    .isFloat({ min: 5, max: 50 })
    .withMessage('Body fat percentage must be between 5% and 50%'),
  
  body('muscleMass')
    .optional()
    .isFloat({ min: 10, max: 150 })
    .withMessage('Muscle mass must be between 10kg and 150kg'),
  
  body('reps')
    .optional()
    .isInt({ min: 0, max: 10000 })
    .withMessage('Reps must be between 0 and 10000'),
  
  body('sets')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Sets must be between 0 and 100'),
  
  body('workoutDuration')
    .optional()
    .isInt({ min: 5, max: 300 })
    .withMessage('Workout duration must be between 5 and 300 minutes'),
  
  body('caloriesBurned')
    .optional()
    .isInt({ min: 0, max: 5000 })
    .withMessage('Calories burned must be between 0 and 5000'),
  
  body('bmi')
    .optional()
    .isFloat({ min: 10, max: 50 })
    .withMessage('BMI must be between 10 and 50'),
  
  body('height')
    .optional()
    .isFloat({ min: 100, max: 250 })
    .withMessage('Height must be between 100cm and 250cm'),
  
  body('waistCircumference')
    .optional()
    .isFloat({ min: 50, max: 200 })
    .withMessage('Waist circumference must be between 50cm and 200cm'),
  
  body('chestCircumference')
    .optional()
    .isFloat({ min: 60, max: 200 })
    .withMessage('Chest circumference must be between 60cm and 200cm'),
  
  body('armCircumference')
    .optional()
    .isFloat({ min: 15, max: 60 })
    .withMessage('Arm circumference must be between 15cm and 60cm'),
  
  body('legCircumference')
    .optional()
    .isFloat({ min: 30, max: 100 })
    .withMessage('Leg circumference must be between 30cm and 100cm'),
  
  body('fitnessGoal')
    .optional()
    .isIn(['weight-loss', 'weight-gain', 'muscle-building', 'endurance', 'strength', 'maintenance'])
    .withMessage('Invalid fitness goal'),
  
  body('energyLevel')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Energy level must be between 1 and 10'),
  
  body('sleepQuality')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Sleep quality must be between 1 and 10'),
  
  body('stressLevel')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Stress level must be between 1 and 10'),
  
  body('waterIntake')
    .optional()
    .isFloat({ min: 0, max: 20 })
    .withMessage('Water intake must be between 0 and 20 liters'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters')
    .escape(),
  
  body('isPrivate')
    .optional()
    .isBoolean()
    .withMessage('isPrivate must be a boolean value'),
  
  body('photos')
    .optional()
    .isArray()
    .withMessage('Photos must be an array'),
  
  body('photos.*.url')
    .optional()
    .isURL()
    .withMessage('Photo URL must be valid'),
  
  body('photos.*.description')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Photo description cannot exceed 200 characters')
    .escape()
];

// Validation for progress entry ID parameter
const validateProgressId = [
  param('id')
    .isMongoId()
    .withMessage('Please provide a valid progress entry ID')
];

// Validation for member ID parameter
const validateMemberId = [
  param('memberId')
    .isMongoId()
    .withMessage('Please provide a valid member ID')
];

// Validation for date range queries
const validateDateRange = [
  query('startDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid start date'),
  
  query('endDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid end date')
    .custom((value, { req }) => {
      if (req.query.startDate && value < new Date(req.query.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('sortBy')
    .optional()
    .isIn(['date', 'weight', 'bmi', 'createdAt'])
    .withMessage('Invalid sort field'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc')
];

// Middleware to handle validation errors
const handleProgressValidationErrors = (req, res, next) => {
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
  validateProgressEntry: [
    ...validateCreateProgress,
    handleProgressValidationErrors
  ],
  validateProgressUpdate: [
    ...validateUpdateProgress,
    handleProgressValidationErrors
  ],
  validateProgressQuery: [
    validateDateRange,
    handleProgressValidationErrors
  ],
  validateProgressId,
  validateMemberId,
  validateDateRange,
  handleProgressValidationErrors
};
