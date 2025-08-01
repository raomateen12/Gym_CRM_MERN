import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
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
  FiUsers,
  FiCheckCircle,
  FiPlay,
  FiBarChart2
} from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();

  // Member Dashboard Content
  if (user?.role === 'member') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 mb-8 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {user?.name?.split(' ')[0]}!
                </h1>
                <p className="text-red-100">
                  Let's crush your fitness goals today! 🔥
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-red-500/30 rounded-lg px-3 py-2">
                  <FiZap className="w-5 h-5 mr-2" />
                  <span className="font-semibold">7 day streak</span>
                </div>
                <div className="flex items-center bg-red-500/30 rounded-lg px-3 py-2">
                  <FiTarget className="w-5 h-5 mr-2" />
                  <span className="font-semibold">3/5 weekly goal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Workouts</p>
                  <p className="text-3xl font-bold text-gray-900">42</p>
                  <p className="text-sm text-gray-500">This month</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <FiActivity className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Streak</p>
                  <p className="text-3xl font-bold text-gray-900">7 days</p>
                  <p className="text-sm text-gray-500">Keep it up!</p>
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                  <FiZap className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Calories Burned</p>
                  <p className="text-3xl font-bold text-gray-900">8,420</p>
                  <p className="text-sm text-gray-500">This month</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <FiHeart className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Personal Bests</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                  <p className="text-sm text-gray-500">All time</p>
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                  <FiAward className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Activity & Current Goals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Weekly Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Mon</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{width: '80%'}}></div>
                    </div>
                    <span className="text-gray-900 font-medium">400 cal</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Tue</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <span className="text-gray-900 font-medium">320 cal</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Wed</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-300 h-2 rounded-full" style={{width: '0%'}}></div>
                    </div>
                    <span className="text-gray-500 font-medium">Rest day</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Thu</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{width: '70%'}}></div>
                    </div>
                    <span className="text-gray-900 font-medium">380 cal</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Fri</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-300 h-2 rounded-full" style={{width: '0%'}}></div>
                    </div>
                    <span className="text-gray-500 font-medium">Scheduled</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Goals */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Goals</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Workout 5 times this week</span>
                    <span className="text-sm text-gray-500">3/5 workouts</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">60% complete</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Burn 2000 calories</span>
                    <span className="text-sm text-gray-500">1500/2000 calories</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">75% complete</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Complete 30-day streak</span>
                    <span className="text-sm text-gray-500">7/30 days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-600 h-2 rounded-full" style={{width: '23%'}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">23% complete</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Workouts & Upcoming Sessions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Workouts */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Workouts</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-4 p-3 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FiCheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">Strength Training</h4>
                    <p className="text-xs text-gray-500">Today</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">60m</p>
                    <p className="text-xs text-gray-500">420 cal</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FiCheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">Cardio</h4>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">45m</p>
                    <p className="text-xs text-gray-500">380 cal</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FiCheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">HIIT</h4>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">30m</p>
                    <p className="text-xs text-gray-500">350 cal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-red-50 border border-red-200">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <FiUser className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">Personal Training</h4>
                    <p className="text-xs text-gray-500">with John Smith</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Today 4:00 PM</p>
                    <p className="text-xs text-gray-500">60 min</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <FiUsers className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">Group Yoga</h4>
                    <p className="text-xs text-gray-500">with Sarah Johnson</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Tomorrow 9:00 AM</p>
                    <p className="text-xs text-gray-500">90 min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Dashboard for other roles or fallback
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🏋️ Gym Management System
          </h1>
          <p className="text-gray-600 mb-4">
            Welcome back, <strong>{user?.name || 'User'}</strong>! 
          </p>
          <p className="text-gray-600 mb-4">
            Role: <span className="font-semibold capitalize bg-blue-100 px-2 py-1 rounded">{user?.role || 'member'}</span>
          </p>
          <div className="bg-green-50 border border-green-200 p-4 rounded-md">
            <p className="text-green-800">
              Dashboard is working perfectly! Export issue resolved.
            </p>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900">Quick Stats</h3>
              <p className="text-blue-700">Your fitness journey overview</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900">Recent Activity</h3>
              <p className="text-green-700">Latest workouts and progress</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900">Goals</h3>
              <p className="text-purple-700">Track your fitness goals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;