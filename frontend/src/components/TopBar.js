import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const TopBar = ({ title, subtitle }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-16 border-b dark:border-dark-border border-light-border dark:bg-dark-bg bg-light-bg flex items-center justify-between px-4 md:px-8">
      <div>
        <h2 className="text-lg md:text-xl font-bold dark:text-dark-text text-light-text">{title}</h2>
        {subtitle && (
          <p className="text-xs md:text-sm dark:text-dark-muted text-light-muted hidden sm:block">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Leave Balance */}
        <div className="px-3 md:px-4 py-2 rounded-lg dark:bg-dark-elevated bg-light-elevated">
          <p className="text-[10px] md:text-xs dark:text-dark-muted text-light-muted">Balance</p>
          <p className="text-sm md:text-lg font-bold dark:text-dark-text text-light-text">
            {user?.leaveBalance} <span className="text-xs md:text-sm font-normal hidden sm:inline">days</span>
          </p>
        </div>

        {/* User Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center space-x-2 md:space-x-3 px-2 md:px-3 py-2 rounded-lg dark:hover:bg-dark-elevated hover:bg-light-elevated transition-colors"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-semibold text-sm md:text-base">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <svg className={`w-4 h-4 dark:text-dark-muted text-light-muted transition-transform ${showMenu ? 'rotate-180' : ''} hidden sm:block`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-64 dark:bg-dark-surface bg-light-surface rounded-xl shadow-2xl border dark:border-dark-border border-light-border overflow-hidden z-50">
              {/* User Info */}
              <div className="p-4 border-b dark:border-dark-border border-light-border">
                <p className="font-semibold dark:text-dark-text text-light-text">{user?.name}</p>
                <p className="text-sm dark:text-dark-muted text-light-muted">{user?.email}</p>
                <p className="text-xs dark:text-dark-muted text-light-muted mt-1 capitalize">
                  {user?.role} • {user?.department}
                </p>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg dark:hover:bg-dark-elevated hover:bg-light-elevated transition-colors dark:text-dark-text text-light-text"
                >
                  {isDark ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                  <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-500/10 transition-colors text-red-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
