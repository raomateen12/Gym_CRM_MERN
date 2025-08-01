const express = require('express');
const {
  getMemberDashboard,
  getTrainerDashboard,
  getAdminDashboard
} = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protect all routes - must be authenticated
router.use(protect);

// Member dashboard route
router.get('/member', authorize('member'), getMemberDashboard);

// Trainer dashboard route  
router.get('/trainer', authorize('trainer'), getTrainerDashboard);

// Admin dashboard route
router.get('/admin', authorize('admin'), getAdminDashboard);

module.exports = router;
