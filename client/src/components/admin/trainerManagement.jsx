import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FiUsers, 
  FiSearch, 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiEye, 
  FiStar,
  FiCalendar,
  FiClock,
  FiAward,
  FiActivity,
  FiPhone,
  FiMail,
  FiFilter,
  FiDownload
} from 'react-icons/fi';

const TrainerManagement = () => {
  const { user } = useAuth();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentTrainer, setCurrentTrainer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    certifications: [],
    bio: '',
    status: 'active'
  });

  // Mock data
  const mockTrainers = [
    {
      id: 1,
      name: 'Sarah Khan',
      email: 'sarah.khan@gym.com',
      phone: '+92 301 2345678',
      specialization: 'Strength Training',
      experience: '5 years',
      certifications: ['NASM-CPT', 'CSCS'],
      rating: 4.8,
      totalClients: 25,
      activeClients: 18,
      monthlyHours: 120,
      joinDate: '2023-01-15',
      status: 'active',
      avatar: null,
      bio: 'Certified strength trainer with 5+ years experience in bodybuilding and powerlifting.',
      achievements: ['Best Trainer 2023', 'Client Transformation Award']
    },
    {
      id: 2,
      name: 'Ahmad Hassan',
      email: 'ahmad.hassan@gym.com',
      phone: '+92 302 3456789',
      specialization: 'Cardio & Weight Loss',
      experience: '3 years',
      certifications: ['ACE-CPT', 'ACSM'],
      rating: 4.6,
      totalClients: 20,
      activeClients: 15,
      monthlyHours: 100,
      joinDate: '2023-06-10',
      status: 'active',
      avatar: null,
      bio: 'Passionate about helping clients achieve their weight loss goals through cardio and nutrition.',
      achievements: ['Client Success Award']
    },
    {
      id: 3,
      name: 'Fatima Sheikh',
      email: 'fatima.sheikh@gym.com',
      phone: '+92 303 4567890',
      specialization: 'Yoga & Flexibility',
      experience: '4 years',
      certifications: ['RYT-200', 'NASM-CES'],
      rating: 4.9,
      totalClients: 30,
      activeClients: 25,
      monthlyHours: 90,
      joinDate: '2023-03-20',
      status: 'active',
      avatar: null,
      bio: 'Experienced yoga instructor specializing in flexibility and mind-body wellness.',
      achievements: ['Wellness Coach Award', 'Client Satisfaction Excellence']
    },
    {
      id: 4,
      name: 'Omar Malik',
      email: 'omar.malik@gym.com',
      phone: '+92 304 5678901',
      specialization: 'Martial Arts',
      experience: '6 years',
      certifications: ['Black Belt Karate', 'MMA Certified'],
      rating: 4.7,
      totalClients: 15,
      activeClients: 12,
      monthlyHours: 80,
      joinDate: '2022-12-01',
      status: 'active',
      avatar: null,
      bio: 'Martial arts expert with focus on self-defense and physical conditioning.',
      achievements: ['Combat Sports Excellence']
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setTrainers(mockTrainers);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'all' || trainer.specialization.toLowerCase().includes(filterSpecialty.toLowerCase());
    return matchesSearch && matchesSpecialty;
  });

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCertificationChange = (e) => {
    const certifications = e.target.value.split(',').map(cert => cert.trim()).filter(cert => cert);
    setFormData(prev => ({ ...prev, certifications }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialization: '',
      experience: '',
      certifications: [],
      bio: '',
      status: 'active'
    });
  };

  // Add trainer
  const handleAddTrainer = (e) => {
    e.preventDefault();
    const newTrainer = {
      id: trainers.length + 1,
      ...formData,
      rating: 0,
      totalClients: 0,
      activeClients: 0,
      monthlyHours: 0,
      joinDate: new Date().toISOString().split('T')[0],
      avatar: null,
      achievements: []
    };
    setTrainers(prev => [...prev, newTrainer]);
    setShowAddModal(false);
    resetForm();
  };

  // Edit trainer
  const handleEditTrainer = (trainer) => {
    setCurrentTrainer(trainer);
    setFormData({
      name: trainer.name,
      email: trainer.email,
      phone: trainer.phone,
      specialization: trainer.specialization,
      experience: trainer.experience,
      certifications: trainer.certifications || [],
      bio: trainer.bio || '',
      status: trainer.status
    });
    setShowEditModal(true);
  };

  const handleUpdateTrainer = (e) => {
    e.preventDefault();
    setTrainers(prev => prev.map(trainer => 
      trainer.id === currentTrainer.id 
        ? { ...trainer, ...formData }
        : trainer
    ));
    setShowEditModal(false);
    resetForm();
    setCurrentTrainer(null);
  };

  // View trainer
  const handleViewTrainer = (trainer) => {
    setCurrentTrainer(trainer);
    setShowViewModal(true);
  };

  // Delete trainer
  const handleDeleteTrainer = (trainer) => {
    setCurrentTrainer(trainer);
    setShowDeleteModal(true);
  };

  const confirmDeleteTrainer = () => {
    setTrainers(prev => prev.filter(trainer => trainer.id !== currentTrainer.id));
    setShowDeleteModal(false);
    setCurrentTrainer(null);
  };

  const TrainerCard = ({ trainer }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {trainer.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{trainer.name}</h3>
            <p className="text-sm text-gray-600">{trainer.specialization}</p>
            <div className="flex items-center mt-1">
              <FiStar className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm text-gray-700 ml-1">{trainer.rating}</span>
              <span className="text-sm text-gray-500 ml-2">({trainer.totalClients} clients)</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => handleViewTrainer(trainer)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            title="View Trainer"
          >
            <FiEye className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleEditTrainer(trainer)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
            title="Edit Trainer"
          >
            <FiEdit className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDeleteTrainer(trainer)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            title="Delete Trainer"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>        <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="text-lg font-semibold text-red-600">{trainer.activeClients}</div>
          <div className="text-sm text-gray-600">Active Clients</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-lg font-semibold text-gray-600">{trainer.monthlyHours}h</div>
          <div className="text-sm text-gray-600">Monthly Hours</div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <FiMail className="w-4 h-4 mr-2" />
          {trainer.email}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FiPhone className="w-4 h-4 mr-2" />
          {trainer.phone}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FiCalendar className="w-4 h-4 mr-2" />
          {trainer.experience} experience
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Certifications</h4>
        <div className="flex flex-wrap gap-2">
          {trainer.certifications.map((cert, index) => (
            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              {cert}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Achievements</h4>
        <div className="flex flex-wrap gap-2">
          {trainer.achievements.map((achievement, index) => (
            <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              <FiAward className="w-3 h-3 inline mr-1" />
              {achievement}
            </span>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{trainer.bio}</p>

      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          trainer.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {trainer.status.charAt(0).toUpperCase() + trainer.status.slice(1)}
        </span>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded hover:bg-blue-100">
            View Schedule
          </button>
          <button className="px-3 py-1 text-sm text-green-600 bg-green-50 rounded hover:bg-green-100">
            View Clients
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
                <FiActivity className="w-8 h-8 mr-3 text-purple-600" />
                Trainer Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage trainers, their schedules, and performance metrics
              </p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add New Trainer
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Trainers</p>
                <p className="text-2xl font-bold text-gray-900">{trainers.length}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FiUsers className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Trainers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {trainers.filter(t => t.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiActivity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">
                  {trainers.reduce((sum, t) => sum + t.activeClients, 0)}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(trainers.reduce((sum, t) => sum + t.rating, 0) / trainers.length).toFixed(1)}
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
                  placeholder="Search trainers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Specializations</option>
                <option value="strength">Strength Training</option>
                <option value="cardio">Cardio & Weight Loss</option>
                <option value="yoga">Yoga & Flexibility</option>
                <option value="martial">Martial Arts</option>
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

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTrainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      </div>

      {/* Add Trainer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Trainer</h2>
            <form onSubmit={handleAddTrainer}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    placeholder="e.g., Strength Training, Yoga, Cardio"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="e.g., 5 years"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
                  <input
                    type="text"
                    name="certifications"
                    value={formData.certifications.join(', ')}
                    onChange={handleCertificationChange}
                    placeholder="e.g., NASM-CPT, ACSM, ACE (comma separated)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Brief description about the trainer..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Add Trainer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Trainer Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Trainer</h2>
            <form onSubmit={handleUpdateTrainer}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    placeholder="e.g., Strength Training, Yoga, Cardio"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="e.g., 5 years"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
                  <input
                    type="text"
                    name="certifications"
                    value={formData.certifications.join(', ')}
                    onChange={handleCertificationChange}
                    placeholder="e.g., NASM-CPT, ACSM, ACE (comma separated)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Brief description about the trainer..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                    setCurrentTrainer(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Update Trainer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Trainer Modal */}
      {showViewModal && currentTrainer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Trainer Details</h2>
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  {currentTrainer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{currentTrainer.name}</h3>
                <p className="text-gray-600">{currentTrainer.specialization}</p>
                <div className="flex items-center justify-center mt-2">
                  <FiStar className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{currentTrainer.rating}</span>
                  <span className="text-sm text-gray-500 ml-2">({currentTrainer.totalClients} clients)</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-semibold text-blue-600">{currentTrainer.activeClients}</div>
                  <div className="text-sm text-gray-600">Active Clients</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-semibold text-green-600">{currentTrainer.monthlyHours}h</div>
                  <div className="text-sm text-gray-600">Monthly Hours</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{currentTrainer.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900">{currentTrainer.phone}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience</label>
                  <p className="text-gray-900">{currentTrainer.experience}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Join Date</label>
                  <p className="text-gray-900">{currentTrainer.joinDate}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                  currentTrainer.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {currentTrainer.status.charAt(0).toUpperCase() + currentTrainer.status.slice(1)}
                </span>
              </div>
              
              {currentTrainer.certifications && currentTrainer.certifications.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                  <div className="flex flex-wrap gap-2">
                    {currentTrainer.certifications.map((cert, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {currentTrainer.achievements && currentTrainer.achievements.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
                  <div className="flex flex-wrap gap-2">
                    {currentTrainer.achievements.map((achievement, index) => (
                      <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        <FiAward className="w-3 h-3 inline mr-1" />
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {currentTrainer.bio && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <p className="text-gray-900">{currentTrainer.bio}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Trainer Modal */}
      {showDeleteModal && currentTrainer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Delete Trainer</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete trainer <strong>{currentTrainer.name}</strong>? This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setCurrentTrainer(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteTrainer}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerManagement;
