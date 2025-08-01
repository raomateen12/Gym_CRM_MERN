const express = require('express');
const {
  getUsers,
  getUserById,
  updateUserRole,
  updateUserStatus,
  deleteUser,
  getUsersByRole,
  getDashboardStats
} = require('../controllers/userController');
const { 
  protect, 
  authorize, 
  authorizeOwnerOrRole, 
  adminOnly, 
  trainerOrAdmin 
} = require('../middleware/auth');

const router = express.Router();

// Dashboard route - role-based access
router.get('/dashboard', protect, getDashboardStats);

// Get all users - Admin only
router.get('/', protect, adminOnly, getUsers);

// Get users by role - Admin and Trainer can access
router.get('/role/:role', protect, trainerOrAdmin, getUsersByRole);

// Get user by ID - Admin or own profile
router.get('/:id', protect, authorizeOwnerOrRole('admin'), getUserById);

// Update user role - Admin only
router.put('/:id/role', protect, adminOnly, updateUserRole);

// Update user status (activate/deactivate) - Admin only
router.put('/:id/status', protect, adminOnly, updateUserStatus);

// Delete user - Admin only
router.delete('/:id', protect, adminOnly, deleteUser);

module.exports = router;
