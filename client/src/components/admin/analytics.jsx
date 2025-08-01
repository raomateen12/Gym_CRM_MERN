import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FiBarChart, 
  FiTrendingUp, 
  FiTrendingDown,
  FiUsers, 
  FiActivity,
  FiDollarSign,
  FiCalendar,
  FiPieChart,
  FiDownload,
  FiRefreshCw,
  FiFilter
} from 'react-icons/fi';

const Analytics = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('last30days');
  const [analyticsData, setAnalyticsData] = useState({});

  // Mock analytics data
  const mockAnalytics = {
    overview: {
      totalRevenue: 125000,
      revenueChange: 12.5,
      totalMembers: 245,
      memberChange: 8.2,
      activeTrainers: 12,
      trainerChange: 0,
      sessionCount: 1580,
      sessionChange: 15.3
    },
    membershipTrends: [
      { month: 'Jan', basic: 45, premium: 25, elite: 15 },
      { month: 'Feb', basic: 52, premium: 30, elite: 18 },
      { month: 'Mar', basic: 48, premium: 35, elite: 22 },
      { month: 'Apr', basic: 61, premium: 40, elite: 25 },
      { month: 'May', basic: 55, premium: 45, elite: 28 },
      { month: 'Jun', basic: 67, premium: 50, elite: 32 },
      { month: 'Jul', basic: 72, premium: 55, elite: 35 }
    ],
    revenueData: [
      { month: 'Jan', revenue: 15000, target: 14000 },
      { month: 'Feb', revenue: 18000, target: 16000 },
      { month: 'Mar', revenue: 16500, target: 15000 },
      { month: 'Apr', revenue: 22000, target: 20000 },
      { month: 'May', revenue: 19500, target: 18000 },
      { month: 'Jun', revenue: 25000, target: 23000 },
      { month: 'Jul', revenue: 28000, target: 25000 }
    ],
    membershipDistribution: [
      { name: 'Basic', value: 45, color: '#3B82F6' },
      { name: 'Premium', value: 35, color: '#10B981' },
      { name: 'Elite', value: 20, color: '#F59E0B' }
    ],
    peakHours: [
      { hour: '06:00', members: 15 },
      { hour: '07:00', members: 25 },
      { hour: '08:00', members: 45 },
      { hour: '09:00', members: 35 },
      { hour: '10:00', members: 20 },
      { hour: '17:00', members: 40 },
      { hour: '18:00', members: 60 },
      { hour: '19:00', members: 55 },
      { hour: '20:00', members: 30 },
      { hour: '21:00', members: 15 }
    ],
    topTrainers: [
      { name: 'Sarah Khan', sessions: 45, rating: 4.8, revenue: 12000 },
      { name: 'Ahmad Hassan', sessions: 38, rating: 4.6, revenue: 9500 },
      { name: 'Fatima Sheikh', sessions: 42, rating: 4.9, revenue: 11200 },
      { name: 'Omar Malik', sessions: 32, rating: 4.7, revenue: 8800 }
    ]
  };

  useEffect(() => {
    setTimeout(() => {
      setAnalyticsData(mockAnalytics);
      setLoading(false);
    }, 1000);
  }, [dateRange]);

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-1">
            {change > 0 ? (
              <FiTrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <FiTrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const SimpleBarChart = ({ data, dataKey, color = '#dc2626' }) => (
    <div className="flex items-end justify-between h-32 px-4">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div 
            className="w-8 rounded-t"
            style={{ 
              height: `${(item[dataKey] / Math.max(...data.map(d => d[dataKey]))) * 100}%`,
              backgroundColor: color,
              minHeight: '8px'
            }}
          />
          <span className="text-xs text-gray-500 mt-1">{item.month || item.hour}</span>
        </div>
      ))}
    </div>
  );

  const SimplePieChart = ({ data }) => (
    <div className="flex items-center justify-center h-32">
      <div className="flex space-x-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            />
            <div>
              <div className="text-sm font-medium text-gray-900">{item.name}</div>
              <div className="text-xs text-gray-500">{item.value}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <FiBarChart className="w-8 h-8 mr-3 text-red-600" />
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Track performance metrics and business insights
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
                <option value="last90days">Last 90 Days</option>
                <option value="last6months">Last 6 Months</option>
                <option value="lastyear">Last Year</option>
              </select>
              <button className="flex items-center px-4 py-2 text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transition-colors shadow-md">
                <FiRefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
              <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <FiDownload className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`₹${analyticsData.overview?.totalRevenue.toLocaleString()}`}
            change={analyticsData.overview?.revenueChange}
            icon={FiDollarSign}
            color="bg-green-500"
          />
          <StatCard
            title="Total Members"
            value={analyticsData.overview?.totalMembers}
            change={analyticsData.overview?.memberChange}
            icon={FiUsers}
            color="bg-red-500"
          />
          <StatCard
            title="Active Trainers"
            value={analyticsData.overview?.activeTrainers}
            change={analyticsData.overview?.trainerChange}
            icon={FiActivity}
            color="bg-gray-700"
          />
          <StatCard
            title="Total Sessions"
            value={analyticsData.overview?.sessionCount}
            change={analyticsData.overview?.sessionChange}
            icon={FiCalendar}
            color="bg-red-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
            <SimpleBarChart data={analyticsData.revenueData} dataKey="revenue" color="#dc2626" />
          </div>

          {/* Membership Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Distribution</h3>
            <SimplePieChart data={analyticsData.membershipDistribution} />
          </div>
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Peak Hours */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Peak Hours</h3>
            <SimpleBarChart data={analyticsData.peakHours} dataKey="members" color="#6b7280" />
          </div>

          {/* Top Trainers */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Trainers</h3>
            <div className="space-y-4">
              {analyticsData.topTrainers?.map((trainer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {trainer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{trainer.name}</p>
                      <p className="text-xs text-gray-500">{trainer.sessions} sessions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">₹{trainer.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">⭐ {trainer.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Membership Trends */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Membership Growth Trends</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Basic</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-700 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Premium</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Elite</span>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between px-4">
            {analyticsData.membershipTrends?.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="flex flex-col items-center">
                  <div 
                    className="w-6 rounded-t bg-red-600"
                    style={{ height: `${(item.elite / 35) * 100}%`, minHeight: '4px' }}
                  />
                  <div 
                    className="w-6 bg-gray-700"
                    style={{ height: `${(item.premium / 55) * 100}%`, minHeight: '4px' }}
                  />
                  <div 
                    className="w-6 rounded-b bg-red-500"
                    style={{ height: `${(item.basic / 72) * 100}%`, minHeight: '4px' }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-2">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
