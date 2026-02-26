import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-effect border-b border-dark-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LM</span>
            </div>
            <span className="text-xl font-semibold text-dark-text">Leave Manager</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="text-dark-muted hover:text-dark-text transition-colors">
              Dashboard
            </Link>
            {(user?.role === 'manager' || user?.role === 'admin') && (
              <Link to="/approvals" className="text-dark-muted hover:text-dark-text transition-colors">
                Approvals
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/users" className="text-dark-muted hover:text-dark-text transition-colors">
                Users
              </Link>
            )}
            
            <div className="flex items-center space-x-3 pl-6 border-l border-dark-border">
              <div className="text-right">
                <p className="text-sm font-medium text-dark-text">{user?.name}</p>
                <p className="text-xs text-dark-muted capitalize">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-dark-elevated hover:bg-dark-border text-dark-text rounded-lg transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
