import React, { useState, useEffect } from 'react';
import { 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiCheck, 
  FiX,
  FiMapPin,
  FiActivity,
  FiStar,
  FiFilter,
  FiSearch
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const MemberBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [newBooking, setNewBooking] = useState({
    type: 'personal',
    trainerId: '',
    date: '',
    time: '',
    duration: '60',
    location: 'gym-floor',
    notes: ''
  });

  // Sample bookings data
  const sampleBookings = [
    {
      id: 1,
      type: 'personal',
      trainer: {
        id: 1,
        name: 'Sarah Khan',
        specialization: 'Strength Training',
        rating: 4.8,
        image: null
      },
      date: '2024-07-16',
      time: '10:00',
      duration: 60,
      location: 'Gym Floor',
      status: 'confirmed',
      price: 2500,
      notes: 'Focus on upper body strength',
      createdAt: '2024-07-10',
      canCancel: true,
      canReschedule: true
    },
    {
      id: 2,
      type: 'group',
      trainer: {
        id: 2,
        name: 'Ahmad Hassan',
        specialization: 'HIIT Training',
        rating: 4.6,
        image: null
      },
      date: '2024-07-17',
      time: '18:00',
      duration: 45,
      location: 'Studio A',
      status: 'confirmed',
      price: 1500,
      notes: 'High-intensity cardio session',
      createdAt: '2024-07-11',
      canCancel: true,
      canReschedule: false,
      participants: 8,
      maxParticipants: 12
    },
    {
      id: 3,
      type: 'personal',
      trainer: {
        id: 3,
        name: 'Fatima Sheikh',
        specialization: 'Yoga & Flexibility',
        rating: 4.9,
        image: null
      },
      date: '2024-07-12',
      time: '09:00',
      duration: 75,
      location: 'Yoga Studio',
      status: 'completed',
      price: 3000,
      notes: 'Morning yoga session',
      createdAt: '2024-07-08',
      canCancel: false,
      canReschedule: false,
      rating: 5,
      feedback: 'Excellent session, felt very relaxed after'
    },
    {
      id: 4,
      type: 'consultation',
      trainer: {
        id: 4,
        name: 'Omar Malik',
        specialization: 'Fitness Consultation',
        rating: 4.7,
        image: null
      },
      date: '2024-07-18',
      time: '14:00',
      duration: 30,
      location: 'Consultation Room',
      status: 'pending',
      price: 1000,
      notes: 'Initial fitness assessment',
      createdAt: '2024-07-13',
      canCancel: true,
      canReschedule: true
    }
  ];

  const trainers = [
    { id: 1, name: 'Sarah Khan', specialization: 'Strength Training', rating: 4.8, hourlyRate: 2500 },
    { id: 2, name: 'Ahmad Hassan', specialization: 'HIIT Training', rating: 4.6, hourlyRate: 2000 },
    { id: 3, name: 'Fatima Sheikh', specialization: 'Yoga & Flexibility', rating: 4.9, hourlyRate: 2800 },
    { id: 4, name: 'Omar Malik', specialization: 'Fitness Consultation', rating: 4.7, hourlyRate: 1500 }
  ];

  useEffect(() => {
    setTimeout(() => {
      setBookings(sampleBookings);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    if (activeTab === 'upcoming') {
      return matchesSearch && matchesStatus && ['confirmed', 'pending'].includes(booking.status);
    } else if (activeTab === 'completed') {
      return matchesSearch && matchesStatus && booking.status === 'completed';
    } else if (activeTab === 'cancelled') {
      return matchesSearch && matchesStatus && booking.status === 'cancelled';
    }
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'personal': return 'bg-red-100 text-red-800';
      case 'group': return 'bg-purple-100 text-purple-800';
      case 'consultation': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddBooking = (e) => {
    e.preventDefault();
    const selectedTrainer = trainers.find(t => t.id === parseInt(newBooking.trainerId));
    const booking = {
      id: Date.now(),
      ...newBooking,
      trainer: selectedTrainer,
      status: 'pending',
      price: selectedTrainer.hourlyRate * (parseInt(newBooking.duration) / 60),
      createdAt: new Date().toISOString().split('T')[0],
      canCancel: true,
      canReschedule: true
    };
    setBookings([...bookings, booking]);
    setNewBooking({
      type: 'personal',
      trainerId: '',
      date: '',
      time: '',
      duration: '60',
      location: 'gym-floor',
      notes: ''
    });
    setShowAddModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancelBooking = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' }
        : booking
    ));
  };

  const BookingCard = ({ booking }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(booking.type)}`}>
              {booking.type}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
              {booking.status}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{booking.trainer.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{booking.trainer.specialization}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-red-600">₹{booking.price}</p>
          <div className="flex items-center text-sm text-gray-500">
            <FiStar className="w-4 h-4 mr-1" />
            {booking.trainer.rating}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <FiCalendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{booking.date}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FiClock className="w-4 h-4 mr-2" />
          <span className="text-sm">{booking.time} ({booking.duration} min)</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FiMapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{booking.location}</span>
        </div>
        {booking.type === 'group' && (
          <div className="flex items-center text-gray-600">
            <FiUser className="w-4 h-4 mr-2" />
            <span className="text-sm">{booking.participants}/{booking.maxParticipants} participants</span>
          </div>
        )}
      </div>

      {booking.notes && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">{booking.notes}</p>
        </div>
      )}

      {booking.status === 'completed' && booking.feedback && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium text-green-800 mr-2">Your Rating:</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className={`w-4 h-4 ${i < booking.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
          </div>
          <p className="text-sm text-green-700">{booking.feedback}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {booking.status === 'confirmed' && (
            <>
              <button className="flex items-center px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg text-sm">
                <FiActivity className="w-4 h-4 mr-1" />
                Start Session
              </button>
              {booking.canReschedule && (
                <button className="flex items-center px-3 py-1 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                  <FiEdit2 className="w-4 h-4 mr-1" />
                  Reschedule
                </button>
              )}
            </>
          )}
          {booking.status === 'pending' && (
            <button className="flex items-center px-3 py-1 text-yellow-600 border border-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors text-sm">
              <FiClock className="w-4 h-4 mr-1" />
              Waiting Confirmation
            </button>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {booking.canCancel && booking.status !== 'cancelled' && (
            <button
              onClick={() => handleCancelBooking(booking.id)}
              className="flex items-center px-3 py-1 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
            >
              <FiX className="w-4 h-4 mr-1" />
              Cancel
            </button>
          )}
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
                <FiCalendar className="w-8 h-8 mr-3 text-red-600" />
                My Bookings
              </h1>
              <p className="text-gray-600 mt-2">Manage your training sessions and appointments</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Book Session
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              </div>
              <div className="p-3 bg-red-600 rounded-full">
                <FiCalendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.filter(b => ['confirmed', 'pending'].includes(b.status)).length}</p>
              </div>
              <div className="p-3 bg-green-600 rounded-full">
                <FiClock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.filter(b => b.status === 'completed').length}</p>
              </div>
              <div className="p-3 bg-blue-600 rounded-full">
                <FiCheck className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">₹{bookings.reduce((sum, b) => sum + b.price, 0)}</p>
              </div>
              <div className="p-3 bg-purple-600 rounded-full">
                <FiStar className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'upcoming', label: 'Upcoming', icon: FiClock },
                { key: 'completed', label: 'Completed', icon: FiCheck },
                { key: 'cancelled', label: 'Cancelled', icon: FiX }
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

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <FiSearch className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>

        {/* Add Booking Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Book New Session</h3>
              <form onSubmit={handleAddBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
                  <select
                    name="type"
                    value={newBooking.type}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="personal">Personal Training</option>
                    <option value="group">Group Session</option>
                    <option value="consultation">Consultation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trainer</label>
                  <select
                    name="trainerId"
                    value={newBooking.trainerId}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="">Select Trainer</option>
                    {trainers.map(trainer => (
                      <option key={trainer.id} value={trainer.id}>
                        {trainer.name} - {trainer.specialization} (₹{trainer.hourlyRate}/hr)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={newBooking.date}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={newBooking.time}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                  <select
                    name="duration"
                    value={newBooking.duration}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select
                    name="location"
                    value={newBooking.location}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="gym-floor">Gym Floor</option>
                    <option value="studio-a">Studio A</option>
                    <option value="studio-b">Studio B</option>
                    <option value="yoga-studio">Yoga Studio</option>
                    <option value="consultation-room">Consultation Room</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    name="notes"
                    value={newBooking.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Any specific requirements or goals..."
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
                    Book Session
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

export default MemberBookings;
