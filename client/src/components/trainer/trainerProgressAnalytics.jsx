import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FiTrendingUp, 
  FiUsers, 
  FiActivity, 
  FiTarget, 
  FiAward,
  FiCalendar,
  FiClock,
  FiBarChart,
  FiPieChart,
  FiFilter,
  FiDownload,
  FiChevronDown,
  FiChevronUp,
  FiStar,
  FiCheckCircle,
  FiArrowUp,
  FiArrowDown,
  FiMinus,
  FiAlertCircle,
  FiMapPin,
  FiHeart,
  FiZap,
  FiThumbsUp
} from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

const TrainerProgressAnalytics = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('sessions');
  const [expandedSection, setExpandedSection] = useState(null);

  // Mock data for progress analytics
  const performanceData = [
    { date: '2024-07-01', sessions: 8, revenue: 2400, satisfaction: 4.5, members: 12 },
    { date: '2024-07-02', sessions: 12, revenue: 3600, satisfaction: 4.6, members: 15 },
    { date: '2024-07-03', sessions: 10, revenue: 3000, satisfaction: 4.4, members: 13 },
    { date: '2024-07-04', sessions: 14, revenue: 4200, satisfaction: 4.7, members: 18 },
    { date: '2024-07-05', sessions: 16, revenue: 4800, satisfaction: 4.8, members: 20 },
    { date: '2024-07-06', sessions: 13, revenue: 3900, satisfaction: 4.5, members: 16 },
    { date: '2024-07-07', sessions: 15, revenue: 4500, satisfaction: 4.6, members: 19 },
    { date: '2024-07-08', sessions: 11, revenue: 3300, satisfaction: 4.4, members: 14 },
    { date: '2024-07-09', sessions: 17, revenue: 5100, satisfaction: 4.9, members: 22 },
    { date: '2024-07-10', sessions: 19, revenue: 5700, satisfaction: 4.8, members: 25 },
    { date: '2024-07-11', sessions: 14, revenue: 4200, satisfaction: 4.7, members: 18 },
    { date: '2024-07-12', sessions: 16, revenue: 4800, satisfaction: 4.6, members: 20 },
    { date: '2024-07-13', sessions: 18, revenue: 5400, satisfaction: 4.9, members: 23 },
    { date: '2024-07-14', sessions: 15, revenue: 4500, satisfaction: 4.5, members: 19 },
    { date: '2024-07-15', sessions: 20, revenue: 6000, satisfaction: 4.8, members: 26 }
  ];

  const sessionTypeData = [
    { name: 'Strength Training', value: 35, color: '#3B82F6' },
    { name: 'Cardio', value: 25, color: '#EF4444' },
    { name: 'Personal Training', value: 20, color: '#10B981' },
    { name: 'Group Classes', value: 15, color: '#F59E0B' },
    { name: 'Flexibility', value: 5, color: '#8B5CF6' }
  ];

  const memberProgressData = [
    { name: 'John Doe', progress: 85, sessions: 24, improvement: 15, category: 'Strength' },
    { name: 'Sarah Khan', progress: 92, sessions: 28, improvement: 22, category: 'Cardio' },
    { name: 'Ahmad Ali', progress: 78, sessions: 20, improvement: 18, category: 'Flexibility' },
    { name: 'Fatima Sheikh', progress: 88, sessions: 32, improvement: 25, category: 'Personal' },
    { name: 'Ali Hassan', progress: 95, sessions: 36, improvement: 30, category: 'Strength' },
    { name: 'Zara Ahmed', progress: 82, sessions: 22, improvement: 20, category: 'Cardio' },
    { name: 'Omar Malik', progress: 90, sessions: 30, improvement: 28, category: 'Personal' },
    { name: 'Ayesha Noor', progress: 76, sessions: 18, improvement: 12, category: 'Flexibility' }
  ];

  const monthlyGoals = [
    { goal: 'Complete 120 Sessions', current: 98, target: 120, status: 'on-track' },
    { goal: 'Earn ₹35,000 Revenue', current: 28500, target: 35000, status: 'on-track' },
    { goal: 'Maintain 4.5+ Rating', current: 4.7, target: 4.5, status: 'achieved' },
    { goal: 'Train 25 Members', current: 26, target: 25, status: 'achieved' },
    { goal: '95% Session Completion', current: 96, target: 95, status: 'achieved' }
  ];

  const achievements = [
    { title: 'Top Trainer', description: 'Highest rating for 3 consecutive months', icon: FiAward, color: 'text-yellow-600 bg-yellow-100' },
    { title: 'Member Favorite', description: '25+ positive reviews this month', icon: FiHeart, color: 'text-red-600 bg-red-100' },
    { title: 'Consistency Pro', description: '30 days without missed sessions', icon: FiTarget, color: 'text-green-600 bg-green-100' },
    { title: 'Revenue Milestone', description: 'Crossed ₹50,000 monthly revenue', icon: FiTrendingUp, color: 'text-red-600 bg-red-100' },
    { title: 'Fitness Transformer', description: 'Helped 10 members reach their goals', icon: FiZap, color: 'text-red-600 bg-red-100' }
  ];

  const weeklyStats = {
    totalSessions: 98,
    totalRevenue: 28500,
    avgRating: 4.7,
    completionRate: 96,
    newMembers: 3,
    memberRetention: 92,
    avgSessionDuration: 52,
    popularTime: '6:00 PM - 8:00 PM'
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getGoalStatusColor = (status) => {
    switch(status) {
      case 'achieved': return 'text-green-600 bg-green-100';
      case 'on-track': return 'text-red-600 bg-red-100';
      case 'behind': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 80) return 'bg-red-500';
    if (progress >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTrendIcon = (current, target) => {
    if (current > target) return <FiArrowUp className="w-4 h-4 text-green-500" />;
    if (current < target) return <FiArrowDown className="w-4 h-4 text-red-500" />;
    return <FiMinus className="w-4 h-4 text-gray-500" />;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

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
                Progress Analytics
              </h1>
              <p className="text-gray-600 mt-2">
                Track your performance and member progress
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 3 Months</option>
                <option value="1y">Last Year</option>
              </select>
              <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <FiFilter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg">
                <FiDownload className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{weeklyStats.totalSessions}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <FiArrowUp className="w-4 h-4 mr-1" />
                  12% vs last week
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FiActivity className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(weeklyStats.totalRevenue)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <FiArrowUp className="w-4 h-4 mr-1" />
                  8% vs last week
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiTrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">{weeklyStats.avgRating}/5</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <FiArrowUp className="w-4 h-4 mr-1" />
                  0.2 vs last week
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <FiStar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{weeklyStats.completionRate}%</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <FiArrowUp className="w-4 h-4 mr-1" />
                  3% vs last week
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FiCheckCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
            <div className="flex items-center space-x-2">
              <select 
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="sessions">Sessions</option>
                <option value="revenue">Revenue</option>
                <option value="satisfaction">Satisfaction</option>
                <option value="members">Members</option>
              </select>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Session Types & Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Session Types */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Session Types Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sessionTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sessionTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Goals */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Goals</h3>
            <div className="space-y-4">
              {monthlyGoals.map((goal, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{goal.goal}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getGoalStatusColor(goal.status)}`}>
                      {goal.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>{typeof goal.current === 'number' && goal.current > 100 ? formatCurrency(goal.current) : goal.current}</span>
                    <span>{typeof goal.target === 'number' && goal.target > 100 ? formatCurrency(goal.target) : goal.target}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Member Progress */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Member Progress Tracking</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {memberProgressData.map((member, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-xs text-gray-500">{member.category}</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">{member.name}</h4>
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{member.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(member.progress)}`}
                      style={{ width: `${member.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{member.sessions} sessions</span>
                  <span className="text-green-600">+{member.improvement}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className={`p-2 rounded-full ${achievement.color} mr-3`}>
                    <achievement.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                </div>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProgressAnalytics;
