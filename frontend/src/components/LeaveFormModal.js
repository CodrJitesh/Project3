import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { leaveAPI } from '../utils/api';
import toast from 'react-hot-toast';

const LeaveFormModal = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const leaveTypes = [
    { value: 'sick', label: 'Sick Leave', icon: '🤒' },
    { value: 'casual', label: 'Casual Leave', icon: '☕' },
    { value: 'annual', label: 'Annual Leave', icon: '🏖️' },
    { value: 'unpaid', label: 'Unpaid Leave', icon: '📋' }
  ];

  const handleNext = () => {
    if (step === 1 && !formData.leaveType) {
      toast.error('Please select a leave type');
      return;
    }
    if (step === 2 && (!formData.startDate || !formData.endDate)) {
      toast.error('Please select both dates');
      return;
    }
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.reason.trim()) {
      toast.error('Please provide a reason');
      return;
    }

    setLoading(true);
    try {
      await leaveAPI.create(formData);
      toast.success('Leave request submitted successfully!');
      onSuccess();
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit leave request');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setFormData({ leaveType: '', startDate: '', endDate: '', reason: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-dark-surface rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="px-4 md:px-6 py-4 border-b border-dark-border flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-semibold text-dark-text">Request Leave</h2>
          <button
            onClick={handleClose}
            className="text-dark-muted hover:text-dark-text transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 md:px-6 py-4 bg-dark-elevated">
          <div className="flex items-center w-full mb-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  s <= step ? 'bg-accent-primary text-white' : 'bg-dark-border text-dark-muted'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-2 rounded transition-all ${
                    s < step ? 'bg-accent-primary' : 'bg-dark-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-dark-muted w-full">
            <span>Type</span>
            <span>Dates</span>
            <span>Details</span>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-base md:text-lg font-medium text-dark-text mb-4">Select Leave Type</h3>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {leaveTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, leaveType: type.value })}
                      className={`p-4 md:p-6 rounded-xl border-2 transition-all ${
                        formData.leaveType === type.value
                          ? 'border-accent-primary bg-accent-primary/10'
                          : 'border-dark-border hover:border-dark-muted bg-dark-elevated'
                      }`}
                    >
                      <div className="text-3xl md:text-4xl mb-2">{type.icon}</div>
                      <div className="text-xs md:text-sm font-medium text-dark-text">{type.label}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-base md:text-lg font-medium text-dark-text mb-4">Select Dates</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-muted mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-lg text-dark-text focus:outline-none focus:border-accent-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-muted mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      min={formData.startDate}
                      className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-lg text-dark-text focus:outline-none focus:border-accent-primary transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-base md:text-lg font-medium text-dark-text mb-4">Provide Details</h3>
                <div>
                  <label className="block text-sm font-medium text-dark-muted mb-2">
                    Reason for Leave
                  </label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    rows={6}
                    placeholder="Please provide a detailed reason for your leave request..."
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-lg text-dark-text placeholder-dark-muted focus:outline-none focus:border-accent-primary transition-colors resize-none"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between mt-6 md:mt-8 pt-4 md:pt-6 border-t border-dark-border gap-3">
            <button
              type="button"
              onClick={step === 1 ? handleClose : handleBack}
              className="w-full sm:w-auto px-6 py-2.5 bg-dark-elevated hover:bg-dark-border text-dark-text rounded-lg transition-colors order-2 sm:order-1"
            >
              {step === 1 ? 'Cancel' : 'Back'}
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto px-6 py-2.5 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-lg transition-colors order-1 sm:order-2"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-lg transition-colors disabled:opacity-50 order-1 sm:order-2"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LeaveFormModal;
