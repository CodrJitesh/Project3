import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import EmployeeDashboard from '../components/EmployeeDashboard';
import AdminDashboard from '../components/AdminDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex h-screen dark:bg-background-dark bg-light-bg">
        <div className="absolute inset-0 z-0 bg-bokeh-mesh pointer-events-none"></div>
        <Sidebar />
        <div className="flex-1 ml-64 relative z-10">
          <TopBar title="Dashboard" />
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
          title={user.role === 'admin' ? 'Admin Analytics' : 'Insight Overview'}
          subtitle={new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-0">
          <div className="max-w-7xl mx-auto py-4 md:py-8">
            {user.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
