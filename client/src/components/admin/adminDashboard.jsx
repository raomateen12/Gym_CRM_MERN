import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FiUsers, 
  FiUserCheck, 
  FiActivity, 
  FiDollarSign,
  FiCalendar,
  FiTrendingUp,
  FiTrendingDown,
  FiBarChart,
  FiPieChart,
  FiClock,
  FiTarget,
  FiAward,
  FiAlertCircle,
  FiStar,
  FiSettings,
  FiShield
} from 'react-icons/fi';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});

  // Mock dashboard data
  const mockDashboardData = {
    totalUsers: 156,
    activeMembers: 142,
    totalTrainers: 8,
    monthlyRevenue: 45000,
    todaysBookings: 45,
    pendingApprovals: 3,
    userGrowth: 12,
    revenueGrowth: 22,
    trainerGrowth: 0,
    bookingGrowth: 15,
    approvalGrowth: -25,
    monthlyStats: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      revenue: [30000, 35000, 32000, 40000, 38000, 45000, 42000],
      members: [120, 125, 130, 135, 140, 142, 145],
      trainers: [6, 7, 7, 8, 8, 8, 8]
    },
    membershipDistribution: {
      basic: 45,
      premium: 35,
      vip: 20
    },
    trainerPerformance: [
      { name: 'Sarah Khan', rating: 4.8, clients: 25, revenue: 15000 },
      { name: 'Ahmad Hassan', rating: 4.6, clients: 20, revenue: 12000 },
      { name: 'Fatima Sheikh', rating: 4.9, clients: 30, revenue: 18000 },
      { name: 'Omar Malik', rating: 4.7, clients: 15, revenue: 10000 }
    ],
    recentActivities: [
      { id: 1, type: 'new_member', message: 'John Doe joined the gym', time: '2 hours ago', icon: 'user' },
      { id: 2, type: 'session_completed', message: 'Sarah completed her strength training', time: '3 hours ago', icon: 'activity' },
      { id: 3, type: 'payment', message: 'Monthly membership fee paid', time: '5 hours ago', icon: 'dollar' },
      { id: 4, type: 'trainer_update', message: 'New trainer Ahmad Hassan joined', time: '1 day ago', icon: 'users' }
    ]
  };

  useEffect(() => {
    setTimeout(() => {
      setDashboardData(mockDashboardData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <FiBarChart className="w-8 h-8 mr-3 text-red-600" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome back, <strong>{user?.name}</strong>! Here's your gym overview.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md">
                <FiCalendar className="w-4 h-4 mr-2" />
                Today's Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.totalUsers}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <FiTrendingUp className="w-3 h-3 mr-1" />
                  +{dashboardData.userGrowth}% from last month
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FiUsers className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Members</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.activeMembers}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <FiTrendingUp className="w-3 h-3 mr-1" />
                  +8% from last month
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiUserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Trainers</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.totalTrainers}</p>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <FiTrendingUp className="w-3 h-3 mr-1" />
                  {dashboardData.trainerGrowth}% from last month
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FiActivity className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{dashboardData.monthlyRevenue?.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <FiTrendingUp className="w-3 h-3 mr-1" />
                  +{dashboardData.revenueGrowth}% from last month
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiDollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.todaysBookings}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <FiTrendingUp className="w-3 h-3 mr-1" />
                  +{dashboardData.bookingGrowth}% from last month
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FiCalendar className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Workout Plans</p>
                <p className="text-2xl font-bold text-gray-900">28</p>
                <p className="text-sm text-red-600 flex items-center mt-1">
                  <FiTrendingUp className="w-3 h-3 mr-1" />
                  5 new this week
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FiActivity className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.pendingApprovals}</p>
                <p className="text-sm text-red-600 flex items-center mt-1">
                  <FiTrendingDown className="w-3 h-3 mr-1" />
                  {dashboardData.approvalGrowth}% from last month
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FiAlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section - Simple Stats Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart - Mock Display */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
            <div className="h-80 bg-gradient-to-br from-red-50 to-red-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FiBarChart className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <p className="text-red-800 font-medium">Revenue Chart</p>
                <p className="text-red-600 text-sm">Monthly: ₹{dashboardData.monthlyRevenue?.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Membership Distribution - Mock Display */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Distribution</h3>
            <div className="h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FiPieChart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-800 font-medium">Membership Types</p>
                <div className="text-gray-600 text-sm mt-2">
                  <div>Basic: {dashboardData.membershipDistribution?.basic}%</div>
                  <div>Premium: {dashboardData.membershipDistribution?.premium}%</div>
                  <div>VIP: {dashboardData.membershipDistribution?.vip}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trainer Performance & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trainer Performance - Mock Display */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trainer Performance</h3>
            <div className="space-y-4">
              {dashboardData.trainerPerformance?.map((trainer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {trainer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{trainer.name}</p>
                      <p className="text-xs text-gray-500">{trainer.clients} clients</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <FiStar className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{trainer.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">₹{trainer.revenue?.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {dashboardData.recentActivities?.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'new_member' ? 'bg-red-100' :
                    activity.type === 'session_completed' ? 'bg-green-100' :
                    activity.type === 'payment' ? 'bg-yellow-100' :
                    'bg-gray-100'
                  }`}>
                    {activity.type === 'new_member' && <FiUsers className="w-4 h-4 text-red-600" />}
                    {activity.type === 'session_completed' && <FiActivity className="w-4 h-4 text-green-600" />}
                    {activity.type === 'payment' && <FiDollarSign className="w-4 h-4 text-yellow-600" />}
                    {activity.type === 'trainer_update' && <FiAward className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/users"
              className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group border border-red-200"
            >
              <FiUsers className="w-8 h-8 text-red-600 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-medium text-gray-900">Manage Users</p>
                <p className="text-sm text-gray-600">Add, edit, or remove users</p>
              </div>
            </Link>
            
            <Link
              to="/admin/trainers"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group border border-gray-200"
            >
              <FiShield className="w-8 h-8 text-gray-600 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-medium text-gray-900">View Trainers</p>
                <p className="text-sm text-gray-600">Manage trainer profiles</p>
              </div>
            </Link>
            
            <Link
              to="/admin/workouts"
              className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group border border-red-200"
            >
              <FiActivity className="w-8 h-8 text-red-600 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-medium text-gray-900">Workout Plans</p>
                <p className="text-sm text-gray-600">Create & manage workouts</p>
              </div>
            </Link>
            
            <Link
              to="/admin/analytics"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group border border-gray-200"
            >
              <FiBarChart className="w-8 h-8 text-gray-600 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-medium text-gray-900">Analytics</p>
                <p className="text-sm text-gray-600">View performance metrics</p>
              </div>
            </Link>
            
            <Link
              to="/admin/settings"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group border border-gray-200"
            >
              <FiSettings className="w-8 h-8 text-gray-600 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-medium text-gray-900">System Settings</p>
                <p className="text-sm text-gray-600">Configure system preferences</p>
              </div>
            </Link>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group cursor-pointer border border-gray-200">
              <FiCalendar className="w-8 h-8 text-gray-600 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-medium text-gray-900">Schedule</p>
                <p className="text-sm text-gray-600">Manage gym schedule</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group cursor-pointer border border-red-200">
              <FiAlertCircle className="w-8 h-8 text-red-600 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-medium text-gray-900">Reports</p>
                <p className="text-sm text-gray-600">Generate system reports</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group cursor-pointer border border-gray-200">
              <FiTrendingUp className="w-8 h-8 text-gray-600 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-medium text-gray-900">Performance</p>
                <p className="text-sm text-gray-600">Monitor gym performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
