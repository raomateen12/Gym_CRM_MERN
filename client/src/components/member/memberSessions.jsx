import React, { useState, useEffect } from 'react';
import { 
  FiActivity, 
  FiPlay, 
  FiPause, 
  FiSquare, 
  FiClock, 
  FiTrendingUp,
  FiUser,
  FiStar,
  FiCalendar,
  FiZap,
  FiTarget,
  FiAward,
  FiBarChart,
  FiHeart,
  FiRepeat
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const MemberSessions = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  const [currentSession, setCurrentSession] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Sample sessions data
  const sampleSessions = [
    {
      id: 1,
      type: 'active',
      workoutName: 'Full Body Strength',
      trainer: 'Sarah Khan',
      startTime: '2024-07-14T10:00:00',
      duration: 3600, // 60 minutes in seconds
      currentExercise: 'Squats',
      exerciseProgress: 2,
      totalExercises: 8,
      caloriesBurned: 180,
      heartRate: 142,
      status: 'in-progress',
      exercises: [
        { name: 'Squats', sets: 3, reps: 12, completed: 2, weight: '60kg' },
        { name: 'Push-ups', sets: 3, reps: 10, completed: 0, weight: 'bodyweight' },
        { name: 'Deadlifts', sets: 3, reps: 8, completed: 0, weight: '80kg' }
      ]
    },
    {
      id: 2,
      type: 'scheduled',
      workoutName: 'HIIT Cardio',
      trainer: 'Ahmad Hassan',
      scheduledTime: '2024-07-14T18:00:00',
      duration: 2700, // 45 minutes
      location: 'Studio A',
      status: 'scheduled',
      notes: 'High-intensity interval training session'
    },
    {
      id: 3,
      type: 'completed',
      workoutName: 'Yoga Flow',
      trainer: 'Fatima Sheikh',
      completedTime: '2024-07-13T09:00:00',
      duration: 4500, // 75 minutes
      caloriesBurned: 150,
      avgHeartRate: 98,
      maxHeartRate: 125,
      rating: 5,
      feedback: 'Very relaxing session, felt great afterwards',
      status: 'completed'
    },
    {
      id: 4,
      type: 'completed',
      workoutName: 'Strength Training',
      trainer: 'Sarah Khan',
      completedTime: '2024-07-12T14:30:00',
      duration: 3600, // 60 minutes
      caloriesBurned: 420,
      avgHeartRate: 145,
      maxHeartRate: 165,
      rating: 4,
      feedback: 'Great workout, challenging but achievable',
      status: 'completed'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setSessions(sampleSessions);
      setLoading(false);
    }, 1000);
  }, []);

  // Timer functionality
  useEffect(() => {
    let interval;
    if (isTimerRunning && currentSession) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    } else if (!isTimerRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, currentSession]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const startSession = (session) => {
    setCurrentSession(session);
    setTimer(0);
    setIsTimerRunning(true);
    setSessions(sessions.map(s => 
      s.id === session.id 
        ? { ...s, status: 'in-progress', startTime: new Date().toISOString() }
        : s
    ));
  };

  const pauseSession = () => {
    setIsTimerRunning(false);
  };

  const resumeSession = () => {
    setIsTimerRunning(true);
  };

  const completeSession = () => {
    if (currentSession) {
      setSessions(sessions.map(s => 
        s.id === currentSession.id 
          ? { 
              ...s, 
              status: 'completed',
              completedTime: new Date().toISOString(),
              duration: timer,
              caloriesBurned: Math.floor(timer / 60 * 6) // Rough calculation
            }
          : s
      ));
      setCurrentSession(null);
      setTimer(0);
      setIsTimerRunning(false);
    }
  };

  const ActiveSessionCard = ({ session }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{session.workoutName}</h3>
        <div className="flex items-center space-x-2">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            In Progress
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <FiUser className="w-4 h-4 mr-2" />
          <span className="text-sm">{session.trainer}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FiClock className="w-4 h-4 mr-2" />
          <span className="text-sm">{formatTime(timer)}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FiZap className="w-4 h-4 mr-2" />
          <span className="text-sm">{session.caloriesBurned} cal</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FiHeart className="w-4 h-4 mr-2" />
          <span className="text-sm">{session.heartRate} bpm</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Current Exercise</span>
          <span className="text-sm font-medium text-red-600">{session.currentExercise}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-red-600 to-red-700 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(session.exerciseProgress / session.totalExercises) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{session.exerciseProgress}/{session.totalExercises} exercises</p>
      </div>

      <div className="flex items-center space-x-2">
        {isTimerRunning ? (
          <button
            onClick={pauseSession}
            className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <FiPause className="w-4 h-4 mr-2" />
            Pause
          </button>
        ) : (
          <button
            onClick={resumeSession}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FiPlay className="w-4 h-4 mr-2" />
            Resume
          </button>
        )}
        <button
          onClick={completeSession}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <FiSquare className="w-4 h-4 mr-2" />
          Complete
        </button>
      </div>
    </div>
  );

  const ScheduledSessionCard = ({ session }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{session.workoutName}</h3>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
          Scheduled
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <FiUser className="w-4 h-4 mr-2" />
          <span className="text-sm">{session.trainer}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FiCalendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{formatDate(session.scheduledTime)}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FiClock className="w-4 h-4 mr-2" />
          <span className="text-sm">{session.duration / 60} mins</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FiTarget className="w-4 h-4 mr-2" />
          <span className="text-sm">{session.location}</span>
        </div>
      </div>

      {session.notes && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">{session.notes}</p>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <button
          onClick={() => startSession(session)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <FiPlay className="w-4 h-4 mr-2" />
          Start Session
        </button>
        <button className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <FiCalendar className="w-4 h-4 mr-2" />
          Reschedule
        </button>
      </div>
    </div>
  );

  const CompletedSessionCard = ({ session }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{session.workoutName}</h3>
        <div className="flex items-center space-x-2">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            Completed
          </span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className={`w-4 h-4 ${i < session.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <FiUser className="w-4 h-4 mr-2" />
          <span className="text-sm">{session.trainer}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FiCalendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{formatDate(session.completedTime)}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FiClock className="w-4 h-4 mr-2" />
          <span className="text-sm">{session.duration / 60} mins</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FiZap className="w-4 h-4 mr-2" />
          <span className="text-sm">{session.caloriesBurned} cal</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-600">Avg Heart Rate</p>
          <p className="text-lg font-semibold text-gray-900">{session.avgHeartRate} bpm</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-600">Max Heart Rate</p>
          <p className="text-lg font-semibold text-gray-900">{session.maxHeartRate} bpm</p>
        </div>
      </div>

      {session.feedback && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm font-medium text-green-800 mb-1">Your Feedback:</p>
          <p className="text-sm text-green-700">{session.feedback}</p>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <button className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg">
          <FiRepeat className="w-4 h-4 mr-2" />
          Repeat Workout
        </button>
        <button className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <FiBarChart className="w-4 h-4 mr-2" />
          View Details
        </button>
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

  const activeSessions = sessions.filter(s => s.status === 'in-progress');
  const scheduledSessions = sessions.filter(s => s.status === 'scheduled');
  const completedSessions = sessions.filter(s => s.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FiActivity className="w-8 h-8 mr-3 text-red-600" />
            My Sessions
          </h1>
          <p className="text-gray-600 mt-2">Track your training sessions and progress</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{activeSessions.length}</p>
              </div>
              <div className="p-3 bg-green-600 rounded-full">
                <FiPlay className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">{scheduledSessions.length}</p>
              </div>
              <div className="p-3 bg-blue-600 rounded-full">
                <FiCalendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedSessions.length}</p>
              </div>
              <div className="p-3 bg-red-600 rounded-full">
                <FiAward className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Time</p>
                <p className="text-2xl font-bold text-gray-900">{Math.floor(completedSessions.reduce((sum, s) => sum + s.duration, 0) / 3600)}h</p>
              </div>
              <div className="p-3 bg-purple-600 rounded-full">
                <FiTrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Current Session Display */}
        {currentSession && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Session</h2>
            <ActiveSessionCard session={currentSession} />
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'active', label: 'Active', icon: FiPlay, count: activeSessions.length },
                { key: 'scheduled', label: 'Scheduled', icon: FiCalendar, count: scheduledSessions.length },
                { key: 'completed', label: 'Completed', icon: FiAward, count: completedSessions.length }
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
                  {tab.count > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'active' && (
            activeSessions.length > 0 ? (
              activeSessions.map((session) => (
                <ActiveSessionCard key={session.id} session={session} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FiPlay className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No active sessions</p>
              </div>
            )
          )}
          
          {activeTab === 'scheduled' && (
            scheduledSessions.length > 0 ? (
              scheduledSessions.map((session) => (
                <ScheduledSessionCard key={session.id} session={session} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FiCalendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No scheduled sessions</p>
              </div>
            )
          )}
          
          {activeTab === 'completed' && (
            completedSessions.length > 0 ? (
              completedSessions.map((session) => (
                <CompletedSessionCard key={session.id} session={session} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FiAward className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No completed sessions</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberSessions;
