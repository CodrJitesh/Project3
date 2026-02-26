const Leave = require('../models/Leave');
const User = require('../models/User');

exports.getAdminAnalytics = async (req, res) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments({ isActive: true });
    
    // Users by role
    const usersByRole = await User.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    // Users by department
    const usersByDepartment = await User.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$department', count: { $sum: 1 } } }
    ]);

    // Total leaves
    const totalLeaves = await Leave.countDocuments();
    
    // Leaves by status
    const leavesByStatus = await Leave.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Leaves by type
    const leavesByType = await Leave.aggregate([
      { $group: { _id: '$leaveType', count: { $sum: 1 } } }
    ]);

    // Current month leaves
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const currentMonthLeaves = await Leave.countDocuments({
      createdAt: { $gte: startOfMonth }
    });

    // People on leave today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const onLeaveToday = await Leave.countDocuments({
      status: 'approved',
      startDate: { $lte: tomorrow },
      endDate: { $gte: today }
    });

    // People in office (total active - on leave)
    const inOffice = totalUsers - onLeaveToday;

    // Leave trend for last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const leaveTrend = await Leave.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Top departments by leave requests
    const topDepartments = await Leave.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'employeeId',
          foreignField: '_id',
          as: 'employee'
        }
      },
      { $unwind: '$employee' },
      {
        $group: {
          _id: '$employee.department',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Average leave duration
    const avgDuration = await Leave.aggregate([
      {
        $group: {
          _id: null,
          avgDays: { $avg: '$totalDays' }
        }
      }
    ]);

    res.json({
      overview: {
        totalUsers,
        inOffice,
        onLeaveToday,
        totalLeaves,
        currentMonthLeaves,
        avgLeaveDuration: avgDuration[0]?.avgDays || 0
      },
      usersByRole: usersByRole.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      usersByDepartment: usersByDepartment.map(item => ({
        department: item._id,
        count: item.count
      })),
      leavesByStatus: leavesByStatus.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      leavesByType: leavesByType.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      leaveTrend: leaveTrend.map(item => ({
        month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
        count: item.count
      })),
      topDepartments: topDepartments.map(item => ({
        department: item._id,
        count: item.count
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
