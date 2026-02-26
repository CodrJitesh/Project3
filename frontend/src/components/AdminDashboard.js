import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { leaveAPI } from '../utils/api';
import StatsCircles from './StatsCircles';
import LeaveFormModal from './LeaveFormModal';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [analyticsRes, statsRes] = await Promise.all([
        axios.get('http://localhost:8000/api/analytics/admin', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        leaveAPI.getStats()
      ]);
      setAnalytics(analyticsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading || !analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return (
    <div className="space-y-6">
      {/* Stats Constellation - Company Wide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl p-4 md:p-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <div>
            <h3 className="text-base md:text-lg font-light dark:text-white text-gray-900">Company Leave Overview</h3>
            <p className="text-xs dark:text-slate-500 text-gray-500">All leave requests across the organization</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl transition-all font-medium shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Request Leave</span>
          </button>
        </div>
        <StatsCircles stats={stats} />
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-2xl p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-light dark:text-white text-gray-900 mb-1">{analytics.overview.totalUsers}</h3>
          <p className="text-xs md:text-sm dark:text-slate-500 text-gray-500">Total Employees</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel rounded-2xl p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-light dark:text-white text-gray-900 mb-1">{analytics.overview.inOffice}</h3>
          <p className="text-xs md:text-sm dark:text-slate-500 text-gray-500">In Office Today</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel rounded-2xl p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-light dark:text-white text-gray-900 mb-1">{analytics.overview.onLeaveToday}</h3>
          <p className="text-xs md:text-sm dark:text-slate-500 text-gray-500">On Leave Today</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel rounded-2xl p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-light dark:text-white text-gray-900 mb-1">{analytics.overview.currentMonthLeaves}</h3>
          <p className="text-xs md:text-sm dark:text-slate-500 text-gray-500">This Month</p>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leave Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel rounded-2xl p-4 md:p-6"
        >
          <h3 className="text-base md:text-lg font-light dark:text-white text-gray-900 mb-4 md:mb-6">Leave Trend (6 Months)</h3>
          <div className="h-48 md:h-64 flex items-end justify-between space-x-1 md:space-x-2">
            {analytics.leaveTrend.map((item, index) => {
              const maxCount = Math.max(...analytics.leaveTrend.map(t => t.count), 1);
              const height = maxCount > 0 ? Math.max((item.count / maxCount) * 100, 5) : 5;
              const month = item.month.split('-')[1];
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="w-full bg-gradient-to-t from-primary to-blue-400 rounded-t-lg relative group min-h-[8px]"
                    style={{ height: `${height}%` }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] md:text-xs dark:text-slate-400 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.count}
                    </span>
                  </motion.div>
                  <span className="text-[10px] md:text-xs dark:text-slate-500 text-gray-500 mt-2">{monthNames[parseInt(month) - 1]}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Department Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-panel rounded-2xl p-4 md:p-6"
        >
          <h3 className="text-base md:text-lg font-light dark:text-white text-gray-900 mb-4 md:mb-6">Top Departments by Leave Requests</h3>
          <div className="space-y-4">
            {analytics.topDepartments.map((dept, index) => {
              const maxCount = analytics.topDepartments[0]?.count || 1;
              const percentage = (dept.count / maxCount) * 100;
              const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 'bg-pink-500'];
              
              return (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="dark:text-slate-300 text-gray-700">{dept.department}</span>
                    <span className="dark:text-slate-500 text-gray-500">{dept.count} requests</span>
                  </div>
                  <div className="h-2 dark:bg-white/5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className={`h-full ${colors[index % colors.length]} rounded-full`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Leave Types Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-panel rounded-2xl p-4 md:p-6"
      >
        <h3 className="text-base md:text-lg font-light dark:text-white text-gray-900 mb-4 md:mb-6">Leave Types Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {Object.entries(analytics.leavesByType).map(([type, count]) => (
            <div key={type} className="text-center p-3 md:p-4 dark:bg-white/5 bg-gray-50 rounded-xl">
              <div className="text-2xl md:text-3xl font-light dark:text-white text-gray-900 mb-1">{count}</div>
              <div className="text-xs md:text-sm dark:text-slate-500 text-gray-500 capitalize">{type}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <LeaveFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchData}
      />
    </div>
  );
};

export default AdminDashboard;
