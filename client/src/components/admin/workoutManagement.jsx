import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FiActivity, 
  FiSearch, 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiEye, 
  FiClock,
  FiUsers,
  FiBarChart,
  FiPlay,
  FiPause,
  FiFilter,
  FiDownload,
  FiTarget,
  FiTrendingUp,
  FiStar,
  FiBookmark,
  FiX
} from 'react-icons/fi';

const WorkoutManagement = () => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    level: 'beginner',
    duration: '',
    exercises: [],
    equipment: [],
    instructions: '',
    tips: '',
    status: 'active'
  });

  // Mock data
  const mockWorkouts = [
    {
      id: 1,
      name: 'Full Body Strength Training',
      description: 'Complete full-body workout focusing on major muscle groups',
      category: 'Strength',
      level: 'intermediate',
      duration: '45',
      exercises: [
        { name: 'Squats', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Push-ups', sets: 3, reps: '10-12', rest: '45s' },
        { name: 'Deadlifts', sets: 3, reps: '8-10', rest: '90s' },
        { name: 'Pull-ups', sets: 3, reps: '6-8', rest: '60s' }
      ],
      equipment: ['Barbell', 'Dumbbells', 'Pull-up bar'],
      instructions: 'Warm up for 5-10 minutes before starting. Focus on proper form over speed.',
      tips: 'Rest 48-72 hours between sessions. Stay hydrated throughout.',
      trainer: 'Sarah Khan',
      participants: 25,
      rating: 4.8,
      status: 'active',
      createdDate: '2024-01-15',
      lastModified: '2024-07-10'
    },
    {
      id: 2,
      name: 'HIIT Cardio Blast',
      description: 'High-intensity interval training for maximum calorie burn',
      category: 'Cardio',
      level: 'advanced',
      duration: '30',
      exercises: [
        { name: 'Burpees', sets: 4, reps: '30s on/30s off', rest: '60s' },
        { name: 'Mountain Climbers', sets: 4, reps: '30s on/30s off', rest: '60s' },
        { name: 'Jump Squats', sets: 4, reps: '30s on/30s off', rest: '60s' },
        { name: 'High Knees', sets: 4, reps: '30s on/30s off', rest: '60s' }
      ],
      equipment: ['Timer', 'Mat'],
      instructions: 'Work at maximum intensity during work periods. Complete rest during rest periods.',
      tips: 'Listen to your body. Modify exercises if needed.',
      trainer: 'Ahmad Hassan',
      participants: 18,
      rating: 4.6,
      status: 'active',
      createdDate: '2024-02-20',
      lastModified: '2024-07-08'
    },
    {
      id: 3,
      name: 'Yoga Flow for Flexibility',
      description: 'Gentle yoga sequence to improve flexibility and reduce stress',
      category: 'Flexibility',
      level: 'beginner',
      duration: '60',
      exercises: [
        { name: 'Sun Salutation', sets: 3, reps: '5 rounds', rest: '30s' },
        { name: 'Warrior Pose', sets: 2, reps: '30s each side', rest: '15s' },
        { name: 'Downward Dog', sets: 3, reps: '45s hold', rest: '30s' },
        { name: 'Child\'s Pose', sets: 1, reps: '2 minutes', rest: '0s' }
      ],
      equipment: ['Yoga mat', 'Blocks', 'Strap'],
      instructions: 'Focus on breathing and gentle movements. Don\'t force any poses.',
      tips: 'Practice regularly for best results. Use props as needed.',
      trainer: 'Fatima Sheikh',
      participants: 32,
      rating: 4.9,
      status: 'active',
      createdDate: '2024-03-10',
      lastModified: '2024-07-12'
    },
    {
      id: 4,
      name: 'Martial Arts Basics',
      description: 'Introduction to martial arts techniques and conditioning',
      category: 'Martial Arts',
      level: 'beginner',
      duration: '50',
      exercises: [
        { name: 'Basic Punches', sets: 3, reps: '20 each', rest: '45s' },
        { name: 'Kicks Practice', sets: 3, reps: '15 each leg', rest: '60s' },
        { name: 'Shadow Boxing', sets: 3, reps: '2 minutes', rest: '90s' },
        { name: 'Stance Training', sets: 2, reps: '3 minutes', rest: '60s' }
      ],
      equipment: ['Training pads', 'Gloves', 'Protective gear'],
      instructions: 'Start slowly and focus on technique. Speed comes with practice.',
      tips: 'Respect your training partners. Safety first.',
      trainer: 'Omar Malik',
      participants: 12,
      rating: 4.7,
      status: 'active',
      createdDate: '2024-04-05',
      lastModified: '2024-07-11'
    },
    {
      id: 5,
      name: 'Core Crusher',
      description: 'Intensive core strengthening workout for all fitness levels',
      category: 'Strength',
      level: 'intermediate',
      duration: '25',
      exercises: [
        { name: 'Plank', sets: 3, reps: '60s hold', rest: '45s' },
        { name: 'Russian Twists', sets: 3, reps: '20 each side', rest: '30s' },
        { name: 'Leg Raises', sets: 3, reps: '15', rest: '45s' },
        { name: 'Bicycle Crunches', sets: 3, reps: '20 each side', rest: '30s' }
      ],
      equipment: ['Mat', 'Medicine ball'],
      instructions: 'Engage your core throughout. Quality over quantity.',
      tips: 'Breathe consistently. Don\'t hold your breath.',
      trainer: 'Sarah Khan',
      participants: 28,
      rating: 4.5,
      status: 'active',
      createdDate: '2024-05-12',
      lastModified: '2024-07-09'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setWorkouts(mockWorkouts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.trainer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || workout.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesLevel = filterLevel === 'all' || workout.level === filterLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEquipmentChange = (e) => {
    const equipment = e.target.value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, equipment }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      level: 'beginner',
      duration: '',
      exercises: [],
      equipment: [],
      instructions: '',
      tips: '',
      status: 'active'
    });
  };

  // Add workout
  const handleAddWorkout = (e) => {
    e.preventDefault();
    const newWorkout = {
      id: workouts.length + 1,
      ...formData,
      trainer: user?.name || 'Admin',
      participants: 0,
      rating: 0,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    setWorkouts(prev => [...prev, newWorkout]);
    setShowAddModal(false);
    resetForm();
  };

  // Edit workout
  const handleEditWorkout = (workout) => {
    setCurrentWorkout(workout);
    setFormData({
      name: workout.name,
      description: workout.description,
      category: workout.category,
      level: workout.level,
      duration: workout.duration,
      exercises: workout.exercises || [],
      equipment: workout.equipment || [],
      instructions: workout.instructions || '',
      tips: workout.tips || '',
      status: workout.status
    });
    setShowEditModal(true);
  };

  const handleUpdateWorkout = (e) => {
    e.preventDefault();
    setWorkouts(prev => prev.map(workout => 
      workout.id === currentWorkout.id 
        ? { ...workout, ...formData, lastModified: new Date().toISOString().split('T')[0] }
        : workout
    ));
    setShowEditModal(false);
    resetForm();
    setCurrentWorkout(null);
  };

  // View workout
  const handleViewWorkout = (workout) => {
    setCurrentWorkout(workout);
    setShowViewModal(true);
  };

  // Delete workout
  const handleDeleteWorkout = (workout) => {
    setCurrentWorkout(workout);
    setShowDeleteModal(true);
  };

  const confirmDeleteWorkout = () => {
    setWorkouts(prev => prev.filter(workout => workout.id !== currentWorkout.id));
    setShowDeleteModal(false);
    setCurrentWorkout(null);
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Strength': return 'bg-blue-100 text-blue-800';
      case 'Cardio': return 'bg-red-100 text-red-800';
      case 'Flexibility': return 'bg-purple-100 text-purple-800';
      case 'Martial Arts': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const WorkoutCard = ({ workout }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{workout.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{workout.description}</p>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(workout.category)}`}>
              {workout.category}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(workout.level)}`}>
              {workout.level}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center">
              <FiClock className="w-4 h-4 mr-1" />
              {workout.duration} min
            </div>
            <div className="flex items-center">
              <FiUsers className="w-4 h-4 mr-1" />
              {workout.participants} joined
            </div>
            <div className="flex items-center">
              <FiStar className="w-4 h-4 mr-1 text-yellow-500" />
              {workout.rating}
            </div>
          </div>

          <p className="text-sm text-gray-600">
            <span className="font-medium">Trainer:</span> {workout.trainer}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <button 
            onClick={() => handleViewWorkout(workout)}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            title="View Workout"
          >
            <FiEye className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleEditWorkout(workout)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
            title="Edit Workout"
          >
            <FiEdit className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDeleteWorkout(workout)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            title="Delete Workout"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {workout.exercises.length} exercises
          </span>
          <span className="text-gray-600">
            Equipment: {workout.equipment.slice(0, 2).join(', ')}
            {workout.equipment.length > 2 && ` +${workout.equipment.length - 2} more`}
          </span>
        </div>
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
                <FiActivity className="w-8 h-8 mr-3 text-blue-600" />
                Workout Management
              </h1>
              <p className="text-gray-600 mt-2">
                Create, manage, and organize workout plans for your gym members
              </p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add New Workout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Workouts</p>
                <p className="text-2xl font-bold text-gray-900">{workouts.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FiActivity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Workouts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {workouts.filter(w => w.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiPlay className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Participants</p>
                <p className="text-2xl font-bold text-gray-900">
                  {workouts.reduce((sum, w) => sum + w.participants, 0)}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FiUsers className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {workouts.length > 0 ? (workouts.reduce((sum, w) => sum + w.rating, 0) / workouts.length).toFixed(1) : '0.0'}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <FiStar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search workouts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
                <option value="flexibility">Flexibility</option>
                <option value="martial arts">Martial Arts</option>
              </select>
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <FiFilter className="w-4 h-4 mr-2" />
                More Filters
              </button>
              <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <FiDownload className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Workouts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>

        {filteredWorkouts.length === 0 && (
          <div className="text-center py-12">
            <FiActivity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workouts found</h3>
            <p className="text-gray-600">Try adjusting your search or filters, or create a new workout.</p>
          </div>
        )}
      </div>

      {/* Add Workout Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Workout</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddWorkout} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workout Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Strength">Strength</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Flexibility">Flexibility</option>
                    <option value="Martial Arts">Martial Arts</option>
                    <option value="HIIT">HIIT</option>
                    <option value="Yoga">Yoga</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level *
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Equipment (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="equipment"
                    value={formData.equipment.join(', ')}
                    onChange={handleEquipmentChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Dumbbells, Barbell, Mat"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructions
                </label>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Detailed instructions for performing the workout..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tips & Notes
                </label>
                <textarea
                  name="tips"
                  value={formData.tips}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Additional tips or safety notes..."
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Workout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Workout Modal */}
      {showEditModal && currentWorkout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Workout</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateWorkout} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workout Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Strength">Strength</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Flexibility">Flexibility</option>
                    <option value="Martial Arts">Martial Arts</option>
                    <option value="HIIT">HIIT</option>
                    <option value="Yoga">Yoga</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level *
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Equipment (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="equipment"
                    value={formData.equipment.join(', ')}
                    onChange={handleEquipmentChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Dumbbells, Barbell, Mat"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructions
                </label>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Detailed instructions for performing the workout..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tips & Notes
                </label>
                <textarea
                  name="tips"
                  value={formData.tips}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Additional tips or safety notes..."
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Workout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Workout Modal */}
      {showViewModal && currentWorkout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Workout Details</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Header Info */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {currentWorkout.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{currentWorkout.description}</p>
                    
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(currentWorkout.category)}`}>
                        {currentWorkout.category}
                      </span>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getLevelColor(currentWorkout.level)}`}>
                        {currentWorkout.level}
                      </span>
                      <span className="flex items-center text-gray-600">
                        <FiClock className="w-4 h-4 mr-1" />
                        {currentWorkout.duration} min
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-4 mb-2">
                      <div className="flex items-center text-yellow-600">
                        <FiStar className="w-5 h-5 mr-1" />
                        <span className="font-semibold">{currentWorkout.rating}</span>
                      </div>
                      <div className="flex items-center text-blue-600">
                        <FiUsers className="w-5 h-5 mr-1" />
                        <span className="font-semibold">{currentWorkout.participants}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      by {currentWorkout.trainer}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Duration</p>
                      <p className="text-2xl font-bold text-blue-900">{currentWorkout.duration} min</p>
                    </div>
                    <FiClock className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Exercises</p>
                      <p className="text-2xl font-bold text-purple-900">{currentWorkout.exercises.length}</p>
                    </div>
                    <FiTarget className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Participants</p>
                      <p className="text-2xl font-bold text-green-900">{currentWorkout.participants}</p>
                    </div>
                    <FiUsers className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Exercises */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FiActivity className="w-5 h-5 mr-2" />
                  Exercises
                </h4>
                <div className="space-y-3">
                  {currentWorkout.exercises.map((exercise, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">{exercise.name}</h5>
                            <p className="text-sm text-gray-600">
                              {exercise.sets} sets × {exercise.reps} reps
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Rest: {exercise.rest}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Equipment Required</h4>
                <div className="flex flex-wrap gap-2">
                  {currentWorkout.equipment.map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              {currentWorkout.instructions && (
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-3">Instructions</h4>
                  <p className="text-blue-800 leading-relaxed">{currentWorkout.instructions}</p>
                </div>
              )}

              {/* Tips */}
              {currentWorkout.tips && (
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-yellow-900 mb-3">Tips & Notes</h4>
                  <p className="text-yellow-800 leading-relaxed">{currentWorkout.tips}</p>
                </div>
              )}

              {/* Meta Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Created Date:</p>
                    <p className="font-medium text-gray-900">{currentWorkout.createdDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Last Modified:</p>
                    <p className="font-medium text-gray-900">{currentWorkout.lastModified}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  handleEditWorkout(currentWorkout);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Workout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && currentWorkout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delete Workout</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this workout? This action cannot be undone.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-medium text-red-900">{currentWorkout.name}</p>
                <p className="text-sm text-red-700">
                  {currentWorkout.participants} members are currently enrolled
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteWorkout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Workout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutManagement;
