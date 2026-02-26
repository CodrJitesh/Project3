import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { userAPI } from '../utils/api';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import toast from 'react-hot-toast';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    role: 'employee',
    leaveBalance: 20
  });

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await userAPI.getAll();
      setUsers(data);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        toast.success('User created successfully!');
        setShowModal(false);
        setFormData({ name: '', email: '', password: '', department: '', role: 'employee', leaveBalance: 20 });
        fetchUsers();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to create user');
      }
    } catch (error) {
      toast.error('Failed to create user');
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'manager': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen dark:bg-background-dark bg-light-bg">
        <div className="absolute inset-0 z-0 bg-bokeh-mesh pointer-events-none"></div>
        <Sidebar />
        <div className="flex-1 lg:ml-64 relative z-10">
          <TopBar title="Users" />
          <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen dark:bg-background-dark bg-light-bg overflow-hidden">
      <div className="absolute inset-0 z-0 bg-bokeh-mesh pointer-events-none"></div>
      <Sidebar />
      
      <div className="flex-1 lg:ml-64 flex flex-col relative z-10">
        <TopBar 
          title="User Management"
          subtitle="Manage team members and permissions"
        />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h3 className="text-base md:text-lg font-light dark:text-white text-gray-900">Team Members</h3>
                <p className="text-xs dark:text-slate-500 text-gray-500">{users.length} total users</p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl transition-all font-medium shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add User</span>
              </button>
            </div>

            {/* Desktop Table View - Hidden on Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:block glass-panel rounded-3xl overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="dark:bg-surface-dark/50 bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium dark:text-slate-400 text-gray-600 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium dark:text-slate-400 text-gray-600 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium dark:text-slate-400 text-gray-600 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium dark:text-slate-400 text-gray-600 uppercase tracking-wider">
                        Leave Balance
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium dark:text-slate-400 text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-white/5 divide-gray-200">
                    {users.map((user) => (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="dark:hover:bg-white/5 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-semibold">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-medium dark:text-white text-gray-900">{user.name}</div>
                              <div className="text-sm dark:text-slate-500 text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm dark:text-slate-300 text-gray-700">{user.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize border ${getRoleBadgeColor(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm dark:text-slate-300 text-gray-700 font-medium">{user.leaveBalance} days</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                            user.isActive ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Mobile Card View - Hidden on Desktop */}
            <div className="md:hidden space-y-4">
              {users.map((user, index) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-panel rounded-2xl p-4"
                >
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold dark:text-white text-gray-900 truncate">{user.name}</h4>
                      <p className="text-xs dark:text-slate-500 text-gray-500 truncate">{user.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-0.5 inline-flex text-[10px] leading-4 font-semibold rounded-full capitalize border ${getRoleBadgeColor(user.role)}`}>
                          {user.role}
                        </span>
                        <span className={`px-2 py-0.5 inline-flex text-[10px] leading-4 font-semibold rounded-full border ${
                          user.isActive ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t dark:border-white/5 border-gray-200">
                    <div>
                      <p className="text-[10px] dark:text-slate-500 text-gray-500 uppercase tracking-wider mb-1">Department</p>
                      <p className="text-xs dark:text-slate-300 text-gray-700 font-medium">{user.department}</p>
                    </div>
                    <div>
                      <p className="text-[10px] dark:text-slate-500 text-gray-500 uppercase tracking-wider mb-1">Leave Balance</p>
                      <p className="text-xs dark:text-slate-300 text-gray-700 font-medium">{user.leaveBalance} days</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg dark:bg-surface-dark bg-white rounded-2xl shadow-2xl p-4 md:p-6 border dark:border-white/10 border-gray-200 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg md:text-xl font-semibold dark:text-white text-gray-900 mb-4 md:mb-6">Add New User</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium dark:text-slate-300 text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 dark:bg-background-dark bg-gray-50 border dark:border-white/10 border-gray-200 rounded-xl dark:text-white text-gray-900 dark:placeholder-slate-500 placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-slate-300 text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 dark:bg-background-dark bg-gray-50 border dark:border-white/10 border-gray-200 rounded-xl dark:text-white text-gray-900 dark:placeholder-slate-500 placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                  placeholder="john@company.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-slate-300 text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 dark:bg-background-dark bg-gray-50 border dark:border-white/10 border-gray-200 rounded-xl dark:text-white text-gray-900 dark:placeholder-slate-500 placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium dark:text-slate-300 text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-3 dark:bg-background-dark bg-gray-50 border dark:border-white/10 border-gray-200 rounded-xl dark:text-white text-gray-900 dark:placeholder-slate-500 placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Engineering"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium dark:text-slate-300 text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 dark:bg-background-dark bg-gray-50 border dark:border-white/10 border-gray-200 rounded-xl dark:text-white text-gray-900 focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-slate-300 text-gray-700 mb-2">
                  Leave Balance (days)
                </label>
                <input
                  type="number"
                  value={formData.leaveBalance}
                  onChange={(e) => setFormData({ ...formData, leaveBalance: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 dark:bg-background-dark bg-gray-50 border dark:border-white/10 border-gray-200 rounded-xl dark:text-white text-gray-900 focus:outline-none focus:border-primary transition-colors"
                  min="0"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl"
                >
                  Create User
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormData({ name: '', email: '', password: '', department: '', role: 'employee', leaveBalance: 20 });
                  }}
                  className="w-full sm:w-auto px-6 py-3 dark:bg-white/5 bg-gray-100 dark:hover:bg-white/10 hover:bg-gray-200 dark:text-white text-gray-900 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Users;
