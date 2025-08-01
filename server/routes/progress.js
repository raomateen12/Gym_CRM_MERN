const express = require('express');
const {
  createProgressEntry,
  getMemberProgress,
  getProgressById,
  updateProgressEntry,
  deleteProgressEntry,
  getMemberProgressByTrainer,
  getProgressStats,
  getProgressChartData
} = require('../controllers/progressController');
const { protect, authorize } = require('../middleware/auth');
const {
  validateProgressEntry,
  validateProgressUpdate,
  validateProgressQuery
} = require('../middleware/progressValidation');

const router = express.Router();

// Protect all routes
router.use(protect);

// Progress CRUD routes (Members only)
router
  .route('/')
  .post(authorize('member'), validateProgressEntry, createProgressEntry)
  .get(authorize('member'), validateProgressQuery, getMemberProgress);

// Progress statistics and chart data (Members only)
router.get('/stats', authorize('member'), getProgressStats);
router.get('/chart', authorize('member'), getProgressChartData);

// Get member progress by trainer/admin
router.get(
  '/member/:memberId',
  authorize('trainer', 'admin'),
  validateProgressQuery,
  getMemberProgressByTrainer
);

// Individual progress entry routes
router
  .route('/:id')
  .get(getProgressById)
  .put(authorize('member'), validateProgressUpdate, updateProgressEntry)
  .delete(authorize('member'), deleteProgressEntry);

module.exports = router;
