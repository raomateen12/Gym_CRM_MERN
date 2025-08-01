import React, { useState, useEffect } from 'react';
import { 
  FiTrendingUp, 
  FiTarget, 
  FiActivity, 
  FiCalendar, 
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiBarChart,
  FiUser,
  FiHeart,
  FiClock,
  FiZap
} from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useAuth } from '../../contexts/AuthContext';

const MemberProgress = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample progress data
  const sampleProgressData = [
    { date: '2024-01-01', weight: 85, bodyFat: 25, bmi: 28.5, workoutDuration: 45, caloriesBurned: 350 },
    { date: '2024-02-01', weight: 82, bodyFat: 23, bmi: 27.8, workoutDuration: 50, caloriesBurned: 420 },
    { date: '2024-03-01', weight: 80, bodyFat: 21, bmi: 26.5, workoutDuration: 55, caloriesBurned: 480 },
    { date: '2024-04-01', weight: 78, bodyFat: 19, bmi: 25.2, workoutDuration: 60, caloriesBurned: 520 },
    { date: '2024-05-01', weight: 76, bodyFat: 17, bmi: 24.8, workoutDuration: 65, caloriesBurned: 580 },
    { date: '2024-06-01', weight: 74, bodyFat: 15, bmi: 23.5, workoutDuration: 70, caloriesBurned: 620 },
    { date: '2024-07-01', weight: 72, bodyFat: 13, bmi: 22.8, workoutDuration: 75, caloriesBurned: 680 }
  ];

  const [newEntry, setNewEntry] = useState({
    date: '',
    weight: '',
    bodyFat: '',
    workoutDuration: '',
    caloriesBurned: '',
    energyLevel: '',
    notes: ''
  });

  const stats = {
    totalWorkouts: 48,
    totalCalories: 12580,
    avgWorkoutDuration: 58,
    currentWeight: 72,
    weightLoss: 13,
    bodyFatReduction: 12,
    currentStreak: 7
  };

  const goals = [
    { id: 1, title: 'Weight Loss', target: 70, current: 72, unit: 'kg', progress: 85 },
    { id: 2, title: 'Body Fat', target: 12, current: 13, unit: '%', progress: 88 },
    { id: 3, title: 'Workout Frequency', target: 5, current: 4, unit: 'times/week', progress: 80 },
    { id: 4, title: 'Monthly Calories', target: 15000, current: 12580, unit: 'cal', progress: 84 }
  ];

  useEffect(() => {
    setTimeout(() => {
      setProgressData(sampleProgressData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddEntry = (e) => {
    e.preventDefault();
    const entry = {
      ...newEntry,
      id: Date.now(),
      bmi: (parseFloat(newEntry.weight) / (1.75 * 1.75)).toFixed(1) // Sample BMI calculation
    };
    setProgressData([...progressData, entry]);
    setNewEntry({
      date: '',
      weight: '',
      bodyFat: '',
      workoutDuration: '',
      caloriesBurned: '',
      energyLevel: '',
      notes: ''
    });
    setShowAddModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const StatCard = ({ title, value, unit, icon: Icon, color, change }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {value}
            {unit && <span className="text-lg text-gray-500 ml-1">{unit}</span>}
          </p>
          {change && (
            <p className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const GoalCard = ({ goal }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-semibold text-gray-900">{goal.title}</h4>
        <span className="text-sm text-gray-500">{goal.current}/{goal.target} {goal.unit}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div 
          className="bg-gradient-to-r from-red-600 to-red-700 h-2 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(goal.progress, 100)}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600">{goal.progress}% complete</p>
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
                <FiTrendingUp className="w-8 h-8 mr-3 text-red-600" />
                My Progress
              </h1>
              <p className="text-gray-600 mt-2">Track your fitness journey and monitor your goals</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add Progress
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Workouts" 
            value={stats.totalWorkouts} 
            icon={FiActivity} 
            color="bg-red-600"
            change={12}
          />
          <StatCard 
            title="Calories Burned" 
            value={stats.totalCalories.toLocaleString()} 
            icon={FiZap} 
            color="bg-red-600"
            change={8}
          />
          <StatCard 
            title="Current Weight" 
            value={stats.currentWeight} 
            unit="kg"
            icon={FiBarChart} 
            color="bg-red-600"
            change={-15}
          />
          <StatCard 
            title="Current Streak" 
            value={stats.currentStreak} 
            unit="days"
            icon={FiTarget} 
            color="bg-red-600"
            change={25}
          />
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'overview', label: 'Overview', icon: FiBarChart },
                { key: 'goals', label: 'Goals', icon: FiTarget },
                { key: 'history', label: 'History', icon: FiCalendar }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Progress</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="#dc2626" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Body Fat Progress</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="bodyFat" stroke="#dc2626" fill="#fecaca" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {[
                  { title: 'Weight Loss Milestone', description: 'Lost 10kg since starting', date: '2 days ago', icon: FiBarChart },
                  { title: 'Consistency Champion', description: '7-day workout streak', date: '1 week ago', icon: FiTarget },
                  { title: 'Calorie Crusher', description: 'Burned 500+ calories in single workout', date: '1 week ago', icon: FiZap }
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white">
                      <achievement.icon className="w-5 h-5" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                    <span className="text-xs text-gray-500">{achievement.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Body Fat</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BMI</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workout Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {progressData.map((entry, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.weight}kg</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.bodyFat}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.bmi}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.workoutDuration}min</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.caloriesBurned}cal</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Add Progress Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Progress Entry</h3>
              <form onSubmit={handleAddEntry} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newEntry.date}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={newEntry.weight}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      step="0.1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Body Fat (%)</label>
                    <input
                      type="number"
                      name="bodyFat"
                      value={newEntry.bodyFat}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      step="0.1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Workout Duration (min)</label>
                    <input
                      type="number"
                      name="workoutDuration"
                      value={newEntry.workoutDuration}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Calories Burned</label>
                    <input
                      type="number"
                      name="caloriesBurned"
                      value={newEntry.caloriesBurned}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Energy Level (1-10)</label>
                  <select
                    name="energyLevel"
                    value={newEntry.energyLevel}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select energy level</option>
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    name="notes"
                    value={newEntry.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Any additional notes..."
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Add Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberProgress;
