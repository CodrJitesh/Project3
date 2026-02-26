const Leave = require('../models/Leave');
const User = require('../models/User');

exports.createLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    if (totalDays <= 0) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    const user = await User.findById(req.user._id);
    if (user.leaveBalance < totalDays) {
      return res.status(400).json({ message: 'Insufficient leave balance' });
    }

    const leave = await Leave.create({
      employeeId: req.user._id,
      leaveType,
      startDate,
      endDate,
      reason,
      totalDays
    });

    const populatedLeave = await Leave.findById(leave._id).populate('employeeId', 'name email department');

    res.status(201).json(populatedLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.user._id })
      .populate('reviewedBy', 'name')
      .sort('-createdAt');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate('employeeId', 'name email department role')
      .populate('reviewedBy', 'name')
      .sort('-createdAt');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTeamLeaves = async (req, res) => {
  try {
    const teamMembers = await User.find({ managerId: req.user._id });
    const teamIds = teamMembers.map(member => member._id);

    const leaves = await Leave.find({ employeeId: { $in: teamIds } })
      .populate('employeeId', 'name email department role')
      .populate('reviewedBy', 'name')
      .sort('-createdAt');
    
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status, reviewComment } = req.body;
    const leave = await Leave.findById(req.params.id).populate('employeeId', 'role _id');

    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    if (leave.status !== 'pending') {
      return res.status(400).json({ message: 'Leave request already reviewed' });
    }

    // Check hierarchy: Only admin can approve manager's leave
    if (leave.employeeId.role === 'manager' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can approve manager leave requests' });
    }

    // Check hierarchy: Admin can only approve other admin's leave (not their own)
    if (leave.employeeId.role === 'admin') {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Only admin can approve admin leave requests' });
      }
      if (leave.employeeId._id.toString() === req.user._id.toString()) {
        return res.status(403).json({ message: 'You cannot approve your own leave request' });
      }
    }

    leave.status = status;
    leave.reviewedBy = req.user._id;
    leave.reviewedAt = Date.now();
    leave.reviewComment = reviewComment || '';

    await leave.save();

    if (status === 'approved') {
      await User.findByIdAndUpdate(leave.employeeId, {
        $inc: { leaveBalance: -leave.totalDays }
      });
    }

    const updatedLeave = await Leave.findById(leave._id)
      .populate('employeeId', 'name email department')
      .populate('reviewedBy', 'name');

    res.json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLeaveStats = async (req, res) => {
  try {
    let query = {};
    
    // All users (including admin) see their own leave stats
    if (req.user.role === 'employee' || req.user.role === 'manager' || req.user.role === 'admin') {
      query.employeeId = req.user._id;
    }

    const stats = await Leave.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const total = await Leave.countDocuments(query);

    const formattedStats = {
      total,
      pending: stats.find(s => s._id === 'pending')?.count || 0,
      approved: stats.find(s => s._id === 'approved')?.count || 0,
      rejected: stats.find(s => s._id === 'rejected')?.count || 0
    };

    res.json(formattedStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
