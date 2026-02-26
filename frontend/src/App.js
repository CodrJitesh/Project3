import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Approvals from './pages/Approvals';
import Users from './pages/Users';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/approvals"
                element={
                  <ProtectedRoute roles={['manager', 'admin']}>
                    <Approvals />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                className: 'dark:bg-dark-surface bg-light-surface dark:text-dark-text text-light-text dark:border-dark-border border-light-border',
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: 'white'
                  }
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: 'white'
                  }
                }
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
