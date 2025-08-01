import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FiUsers, 
  FiActivity, 
  FiDollarSign, 
  FiTrendingUp, 
  FiTrendingDown,
  FiCalendar,
  FiBarChart,
  FiAward,
  FiStar,
  FiAlertCircle,
  FiSettings,
  FiClock,
  FiTarget,
  FiHeart,
  FiBookOpen,
  FiMessageCircle,
  FiTrendingDown as FiTrendingDownIcon,
  FiCheckCircle,
  FiUser,
  FiPlayCircle
} from 'react-icons/fi';

const TrainerDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  // Mock data for trainer dashboard
  const mockDashboardData = {
    totalMembers: 25,
    memberGrowth: 12,
    completedSessions: 145,
    sessionGrowth: 8,
    monthlyEarnings: 35000,
    earningsGrowth: 15,
    upcomingSessions: 8,
    sessionChange: -2,
    rating: 4.8,
    totalReviews: 42,
    weeklyStats: {
      sessions: [12, 15, 18, 14, 16, 20, 22],
      earnings: [4500, 5200, 6100, 4800, 5500, 6800, 7200],
      members: [22, 23, 24, 24, 25, 25, 25]
    },
    recentSessions: [
      { id: 1, member: 'John Doe', type: 'Strength Training', time: '9:00 AM', status: 'completed', rating: 5 },
      { id: 2, member: 'Sarah Khan', type: 'Cardio Workout', time: '11:00 AM', status: 'completed', rating: 4 },
      { id: 3, member: 'Ahmad Ali', type: 'Weight Loss', time: '2:00 PM', status: 'upcoming', rating: null },
      { id: 4, member: 'Fatima Sheikh', type: 'Yoga Session', time: '4:00 PM', status: 'upcoming', rating: null }
    ],
    myMembers: [
      { id: 1, name: 'John Doe', joinDate: '2024-01-15', sessionsCompleted: 24, progress: 85, lastSeen: '2 hours ago' },
      { id: 2, name: 'Sarah Khan', joinDate: '2024-02-20', sessionsCompleted: 18, progress: 72, lastSeen: '1 day ago' },
      { id: 3, name: 'Ahmad Ali', joinDate: '2024-03-10', sessionsCompleted: 12, progress: 58, lastSeen: '3 days ago' },
      { id: 4, name: 'Fatima Sheikh', joinDate: '2024-04-05', sessionsCompleted: 8, progress: 45, lastSeen: '5 days ago' }
    ],
    upcomingSchedule: [
      { id: 1, time: '9:00 AM', member: 'John Doe', type: 'Strength Training', duration: '60 min' },
      { id: 2, time: '11:00 AM', member: 'Sarah Khan', type: 'Cardio Workout', duration: '45 min' },
      { id: 3, time: '2:00 PM', member: 'Ahmad Ali', type: 'Weight Loss', duration: '60 min' },
      { id: 4, time: '4:00 PM', member: 'Fatima Sheikh', type: 'Yoga Session', duration: '75 min' }
    ],
    achievements: [
      { id: 1, title: 'Top Trainer', description: 'Highest rated trainer this month', icon: 'award', color: 'yellow' },
      { id: 2, title: 'Member Favorite', description: '95% member satisfaction rate', icon: 'heart', color: 'red' },
      { id: 3, title: 'Session Master', description: 'Completed 100+ sessions', icon: 'target', color: 'blue' },
      { id: 4, title: 'Progress Expert', description: 'Helped 20+ members achieve goals', icon: 'trending-up', color: 'green' }
    ]
  };

  useEffect(() => {
    // Simulate API call
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <FiActivity className="w-8 h-8 mr-3 text-red-600" />
                Trainer Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome back, <strong>{user?.name}</strong>! Here's your training overview.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/trainer/schedule" className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-colors shadow-md">
                <FiCalendar className="w-4 h-4 mr-2" />
                View Schedule
              </Link>
              <Link to="/trainer/sessions/new" className="flex items-center px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg hover:from-gray-900 hover:to-black transition-colors shadow-md">
                <FiPlayCircle className="w-4 h-4 mr-2" />
                Start Session
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">My Members</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.totalMembers}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <FiTrendingUp className="w-3 h-3 mr-1" />
                  +{dashboardData.memberGrowth}% this month
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
                <p className="text-sm font-medium text-gray-600">Sessions Completed</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.completedSessions}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <FiTrendingUp className="w-3 h-3 mr-1" />
                  +{dashboardData.sessionGrowth}% this month
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiActivity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Earnings</p>
                <p className="text-2xl font-bold text-gray-900">₹{dashboardData.monthlyEarnings.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <FiTrendingUp className="w-3 h-3 mr-1" />
                  +{dashboardData.earningsGrowth}% this month
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <FiDollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.upcomingSessions}</p>
                <p className="text-sm text-red-600 flex items-center mt-1">
                  <FiTrendingDownIcon className="w-3 h-3 mr-1" />
                  {dashboardData.sessionChange} from yesterday
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FiClock className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Rating & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Rating Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Rating</h3>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <FiStar className="w-8 h-8 text-yellow-500 mr-2" />
                  <span className="text-3xl font-bold text-gray-900">{dashboardData.rating}</span>
                </div>
                <p className="text-sm text-gray-600">{dashboardData.totalReviews} reviews</p>
                <div className="flex items-center justify-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.floor(dashboardData.rating)
                          ? 'text-yellow-500 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                to="/trainer/members"
                className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group border border-red-200"
              >
                <FiUsers className="w-6 h-6 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-900">My Members</span>
              </Link>
              
              <Link
                to="/trainer/workouts"
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group border border-gray-200"
              >
                <FiActivity className="w-6 h-6 text-gray-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-900">Workouts</span>
              </Link>
              
              <Link
                to="/trainer/schedule"
                className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group border border-red-200"
              >
                <FiCalendar className="w-6 h-6 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-900">Schedule</span>
              </Link>
              
              <Link
                to="/trainer/progress"
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group border border-gray-200"
              >
                <FiBarChart className="w-6 h-6 text-gray-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-900">Progress</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Sessions */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Sessions</h3>
              <Link to="/trainer/sessions" className="text-red-600 hover:text-red-700 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {dashboardData.recentSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {session.member.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{session.member}</p>
                      <p className="text-xs text-gray-500">{session.type} • {session.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {session.status === 'completed' && session.rating && (
                      <div className="flex items-center">
                        <FiStar className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{session.rating}</span>
                      </div>
                    )}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      session.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
              <Link to="/trainer/schedule" className="text-red-600 hover:text-red-700 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {dashboardData.upcomingSchedule.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{session.time}</p>
                    <p className="text-xs text-gray-500">{session.member}</p>
                    <p className="text-xs text-red-600">{session.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{session.duration}</p>
                    <button className="text-xs text-red-600 hover:text-red-700">
                      Start
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Members & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Members */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">My Members</h3>
              <Link to="/trainer/members" className="text-red-600 hover:text-red-700 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {dashboardData.myMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.sessionsCompleted} sessions • {member.lastSeen}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${member.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{member.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
            <div className="grid grid-cols-2 gap-4">
              {dashboardData.achievements.map((achievement) => (
                <div key={achievement.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-full ${
                      achievement.color === 'yellow' ? 'bg-yellow-100' :
                      achievement.color === 'red' ? 'bg-red-100' :
                      achievement.color === 'blue' ? 'bg-red-100' :
                      'bg-green-100'
                    }`}>
                      {achievement.icon === 'award' && <FiAward className={`w-4 h-4 ${
                        achievement.color === 'yellow' ? 'text-yellow-600' :
                        achievement.color === 'red' ? 'text-red-600' :
                        achievement.color === 'blue' ? 'text-red-600' :
                        'text-green-600'
                      }`} />}
                      {achievement.icon === 'heart' && <FiHeart className={`w-4 h-4 ${
                        achievement.color === 'yellow' ? 'text-yellow-600' :
                        achievement.color === 'red' ? 'text-red-600' :
                        achievement.color === 'blue' ? 'text-red-600' :
                        'text-green-600'
                      }`} />}
                      {achievement.icon === 'target' && <FiTarget className={`w-4 h-4 ${
                        achievement.color === 'yellow' ? 'text-yellow-600' :
                        achievement.color === 'red' ? 'text-red-600' :
                        achievement.color === 'blue' ? 'text-red-600' :
                        'text-green-600'
                      }`} />}
                      {achievement.icon === 'trending-up' && <FiTrendingUp className={`w-4 h-4 ${
                        achievement.color === 'yellow' ? 'text-yellow-600' :
                        achievement.color === 'red' ? 'text-red-600' :
                        achievement.color === 'blue' ? 'text-red-600' :
                        'text-green-600'
                      }`} />}
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">{achievement.title}</h4>
                  <p className="text-xs text-gray-500">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
