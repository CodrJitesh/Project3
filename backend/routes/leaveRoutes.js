const express = require('express');
const {
  createLeave,
  getMyLeaves,
  getAllLeaves,
  getTeamLeaves,
  updateLeaveStatus,
  getLeaveStats
} = require('../controllers/leaveController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createLeave);
router.get('/my-leaves', protect, getMyLeaves);
router.get('/stats', protect, getLeaveStats);
router.get('/all', protect, authorize('admin'), getAllLeaves);
router.get('/team', protect, authorize('manager', 'admin'), getTeamLeaves);
router.patch('/:id/status', protect, authorize('manager', 'admin'), updateLeaveStatus);

module.exports = router;
