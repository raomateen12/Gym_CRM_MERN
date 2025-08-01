import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiUsers, 
  FiActivity, 
  FiCalendar, 
  FiBarChart, 
  FiSettings, 
  FiLogOut,
  FiUser,
  FiClock,
  FiTrendingUp,
  FiShield
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/dashboard', icon: FiHome },
      { name: 'Profile', href: '/profile', icon: FiUser },
    ];

    if (user?.role === 'admin') {
      return [
        { name: 'Dashboard', href: '/admin-dashboard', icon: FiHome },
        { name: 'Users', href: '/admin/users', icon: FiUsers },
        { name: 'Trainers', href: '/admin/trainers', icon: FiShield },
        { name: 'Workouts', href: '/admin/workouts', icon: FiActivity },
        { name: 'Analytics', href: '/admin/analytics', icon: FiBarChart },
        { name: 'Settings', href: '/admin/settings', icon: FiSettings },
        { name: 'Profile', href: '/profile', icon: FiUser },
      ];
    } else if (user?.role === 'trainer') {
      return [
        { name: 'Dashboard', href: '/trainer/dashboard', icon: FiHome },
        { name: 'Members', href: '/trainer/members', icon: FiUsers },
        { name: 'Workouts', href: '/trainer/workouts', icon: FiActivity },
        { name: 'Schedule', href: '/trainer/schedule', icon: FiCalendar },
        { name: 'Progress', href: '/trainer/progress', icon: FiTrendingUp },
        { name: 'Settings', href: '/trainer/settings', icon: FiSettings },
        { name: 'Profile', href: '/profile', icon: FiUser },
      ];
    } else {
      return [
        ...baseItems,
        { name: 'Workouts', href: '/workouts', icon: FiActivity },
        { name: 'My Bookings', href: '/my-bookings', icon: FiCalendar },
        { name: 'Progress', href: '/progress', icon: FiTrendingUp },
        { name: 'Sessions', href: '/sessions', icon: FiActivity },
      ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-black to-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-red-600 to-red-700 shadow-lg">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md">
              <FiActivity className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-xl font-bold text-white ml-2">GymMERN</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200 p-1 rounded-md hover:bg-red-700/50 transition-colors duration-200"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8">
          <div className="px-4 mb-6">
            <div className="flex items-center p-3 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-lg border border-red-500/20">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-red-300 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          <div className="space-y-1 px-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-gray-300 hover:bg-red-600/20 hover:text-white rounded-lg transition-colors duration-200 ${
                    isActive ? 'bg-red-600/30 text-white border-r-2 border-red-500' : ''
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-red-600/20 hover:text-red-300 rounded-lg transition-colors duration-200"
          >
            <FiLogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gradient-to-r from-red-600 to-red-700 shadow-lg">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-white hover:text-gray-200 p-1 rounded-md hover:bg-red-700/50 transition-colors duration-200"
              >
                <FiMenu className="w-6 h-6" />
              </button>
              <h1 className="ml-2 text-xl font-semibold text-white lg:ml-0">
                {navigationItems.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-white">
                Welcome back, <span className="font-medium text-red-100">{user?.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
