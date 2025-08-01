const express = require('express');
const {
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
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');
const { body, param, query } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// Protect all routes - must be authenticated admin
router.use(protect);
router.use(authorize('admin'));

// Validation middleware for admin routes
const validateUserId = [
  param('id')
    .isMongoId()
    .withMessage('Please provide a valid user ID')
];

const validateUserStatus = [
  body('status')
    .isIn(['active', 'banned', 'deactivated'])
    .withMessage('Status must be active, banned, or deactivated')
];

const validateUserRole = [
  body('role')
    .isIn(['admin', 'trainer', 'member'])
    .withMessage('Role must be admin, trainer, or member')
];

const validateTrainerAssignment = [
  body('trainerId')
    .optional()
    .isMongoId()
    .withMessage('Please provide a valid trainer ID')
];

const validateUserQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('role')
    .optional()
    .isIn(['admin', 'trainer', 'member'])
    .withMessage('Role must be admin, trainer, or member'),
  query('status')
    .optional()
    .isIn(['active', 'banned', 'deactivated'])
    .withMessage('Status must be active, banned, or deactivated'),
  query('search')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search term must be between 1 and 100 characters')
    .escape(),
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'name', 'email', 'role', 'status'])
    .withMessage('Invalid sort field'),
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc')
];

const validateAuditQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('action')
    .optional()
    .isIn(['STATUS_UPDATE', 'ROLE_UPDATE', 'SOFT_DELETE', 'HARD_DELETE', 'TRAINER_ASSIGNMENT'])
    .withMessage('Invalid action type'),
  query('adminId')
    .optional()
    .isMongoId()
    .withMessage('Please provide a valid admin ID')
];

// User management routes
router.get('/users', validateUserQuery, handleValidationErrors, getAllUsers);
router.post('/users', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['admin', 'trainer', 'member']).withMessage('Invalid role'),
  body('phone').isMobilePhone().withMessage('Please provide a valid phone number'),
  handleValidationErrors
], createUser);
router.get('/users/:id', validateUserId, handleValidationErrors, getUserById);
router.put('/users/:id', [
  ...validateUserId,
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('role').optional().isIn(['admin', 'trainer', 'member']).withMessage('Invalid role'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  handleValidationErrors
], updateUser);

// User status and role management
router.put('/users/:id/status', [
  ...validateUserId,
  ...validateUserStatus,
  handleValidationErrors
], updateUserStatus);

router.put('/users/:id/role', [
  ...validateUserId,
  ...validateUserRole,
  handleValidationErrors
], updateUserRole);

// Trainer assignment
router.put('/users/:id/assign-trainer', [
  ...validateUserId,
  ...validateTrainerAssignment,
  handleValidationErrors
], assignTrainer);

// User deletion
router.delete('/users/:id', [
  ...validateUserId,
  body('hardDelete')
    .optional()
    .isBoolean()
    .withMessage('hardDelete must be a boolean'),
  handleValidationErrors
], deleteUser);

// Audit logs
router.get('/audit-logs', validateAuditQuery, handleValidationErrors, getAuditLogs);

// Dashboard stats
router.get('/dashboard-stats', getDashboardStats);

// Bookings management
router.get('/bookings', getAllBookings);
router.post('/bookings', createBooking);
router.put('/bookings/:id', updateBooking);
router.delete('/bookings/:id', deleteBooking);

// Trainer performance
router.get('/trainer-performance', getTrainerPerformance);

// Workout plans
router.get('/workouts', getAllWorkouts);

module.exports = router;
