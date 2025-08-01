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
  FiPlay,
  FiPause,
  FiFilter,
  FiDownload,
  FiTarget,
  FiTrendingUp,
  FiStar,
  FiBookmark,
  FiX,
  FiCopy,
  FiShare2,
  FiHeart,
  FiCheckCircle
} from 'react-icons/fi';

const TrainerWorkouts = () => {
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
    isPublic: true
  });

  // Mock data for trainer workouts
  const mockWorkouts = [
    {
      id: 1,
      name: 'Upper Body Strength',
      description: 'Focus on building upper body strength with compound movements',
      category: 'Strength',
      level: 'intermediate',
      duration: '50',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: '8-10', rest: '90s' },
        { name: 'Pull-ups', sets: 3, reps: '6-8', rest: '60s' },
        { name: 'Shoulder Press', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Rows', sets: 3, reps: '10-12', rest: '60s' }
      ],
      equipment: ['Barbell', 'Dumbbells', 'Pull-up bar', 'Bench'],
      instructions: 'Focus on proper form and controlled movements. Rest adequately between sets.',
      tips: 'Warm up thoroughly before heavy lifting. Stay hydrated.',
      assignedTo: 8,
      completions: 45,
      rating: 4.7,
      isPublic: true,
      createdDate: '2024-01-20',
      lastUsed: '2024-07-10'
    },
    {
      id: 2,
      name: 'HIIT Fat Burner',
      description: 'High-intensity workout designed for maximum fat burning',
      category: 'Cardio',
      level: 'advanced',
      duration: '35',
      exercises: [
        { name: 'Jump Squats', sets: 4, reps: '45s on/15s off', rest: '60s' },
        { name: 'Burpees', sets: 4, reps: '30s on/30s off', rest: '60s' },
        { name: 'Mountain Climbers', sets: 4, reps: '45s on/15s off', rest: '60s' },
        { name: 'Plank Jacks', sets: 3, reps: '30s on/30s off', rest: '60s' }
      ],
      equipment: ['Timer', 'Mat'],
      instructions: 'Maintain high intensity during work periods. Complete rest during breaks.',
      tips: 'Listen to your body. Scale intensity as needed.',
      assignedTo: 12,
      completions: 67,
      rating: 4.8,
      isPublic: true,
      createdDate: '2024-02-15',
      lastUsed: '2024-07-12'
    },
    {
      id: 3,
      name: 'Flexibility & Mobility',
      description: 'Comprehensive stretching routine for improved flexibility',
      category: 'Flexibility',
      level: 'beginner',
      duration: '45',
      exercises: [
        { name: 'Hip Flexor Stretch', sets: 3, reps: '30s each side', rest: '15s' },
        { name: 'Hamstring Stretch', sets: 3, reps: '30s each leg', rest: '15s' },
        { name: 'Shoulder Stretch', sets: 3, reps: '20s each arm', rest: '10s' },
        { name: 'Spinal Twist', sets: 3, reps: '30s each side', rest: '15s' }
      ],
      equipment: ['Yoga mat', 'Resistance band'],
      instructions: 'Hold stretches without bouncing. Breathe deeply throughout.',
      tips: 'Never force a stretch. Gradual improvement is key.',
      assignedTo: 15,
      completions: 89,
      rating: 4.9,
      isPublic: true,
      createdDate: '2024-03-05',
      lastUsed: '2024-07-11'
    },
    {
      id: 4,
      name: 'Core Stability',
      description: 'Targeted core workout for stability and strength',
      category: 'Strength',
      level: 'intermediate',
      duration: '30',
      exercises: [
        { name: 'Dead Bug', sets: 3, reps: '10 each side', rest: '45s' },
        { name: 'Bird Dog', sets: 3, reps: '10 each side', rest: '45s' },
        { name: 'Pallof Press', sets: 3, reps: '12 each side', rest: '60s' },
        { name: 'Plank Variations', sets: 3, reps: '45s hold', rest: '60s' }
      ],
      equipment: ['Resistance band', 'Mat'],
      instructions: 'Focus on quality over quantity. Maintain neutral spine.',
      tips: 'Progress gradually. Core stability takes time to develop.',
      assignedTo: 6,
      completions: 34,
      rating: 4.6,
      isPublic: false,
      createdDate: '2024-04-10',
      lastUsed: '2024-07-08'
    },
    {
      id: 5,
      name: 'Beginner Full Body',
      description: 'Complete beginner-friendly full body workout',
      category: 'Strength',
      level: 'beginner',
      duration: '40',
      exercises: [
        { name: 'Bodyweight Squats', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Push-ups (Modified)', sets: 3, reps: '8-10', rest: '60s' },
        { name: 'Assisted Pull-ups', sets: 3, reps: '5-8', rest: '90s' },
        { name: 'Plank Hold', sets: 3, reps: '30-45s', rest: '60s' }
      ],
      equipment: ['Assistance band', 'Mat'],
      instructions: 'Start with proper form. Progress gradually as strength improves.',
      tips: 'Consistency is key. Focus on movement quality.',
      assignedTo: 20,
      completions: 156,
      rating: 4.8,
      isPublic: true,
      createdDate: '2024-05-01',
      lastUsed: '2024-07-13'
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
                         workout.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || workout.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesLevel = filterLevel === 'all' || workout.level === filterLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
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
      isPublic: true
    });
  };

  // CRUD operations
  const handleAddWorkout = (e) => {
    e.preventDefault();
    const newWorkout = {
      id: workouts.length + 1,
      ...formData,
      assignedTo: 0,
      completions: 0,
      rating: 0,
      createdDate: new Date().toISOString().split('T')[0],
      lastUsed: null
    };
    setWorkouts(prev => [...prev, newWorkout]);
    setShowAddModal(false);
    resetForm();
  };

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
      isPublic: workout.isPublic
    });
    setShowEditModal(true);
  };

  const handleUpdateWorkout = (e) => {
    e.preventDefault();
    setWorkouts(prev => prev.map(workout => 
      workout.id === currentWorkout.id 
        ? { ...workout, ...formData }
        : workout
    ));
    setShowEditModal(false);
    resetForm();
    setCurrentWorkout(null);
  };

  const handleViewWorkout = (workout) => {
    setCurrentWorkout(workout);
    setShowViewModal(true);
  };

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
      case 'Strength': return 'bg-red-100 text-red-800';
      case 'Cardio': return 'bg-red-100 text-red-800';
      case 'Flexibility': return 'bg-red-100 text-red-800';
      case 'HIIT': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const WorkoutCard = ({ workout }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
            {!workout.isPublic && (
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                Private
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-3">{workout.description}</p>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(workout.category)}`}>
              {workout.category}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(workout.level)}`}>
              {workout.level}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="flex items-center text-sm text-gray-500">
              <FiClock className="w-4 h-4 mr-1" />
              {workout.duration} min
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <FiUsers className="w-4 h-4 mr-1" />
              {workout.assignedTo} members
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <FiCheckCircle className="w-4 h-4 mr-1" />
              {workout.completions} completed
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <FiStar className="w-4 h-4 mr-1 text-yellow-500" />
              {workout.rating || 'No rating'}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <button 
            onClick={() => handleViewWorkout(workout)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            title="Duplicate Workout"
          >
            <FiCopy className="w-4 h-4" />
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
            Last used: {workout.lastUsed || 'Never'}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button className="text-sm text-red-600 hover:text-red-700 font-medium">
            Assign to Member
          </button>
          <button className="text-sm text-green-600 hover:text-green-700 font-medium">
            Start Session
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-500 hover:text-red-500">
            <FiHeart className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-500 hover:text-red-500">
            <FiShare2 className="w-4 h-4" />
          </button>
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
                <FiActivity className="w-8 h-8 mr-3 text-red-600" />
                My Workouts
              </h1>
              <p className="text-gray-600 mt-2">
                Create, manage, and assign workout plans to your members
              </p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Create Workout
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
              <div className="p-3 bg-red-100 rounded-full">
                <FiActivity className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Public Workouts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {workouts.filter(w => w.isPublic).length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiShare2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assignments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {workouts.reduce((sum, w) => sum + w.assignedTo, 0)}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FiUsers className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {workouts.filter(w => w.rating > 0).length > 0 
                    ? (workouts.filter(w => w.rating > 0).reduce((sum, w) => sum + w.rating, 0) / workouts.filter(w => w.rating > 0).length).toFixed(1)
                    : '0.0'}
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
                <option value="hiit">HIIT</option>
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
    </div>
  );
};

export default TrainerWorkouts;
