import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { leaveAPI } from '../utils/api';
import StatsCircles from './StatsCircles';
import LeaveFormModal from './LeaveFormModal';
import toast from 'react-hot-toast';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, leavesRes] = await Promise.all([
        leaveAPI.getStats(),
        leaveAPI.getMyLeaves()
      ]);
      setStats(statsRes.data);
      setLeaves(leavesRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'rejected': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Constellation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl p-4 md:p-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <div>
            <h3 className="text-base md:text-lg font-light dark:text-white text-gray-900">Leave Overview</h3>
            <p className="text-xs dark:text-slate-500 text-gray-500">Your leave request statistics</p>
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

      {/* Recent Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-3xl p-4 md:p-6"
      >
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-sm md:text-base font-medium dark:text-slate-200 text-gray-900">Latest Requests</h3>
          <button className="text-xs text-primary hover:text-primary/80 transition-colors">View All</button>
        </div>
        
        {leaves.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto dark:text-slate-600 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="dark:text-slate-500 text-gray-500 text-lg">No leave requests yet</p>
            <p className="dark:text-slate-600 text-gray-400 text-sm mt-2">Click "Request Leave" to get started</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {leaves.slice(0, 5).map((leave) => (
              <motion.div
                key={leave._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="group flex items-center justify-between p-3 md:p-4 rounded-2xl dark:hover:bg-white/5 hover:bg-gray-50 transition-all border dark:border-transparent hover:dark:border-white/5 border-gray-100"
              >
                <div className="flex items-center gap-3 md:gap-4 flex-1">
                  <div className="relative">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-semibold text-sm md:text-base">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className={`absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 dark:bg-surface-dark bg-white rounded-full flex items-center justify-center`}>
                      <span className={`w-2 md:w-2.5 h-2 md:h-2.5 rounded-full ${
                        leave.status === 'approved' ? 'bg-emerald-500' : 
                        leave.status === 'rejected' ? 'bg-red-500' : 'bg-amber-500'
                      }`}></span>
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="text-xs md:text-sm font-medium dark:text-white text-gray-900 capitalize truncate">
                        {leave.leaveType} Leave
                      </p>
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border capitalize ${getStatusColor(leave.status)}`}>
                        {leave.status}
                      </span>
                    </div>
                    <p className="text-[10px] md:text-[11px] dark:text-slate-500 text-gray-500 truncate">
                      {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()} • {leave.totalDays} {leave.totalDays === 1 ? 'day' : 'days'}
                    </p>
                  </div>
                </div>
                {leave.reviewedBy && (
                  <span className="text-[10px] px-2 py-1 rounded dark:bg-white/5 bg-gray-100 dark:text-slate-500 text-gray-500 hidden sm:inline">
                    Reviewed
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <LeaveFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchData}
      />
    </div>
  );
};

export default EmployeeDashboard;
