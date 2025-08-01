import React, { useState, useEffect } from 'react';
import { 
  FiActivity, 
  FiSearch, 
  FiClock, 
  FiUsers, 
  FiTarget, 
  FiPlay, 
  FiBookmark, 
  FiStar,
  FiBarChart,
  FiZap
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const MemberWorkouts = () => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');

  // Sample workout data
  const sampleWorkouts = [
    {
      id: 1,
      name: 'Full Body Strength',
      description: 'Complete strength training workout targeting all major muscle groups',
      category: 'Strength',
      level: 'intermediate',
      duration: 45,
      rating: 4.8,
      participants: 156,
      trainer: 'Sarah Khan',
      caloriesBurned: 420,
      isBookmarked: false,
      completedTimes: 5
    },
    {
      id: 2,
      name: 'HIIT Cardio Blast',
      description: 'High-intensity interval training for maximum calorie burn',
      category: 'Cardio',
      level: 'advanced',
      duration: 30,
      rating: 4.6,
      participants: 203,
      trainer: 'Mike Johnson',
      caloriesBurned: 350,
      isBookmarked: true,
      completedTimes: 3
    },
    {
      id: 3,
      name: 'Yoga Flow',
      description: 'Relaxing yoga session for flexibility and mindfulness',
      category: 'Flexibility',
      level: 'beginner',
      duration: 60,
      rating: 4.9,
      participants: 87,
      trainer: 'Lisa Chen',
      caloriesBurned: 200,
      isBookmarked: false,
      completedTimes: 8
    },
    {
      id: 4,
      name: 'Upper Body Power',
      description: 'Intense upper body workout for strength and muscle building',
      category: 'Strength',
      level: 'advanced',
      duration: 50,
      rating: 4.7,
      participants: 134,
      trainer: 'David Wilson',
      caloriesBurned: 380,
      isBookmarked: true,
      completedTimes: 2
    }
  ];

  useEffect(() => {
    setWorkouts(sampleWorkouts);
    setLoading(false);
  }, []);

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || workout.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesLevel = filterLevel === 'all' || workout.level.toLowerCase() === filterLevel.toLowerCase();
    return matchesSearch && matchesCategory && matchesLevel;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <FiActivity className="w-8 h-8 mr-3 text-red-600" />
            Member Workouts
          </h1>
          <p className="text-gray-600">Discover and track your fitness journey</p>
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">🎯 Welcome to Member Workouts Portal</p>
            <p className="text-sm text-red-600 mt-1">User: {user?.name || 'Not logged in'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <FiActivity className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Workouts</p>
                <p className="text-2xl font-bold text-gray-900">{workouts.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <FiTarget className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{workouts.reduce((acc, w) => acc + w.completedTimes, 0)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <FiClock className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Hours Trained</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(workouts.reduce((acc, w) => acc + (w.duration * w.completedTimes), 0) / 60)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <FiZap className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Calories Burned</p>
                <p className="text-2xl font-bold text-gray-900">{workouts.reduce((acc, w) => acc + (w.caloriesBurned * w.completedTimes), 0).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search workouts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="md:w-48">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
                <option value="flexibility">Flexibility</option>
              </select>
            </div>

            <div className="md:w-48">
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Available Workouts</h2>
            <span className="text-sm text-gray-500">{filteredWorkouts.length} workouts found</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.map((workout) => (
              <div key={workout.id} className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border border-red-200 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-white text-xs font-medium rounded-full ${
                    workout.category === 'Strength' ? 'bg-red-600' :
                    workout.category === 'Cardio' ? 'bg-orange-600' :
                    'bg-green-600'
                  }`}>
                    {workout.category}
                  </span>
                  <FiBookmark 
                    className={`w-5 h-5 cursor-pointer transition-colors ${
                      workout.isBookmarked ? 'text-red-600' : 'text-gray-400 hover:text-red-600'
                    }`}
                  />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{workout.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{workout.description}</p>
                
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <FiClock className="w-4 h-4 mr-1" />
                    {workout.duration} min
                  </span>
                  <span className="flex items-center">
                    <FiTarget className="w-4 h-4 mr-1" />
                    {workout.level}
                  </span>
                  <span className="flex items-center">
                    <FiUsers className="w-4 h-4 mr-1" />
                    {workout.participants}
                  </span>
                  <span className="flex items-center">
                    <FiStar className="w-4 h-4 mr-1" />
                    {workout.rating}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Trainer: <span className="font-medium">{workout.trainer}</span></p>
                  <p className="text-sm text-gray-600">Calories: <span className="font-medium text-red-600">{workout.caloriesBurned}</span></p>
                  <p className="text-sm text-gray-600">Completed: <span className="font-medium">{workout.completedTimes} times</span></p>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center justify-center">
                    <FiPlay className="w-4 h-4 mr-2" />
                    Start
                  </button>
                  <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                    <FiBarChart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredWorkouts.length === 0 && (
            <div className="text-center py-12">
              <FiActivity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No workouts found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberWorkouts;
