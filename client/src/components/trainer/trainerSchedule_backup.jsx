import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTrainerSchedule } from '../../contexts/TrainerScheduleContext';
import { 
  FiCalendar, 
  FiClock, 
  FiUsers, 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiEye, 
  FiChevronLeft,
  FiChevronRight,
  FiActivity,
  FiMapPin,
  FiPhone,
  FiMail,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
  FiPlayCircle,
  FiPauseCircle,
  FiFilter,
  FiDownload
} from 'react-icons/fi';

const TrainerSchedule = () => {
  const { user } = useAuth();
  const { scheduledSessions, getScheduledSessions } = useTrainerSchedule();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'month'
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);

  // Mock data for trainer schedule
  const mockSessions = [
    {
      id: 1,
      title: 'Strength Training - John Doe',
      member: 'John Doe',
      memberEmail: 'john.doe@example.com',
      memberPhone: '+92 300 1234567',
      date: '2024-07-15',
      startTime: '09:00',
      endTime: '10:00',
      duration: 60,
      type: 'Strength Training',
      location: 'Gym Floor A',
      status: 'scheduled',
      notes: 'Focus on upper body exercises. Member has shoulder issue.',
      workoutPlan: 'Upper Body Strength',
      equipment: ['Barbell', 'Dumbbells', 'Bench'],
      isRecurring: true,
      recurringDays: ['Monday', 'Wednesday', 'Friday']
    },
    {
      id: 2,
      title: 'Cardio Workout - Sarah Khan',
      member: 'Sarah Khan',
      memberEmail: 'sarah.khan@example.com',
      memberPhone: '+92 301 2345678',
      date: '2024-07-15',
      startTime: '11:00',
      endTime: '11:45',
      duration: 45,
      type: 'Cardio',
      location: 'Cardio Area',
      status: 'scheduled',
      notes: 'HIIT session for weight loss goals.',
      workoutPlan: 'HIIT Fat Burner',
      equipment: ['Treadmill', 'Kettlebells'],
      isRecurring: false,
      recurringDays: []
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      const combinedSessions = [...mockSessions, ...scheduledSessions];
      setSessions(combinedSessions);
      setLoading(false);
    }, 1000);
  }, [scheduledSessions]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'scheduled': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'scheduled': return <FiClock className="w-4 h-4" />;
      case 'completed': return <FiCheckCircle className="w-4 h-4" />;
      case 'cancelled': return <FiX className="w-4 h-4" />;
      case 'in-progress': return <FiPlayCircle className="w-4 h-4" />;
      default: return <FiClock className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Strength Training': return 'bg-red-50 text-red-700';
      case 'Cardio': return 'bg-green-50 text-green-700';
      case 'Flexibility': return 'bg-yellow-50 text-yellow-700';
      case 'Personal Training': return 'bg-blue-50 text-blue-700';
      case 'Group Class': return 'bg-orange-50 text-orange-700';
      case 'Weight Training': return 'bg-indigo-50 text-indigo-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getCurrentWeekDates = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const getSessionsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return sessions.filter(session => session.date === dateStr);
  };

  const handleViewSession = (session) => {
    setCurrentSession(session);
    setShowViewModal(true);
  };

  const weekDates = getCurrentWeekDates();
  const todaysSessions = getSessionsForDate(new Date());

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
                My Schedule
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your training sessions and appointments
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                Schedule Session
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{todaysSessions.length}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FiCalendar className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sessions.filter(s => {
                    const sessionDate = new Date(s.date);
                    return weekDates.some(date => 
                      date.toDateString() === sessionDate.toDateString()
                    );
                  }).length}
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
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sessions.filter(s => s.status === 'completed').length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FiCheckCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sessions.filter(s => s.status === 'scheduled').length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <FiClock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setDate(newDate.getDate() - 7);
                  setCurrentDate(newDate);
                }}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                {currentDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </h2>
              <button 
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setDate(newDate.getDate() + 7);
                  setCurrentDate(newDate);
                }}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                <FiFilter className="w-4 h-4 mr-1" />
                Filter
              </button>
              <button className="flex items-center px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                <FiDownload className="w-4 h-4 mr-1" />
                Export
              </button>
            </div>
          </div>

          {/* Week View */}
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 bg-gray-50 rounded-t-lg">
                {day}
              </div>
            ))}
            {weekDates.map(date => {
              const dateSessions = getSessionsForDate(date);
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <div key={date.toISOString()} className={`p-2 min-h-[120px] border border-gray-200 ${
                  isToday ? 'bg-red-50 border-red-300' : 'bg-white'
                }`}>
                  <div className={`text-sm font-medium mb-2 ${
                    isToday ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dateSessions.map(session => (
                      <div 
                        key={session.id}
                        onClick={() => handleViewSession(session)}
                        className={`p-1 rounded text-xs cursor-pointer hover:opacity-75 ${getTypeColor(session.type)}`}
                      >
                        <div className="font-medium truncate">{session.startTime}</div>
                        <div className="truncate">{session.member}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Sessions */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Sessions</h3>
          {todaysSessions.length === 0 ? (
            <div className="text-center py-8">
              <FiCalendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No sessions scheduled for today</p>
            </div>
          ) : (
            <div className="space-y-4">
              {todaysSessions.map(session => (
                <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold">
                        {session.member === 'Group Session' ? 'GS' : session.member.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{session.title}</h4>
                        <p className="text-sm text-gray-600 flex items-center">
                          <FiClock className="w-4 h-4 mr-1" />
                          {session.startTime} - {session.endTime}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <FiMapPin className="w-4 h-4 mr-1" />
                          {session.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(session.status)}`}>
                        <span className="flex items-center">
                          {getStatusIcon(session.status)}
                          <span className="ml-1">{session.status}</span>
                        </span>
                      </span>
                      
                      <div className="flex items-center space-x-2">
                        {session.status === 'scheduled' && (
                          <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                            Start
                          </button>
                        )}
                        {session.status === 'in-progress' && (
                          <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                            Complete
                          </button>
                        )}
                        <button 
                          onClick={() => handleViewSession(session)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* View Session Modal */}
      {showViewModal && currentSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Session Details</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Session Header */}
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{currentSession.title}</h3>
                    <p className="text-gray-600 mt-1">{currentSession.type}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(currentSession.status)}`}>
                    <span className="flex items-center">
                      {getStatusIcon(currentSession.status)}
                      <span className="ml-1">{currentSession.status}</span>
                    </span>
                  </span>
                </div>
              </div>

              {/* Session Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                    <p className="text-sm text-gray-900">
                      {new Date(currentSession.date).toLocaleDateString()} • {currentSession.startTime} - {currentSession.endTime}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <p className="text-sm text-gray-900">{currentSession.duration} minutes</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <p className="text-sm text-gray-900">{currentSession.location}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {currentSession.member !== 'Group Session' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Member</label>
                        <p className="text-sm text-gray-900">{currentSession.member}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                        <p className="text-sm text-gray-900">{currentSession.memberEmail}</p>
                        <p className="text-sm text-gray-900">{currentSession.memberPhone}</p>
                      </div>
                    </>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Workout Plan</label>
                    <p className="text-sm text-gray-900">{currentSession.workoutPlan}</p>
                  </div>
                </div>
              </div>

              {/* Equipment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Needed</label>
                <div className="flex flex-wrap gap-2">
                  {currentSession.equipment?.map((item, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {currentSession.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{currentSession.notes}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 pt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              {currentSession.status === 'scheduled' && (
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Start Session
                </button>
              )}
              {currentSession.status === 'in-progress' && (
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Complete Session
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerSchedule;
