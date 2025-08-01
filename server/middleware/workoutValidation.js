const { body, param, validationResult } = require('express-validator');

// Validation rules for creating workout plan
const validateCreateWorkout = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters')
    .escape(),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot be more than 500 characters')
    .escape(),
  
  body('member')
    .isMongoId()
    .withMessage('Please provide a valid member ID'),
  
  body('exercises')
    .isArray({ min: 1 })
    .withMessage('At least one exercise is required'),
  
  body('exercises.*.name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Exercise name must be between 2 and 100 characters')
    .escape(),
  
  body('exercises.*.sets')
    .isInt({ min: 1, max: 20 })
    .withMessage('Sets must be between 1 and 20'),
  
  body('exercises.*.reps')
    .isInt({ min: 1, max: 100 })
    .withMessage('Reps must be between 1 and 100'),
  
  body('exercises.*.weight')
    .optional()
    .isFloat({ min: 0, max: 1000 })
    .withMessage('Weight must be between 0 and 1000kg'),
  
  body('exercises.*.rest')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Rest time must be between 1 and 20 characters')
    .escape(),
  
  body('exercises.*.notes')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Notes cannot be more than 200 characters')
    .escape(),
  
  body('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Difficulty must be beginner, intermediate, or advanced'),
  
  body('duration')
    .optional()
    .isInt({ min: 10, max: 300 })
    .withMessage('Duration must be between 10 and 300 minutes'),
  
  body('endDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid end date')
];

// Validation rules for updating workout plan
const validateUpdateWorkout = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters')
    .escape(),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot be more than 500 characters')
    .escape(),
  
  body('exercises')
    .optional()
    .isArray({ min: 1 })
    .withMessage('At least one exercise is required if exercises are provided'),
  
  body('exercises.*.name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Exercise name must be between 2 and 100 characters')
    .escape(),
  
  body('exercises.*.sets')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('Sets must be between 1 and 20'),
  
  body('exercises.*.reps')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Reps must be between 1 and 100'),
  
  body('exercises.*.weight')
    .optional()
    .isFloat({ min: 0, max: 1000 })
    .withMessage('Weight must be between 0 and 1000kg'),
  
  body('exercises.*.rest')
    .optional()
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Rest time must be between 1 and 20 characters')
    .escape(),
  
  body('exercises.*.notes')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Notes cannot be more than 200 characters')
    .escape(),
  
  body('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Difficulty must be beginner, intermediate, or advanced'),
  
  body('duration')
    .optional()
    .isInt({ min: 10, max: 300 })
    .withMessage('Duration must be between 10 and 300 minutes'),
  
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean value'),
  
  body('endDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid end date')
];

// Validation for workout ID parameter
const validateWorkoutId = [
  param('id')
    .isMongoId()
    .withMessage('Please provide a valid workout ID')
];

// Middleware to handle validation errors
const handleWorkoutValidationErrors = (req, res, next) => {
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
  validateCreateWorkout,
  validateUpdateWorkout,
  validateWorkoutId,
  handleWorkoutValidationErrors
};
