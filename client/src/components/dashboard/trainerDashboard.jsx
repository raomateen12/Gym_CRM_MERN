import React, { useState, useEffect } from 'react';
import { 
  FiUsers, 
  FiActivity, 
  FiCalendar, 
  FiClock,
  FiAward,
  FiTarget,
  FiUser,
  FiCheckCircle,
  FiPlayCircle,
  FiStar,
  FiTrendingUp
} from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadialBarChart, RadialBar } from 'recharts';
import api from '../../services/api';

const TrainerDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalClients: 24,
    todaysSessions: 6,
    completedWorkouts: 142,
    clientSatisfaction: 4.8,
    weeklyHours: 32,
    monthlyEarnings: 45000,
    upcomingSessions: 3,
    certificationsExpiring: 1
  });

  const [todaysSchedule, setTodaysSchedule] = useState([
    { id: 1, time: '09:00', client: 'John Doe', type: 'Strength Training', duration: 60, status: 'completed' },
    { id: 2, time: '10:30', client: 'Sarah Wilson', type: 'HIIT', duration: 45, status: 'completed' },
    { id: 3, time: '14:00', client: 'Mike Chen', type: 'Cardio', duration: 30, status: 'upcoming' },
    { id: 4, time: '15:30', client: 'Lisa Johnson', type: 'Yoga', duration: 60, status: 'upcoming' },
    { id: 5, time: '17:00', client: 'David Kim', type: 'Personal Training', duration: 90, status: 'upcoming' }
  ]);

  const [clientProgress, setClientProgress] = useState([
    { name: 'Week 1', completed: 18, planned: 20 },
    { name: 'Week 2', completed: 22, planned: 24 },
    { name: 'Week 3', completed: 19, planned: 22 },
    { name: 'Week 4', completed: 25, planned: 26 }
  ]);

  const [topClients, setTopClients] = useState([
    { name: 'John Doe', sessions: 16, progress: 92, nextGoal: 'Increase bench press to 100kg' },
    { name: 'Sarah Wilson', sessions: 14, progress: 88, nextGoal: 'Complete 5K run under 25 minutes' },
    { name: 'Mike Chen', sessions: 12, progress: 85, nextGoal: 'Lose 5kg by month end' },
    { name: 'Lisa Johnson', sessions: 11, progress: 78, nextGoal: 'Master advanced yoga poses' }
  ]);

  useEffect(() => {
    fetchTrainerStats();
  }, []);

  const fetchTrainerStats = async () => {
    try {
      const response = await api.get('/trainer/dashboard-stats');
      // Update states with real data
    } catch (error) {
      console.error('Error fetching trainer stats:', error);
    }
  };

  const trainerStatsCards = [
    { title: 'Total Clients', value: stats.totalClients, icon: FiUsers, color: 'from-blue-500 to-blue-600', change: '+3 this month' },
    { title: "Today's Sessions", value: stats.todaysSessions, icon: FiCalendar, color: 'from-green-500 to-green-600', change: '3 remaining' },
    { title: 'Completed Workouts', value: stats.completedWorkouts, icon: FiCheckCircle, color: 'from-purple-500 to-purple-600', change: '+12 this week' },
    { title: 'Client Rating', value: `${stats.clientSatisfaction}/5`, icon: FiStar, color: 'from-orange-500 to-orange-600', change: '+0.2 this month' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="h-4 w-4 text-green-500" />;
      case 'upcoming':
        return <FiPlayCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <FiClock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'upcoming':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-green-100 mt-2">Ready to help your clients achieve their fitness goals?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trainerStatsCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
                <p className="text-sm mt-1 text-gray-500">{card.change}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color}`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {todaysSchedule.map((session) => (
              <div key={session.id} className="flex items-center space-x-4 p-3 rounded-lg border border-gray-200">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">{session.time}</div>
                  <div className="text-xs text-gray-500">{session.duration}m</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{session.client}</span>
                    {getStatusIcon(session.status)}
                  </div>
                  <div className="text-xs text-gray-600">{session.type}</div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(session.status)}`}>
                  {session.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Progress Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Session Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clientProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="planned" fill="#E5E7EB" name="Planned" />
              <Bar dataKey="completed" fill="#10B981" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Clients */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Clients</h3>
        <div className="space-y-4">
          {topClients.map((client, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <FiUser className="h-6 w-6 text-gray-600" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{client.name}</h4>
                  <span className="text-sm text-gray-500">{client.sessions} sessions</span>
                </div>
                <div className="mt-1">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${client.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{client.progress}%</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{client.nextGoal}</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <FiTarget className="h-5 w-5 text-green-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
