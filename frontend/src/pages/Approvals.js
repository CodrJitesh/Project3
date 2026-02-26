import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { leaveAPI } from '../utils/api';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import toast from 'react-hot-toast';

const Approvals = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [reviewModal, setReviewModal] = useState({ show: false, leave: null, comment: '' });

  const fetchLeaves = useCallback(async () => {
    try {
      const endpoint = user.role === 'admin' ? leaveAPI.getAllLeaves : leaveAPI.getTeamLeaves;
      const { data } = await endpoint();
      setLeaves(data);
    } catch (error) {
      toast.error('Failed to fetch leave requests');
    } finally {
      setLoading(false);
    }
  }, [user.role]);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const handleReview = async (status) => {
    try {
      await leaveAPI.updateStatus(reviewModal.leave._id, {
        status,
        reviewComment: reviewModal.comment
      });
      toast.success(`Leave ${status} successfully`);
      setReviewModal({ show: false, leave: null, comment: '' });
      fetchLeaves();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const filteredLeaves = leaves.filter(leave => leave.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-accent-success bg-accent-success/10';
      case 'rejected': return 'text-accent-danger bg-accent-danger/10';
      default: return 'text-accent-warning bg-accent-warning/10';
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen dark:bg-dark-bg bg-light-bg">
        <Sidebar />
        <div className="flex-1 ml-64">
          <TopBar title="Approvals" />
          <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
            <div className="w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen dark:bg-dark-bg bg-light-bg">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64 flex flex-col">
        <TopBar 
          title="Leave Approvals"
          subtitle="Review and manage leave requests from your team"
        />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect rounded-xl p-2 inline-flex w-full sm:w-auto overflow-x-auto"
            >
              {['pending', 'approved', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 sm:px-6 py-2.5 rounded-lg capitalize font-medium transition-all whitespace-nowrap ${
                    filter === status
                      ? 'bg-accent-primary text-white shadow-lg'
                      : 'dark:text-dark-muted text-light-muted dark:hover:text-dark-text hover:text-light-text'
                  }`}
                >
                  {status}
                </button>
              ))}
            </motion.div>

            {/* Leave Requests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              {filteredLeaves.length === 0 ? (
                <div className="glass-effect rounded-2xl p-16 text-center">
                  <svg className="w-16 h-16 mx-auto dark:text-dark-muted text-light-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="dark:text-dark-muted text-light-muted text-lg">No {filter} requests</p>
                </div>
              ) : (
                filteredLeaves.map((leave) => (
                  <div key={leave._id} className="glass-effect rounded-2xl p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                      <div className="flex-1 w-full">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-base md:text-lg font-semibold dark:text-dark-text text-light-text">
                            {leave.employeeId.name}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(leave.status)}`}>
                            {leave.status}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm dark:text-dark-muted text-light-muted break-all">
                          {leave.employeeId.email} • {leave.employeeId.department}
                        </p>
                      </div>
                      {leave.status === 'pending' && (
                        <button
                          onClick={() => setReviewModal({ show: true, leave, comment: '' })}
                          className="w-full sm:w-auto px-5 py-2.5 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-xl transition-all text-sm font-medium shadow-lg hover:shadow-xl"
                        >
                          Review
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 p-3 md:p-4 dark:bg-dark-elevated bg-light-elevated rounded-xl mb-4">
                      <div>
                        <p className="text-xs dark:text-dark-muted text-light-muted mb-1">Leave Type</p>
                        <p className="text-sm dark:text-dark-text text-light-text capitalize font-medium">{leave.leaveType}</p>
                      </div>
                      <div>
                        <p className="text-xs dark:text-dark-muted text-light-muted mb-1">Duration</p>
                        <p className="text-sm dark:text-dark-text text-light-text font-medium">{leave.totalDays} days</p>
                      </div>
                      <div>
                        <p className="text-xs dark:text-dark-muted text-light-muted mb-1">Dates</p>
                        <p className="text-sm dark:text-dark-text text-light-text font-medium break-words">
                          {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 dark:bg-dark-elevated bg-light-elevated rounded-xl">
                      <p className="text-xs dark:text-dark-muted text-light-muted mb-2">Reason</p>
                      <p className="text-sm dark:text-dark-text text-light-text">{leave.reason}</p>
                    </div>

                    {leave.reviewComment && (
                      <div className="mt-4 p-4 dark:bg-dark-elevated bg-light-elevated rounded-xl border-l-4 border-accent-primary">
                        <p className="text-xs dark:text-dark-muted text-light-muted mb-2">Review Comment</p>
                        <p className="text-sm dark:text-dark-text text-light-text">{leave.reviewComment}</p>
                        <p className="text-xs dark:text-dark-muted text-light-muted mt-2">
                          By {leave.reviewedBy?.name} on {new Date(leave.reviewedAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {reviewModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg dark:bg-dark-surface bg-light-surface rounded-2xl shadow-2xl p-4 md:p-6"
          >
            <h3 className="text-lg md:text-xl font-semibold dark:text-dark-text text-light-text mb-4">Review Leave Request</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium dark:text-dark-muted text-light-muted mb-2">
                Comment (Optional)
              </label>
              <textarea
                value={reviewModal.comment}
                onChange={(e) => setReviewModal({ ...reviewModal, comment: e.target.value })}
                rows={4}
                placeholder="Add a comment..."
                className="w-full px-4 py-3 dark:bg-dark-elevated bg-light-elevated border dark:border-dark-border border-light-border rounded-xl dark:text-dark-text text-light-text dark:placeholder-dark-muted placeholder-light-muted focus:outline-none focus:border-accent-primary transition-colors resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleReview('approved')}
                className="flex-1 py-3 bg-green-800 hover:bg-green-800/90 text-white rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                Approve
              </button>
              <button
                onClick={() => handleReview('rejected')}
                className="flex-1 py-3 bg-red-800 hover:bg-red-800/90 text-white rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                Reject
              </button>
              <button
                onClick={() => setReviewModal({ show: false, leave: null, comment: '' })}
                className="w-full sm:w-auto px-6 py-3 dark:bg-dark-elevated bg-light-elevated dark:hover:bg-dark-border hover:bg-light-border dark:text-dark-text text-light-text rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Approvals;
