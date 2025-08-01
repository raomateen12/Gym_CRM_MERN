import React, { useState, useEffect } from 'react';
import { 
  FiActivity, 
  FiCalendar, 
  FiTrendingUp,
  FiClock,
  FiAward,
  FiTarget,
  FiHeart,
  FiZap,
  FiUser,
  FiCheckCircle,
  FiPlay,
  FiBarChart2
} from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import api from '../../services/api';

const MemberDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalWorkouts: 42,
    weeklyGoal: 5,
    completedThisWeek: 3,
    totalHours: 87,
    caloriesBurned: 8420,
    currentStreak: 7,
    personalBests: 12,
    upcomingSessions: 2
  });

  const [weeklyProgress, setWeeklyProgress] = useState([
    { day: 'Mon', workouts: 1, calories: 350, duration: 45 },
    { day: 'Tue', workouts: 1, calories: 420, duration: 60 },
    { day: 'Wed', workouts: 0, calories: 0, duration: 0 },
    { day: 'Thu', workouts: 1, calories: 380, duration: 50 },
    { day: 'Fri', workouts: 0, calories: 0, duration: 0 },
    { day: 'Sat', workouts: 0, calories: 0, duration: 0 },
    { day: 'Sun', workouts: 0, calories: 0, duration: 0 }
  ]);

  const [recentWorkouts, setRecentWorkouts] = useState([
    { id: 1, type: 'Strength Training', date: '2024-01-10', duration: 60, calories: 420, status: 'completed' },
    { id: 2, type: 'Cardio', date: '2024-01-09', duration: 45, calories: 380, status: 'completed' },
    { id: 3, type: 'HIIT', date: '2024-01-08', duration: 30, calories: 350, status: 'completed' },
    { id: 4, type: 'Yoga', date: '2024-01-07', duration: 75, calories: 200, status: 'completed' }
  ]);

  const [upcomingSessions, setUpcomingSessions] = useState([
    { id: 1, type: 'Personal Training', trainer: 'John Smith', date: 'Today', time: '16:00', duration: 60 },
    { id: 2, type: 'Group Yoga', trainer: 'Sarah Johnson', date: 'Tomorrow', time: '09:00', duration: 90 }
  ]);

  const [goals, setGoals] = useState([
    { id: 1, title: 'Workout 5 times this week', progress: 60, target: 5, current: 3, unit: 'workouts' },
    { id: 2, title: 'Burn 2000 calories', progress: 75, target: 2000, current: 1500, unit: 'calories' },
    { id: 3, title: 'Complete 30-day streak', progress: 23, target: 30, current: 7, unit: 'days' },
    { id: 4, title: 'Increase bench press to 80kg', progress: 88, target: 80, current: 70, unit: 'kg' }
  ]);

  useEffect(() => {
    fetchMemberStats();
  }, []);

  const fetchMemberStats = async () => {
    try {
      const response = await api.get('/member/dashboard-stats');
      // Update states with real data
    } catch (error) {
      console.error('Error fetching member stats:', error);
    }
  };

  const memberStatsCards = [
    { title: 'Total Workouts', value: stats.totalWorkouts, icon: FiActivity, color: 'from-red-500 to-red-600', subtitle: 'This month' },
    { title: 'Current Streak', value: `${stats.currentStreak} days`, icon: FiZap, color: 'from-gray-700 to-gray-800', subtitle: 'Keep it up!' },
    { title: 'Calories Burned', value: stats.caloriesBurned.toLocaleString(), icon: FiHeart, color: 'from-red-500 to-red-600', subtitle: 'This month' },
    { title: 'Personal Bests', value: stats.personalBests, icon: FiAward, color: 'from-gray-700 to-gray-800', subtitle: 'All time' }
  ];

  const getProgressColor = (progress) => {
    if (progress >= 100) return '#10B981'; // Green
    if (progress >= 75) return '#F59E0B'; // Orange
    if (progress >= 50) return '#3B82F6'; // Blue
    return '#6B7280'; // Gray
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-red-100 mt-2">Let's crush your fitness goals today!</p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FiZap className="h-5 w-5" />
            <span className="text-sm">{stats.currentStreak} day streak</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiTarget className="h-5 w-5" />
            <span className="text-sm">{stats.completedThisWeek}/{stats.weeklyGoal} weekly goal</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {memberStatsCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
                <p className="text-sm mt-1 text-gray-500">{card.subtitle}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color}`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                name === 'calories' ? `${value} cal` : name === 'duration' ? `${value} min` : value,
                name === 'calories' ? 'Calories' : name === 'duration' ? 'Duration' : 'Workouts'
              ]} />
              <Area type="monotone" dataKey="calories" stackId="1" stroke="#dc2626" fill="#dc2626" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Current Goals */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Goals</h3>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900">{goal.title}</h4>
                  <span className="text-sm text-gray-500">{goal.current}/{goal.target} {goal.unit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300" 
                    style={{ 
                      width: `${Math.min(goal.progress, 100)}%`,
                      backgroundColor: getProgressColor(goal.progress)
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{goal.progress}% complete</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Workouts */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Workouts</h3>
          <div className="space-y-3">
            {recentWorkouts.map((workout) => (
              <div key={workout.id} className="flex items-center space-x-4 p-3 rounded-lg border border-gray-200">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{workout.type}</h4>
                  <p className="text-xs text-gray-500">{workout.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{workout.duration}m</p>
                  <p className="text-xs text-gray-500">{workout.calories} cal</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center space-x-4 p-3 rounded-lg border border-gray-200 bg-blue-50">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiPlay className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{session.type}</h4>
                  <p className="text-xs text-gray-500">with {session.trainer}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{session.time}</p>
                  <p className="text-xs text-gray-500">{session.date}</p>
                </div>
              </div>
            ))}
            
            {upcomingSessions.length === 0 && (
              <div className="text-center py-8">
                <FiCalendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No upcoming sessions</p>
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                  Book a session
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
