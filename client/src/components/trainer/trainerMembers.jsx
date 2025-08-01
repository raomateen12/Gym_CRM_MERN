import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTrainerSchedule } from '../../contexts/TrainerScheduleContext';
import { 
  FiUsers, 
  FiSearch, 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiEye, 
  FiClock,
  FiActivity,
  FiTrendingUp,
  FiStar,
  FiFilter,
  FiDownload,
  FiTarget,
  FiCalendar,
  FiX,
  FiMail,
  FiPhone,
  FiBarChart,
  FiCheckCircle,
  FiMessageCircle,
  FiPlayCircle
} from 'react-icons/fi';

const TrainerMembers = () => {
  const { user } = useAuth();
  const { addScheduledSession } = useTrainerSchedule();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showViewModal, setShowViewModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [scheduleForm, setScheduleForm] = useState({
    date: '',
    time: '',
    duration: '60',
    sessionType: 'personal',
    location: 'gym-floor',
    notes: ''
  });
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    goals: '',
    healthConditions: '',
    emergencyContact: '',
    membershipType: 'Basic'
  });

  // Mock data
  const mockMembers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+92 300 1234567',
      joinDate: '2024-01-15',
      membershipType: 'Premium',
      status: 'active',
      completedSessions: 24,
      totalSessions: 30,
      goals: 'Weight Loss',
      progress: 85,
      lastActivity: '2 hours ago',
      nextSession: '2024-07-15 10:00',
      workoutPlan: 'Full Body Strength',
      achievements: ['30 Days Streak', 'Weight Loss Goal'],
      stats: {
        totalWorkouts: 45,
        totalHours: 68,
        caloriesBurned: 12500,
        avgRating: 4.8
      },
      progressData: [
        { date: '2024-01-01', weight: 85, bodyFat: 25 },
        { date: '2024-02-01', weight: 82, bodyFat: 23 },
        { date: '2024-03-01', weight: 80, bodyFat: 21 },
        { date: '2024-04-01', weight: 78, bodyFat: 19 },
        { date: '2024-05-01', weight: 76, bodyFat: 17 },
        { date: '2024-06-01', weight: 74, bodyFat: 15 },
        { date: '2024-07-01', weight: 72, bodyFat: 13 }
      ]
    },
    {
      id: 2,
      name: 'Sarah Khan',
      email: 'sarah.khan@example.com',
      phone: '+92 301 2345678',
      joinDate: '2024-02-20',
      membershipType: 'Basic',
      status: 'active',
      completedSessions: 18,
      totalSessions: 24,
      goals: 'Muscle Building',
      progress: 72,
      lastActivity: '1 day ago',
      nextSession: '2024-07-16 14:00',
      workoutPlan: 'Strength Training',
      achievements: ['First Month Complete', 'Strength Goal'],
      stats: {
        totalWorkouts: 32,
        totalHours: 48,
        caloriesBurned: 8500,
        avgRating: 4.6
      },
      progressData: [
        { date: '2024-02-01', weight: 58, bodyFat: 20 },
        { date: '2024-03-01', weight: 59, bodyFat: 19 },
        { date: '2024-04-01', weight: 60, bodyFat: 18 },
        { date: '2024-05-01', weight: 61, bodyFat: 17 },
        { date: '2024-06-01', weight: 62, bodyFat: 16 },
        { date: '2024-07-01', weight: 63, bodyFat: 15 }
      ]
    },
    {
      id: 3,
      name: 'Ahmad Ali',
      email: 'ahmad.ali@example.com',
      phone: '+92 302 3456789',
      joinDate: '2024-03-10',
      membershipType: 'Premium',
      status: 'active',
      completedSessions: 12,
      totalSessions: 20,
      goals: 'Flexibility',
      progress: 58,
      lastActivity: '3 days ago',
      nextSession: '2024-07-17 16:00',
      workoutPlan: 'Yoga & Flexibility',
      achievements: ['Flexibility Master'],
      stats: {
        totalWorkouts: 25,
        totalHours: 35,
        caloriesBurned: 5800,
        avgRating: 4.9
      },
      progressData: [
        { date: '2024-03-01', weight: 75, bodyFat: 18 },
        { date: '2024-04-01', weight: 74, bodyFat: 17 },
        { date: '2024-05-01', weight: 73, bodyFat: 16 },
        { date: '2024-06-01', weight: 72, bodyFat: 15 },
        { date: '2024-07-01', weight: 71, bodyFat: 14 }
      ]
    },
    {
      id: 4,
      name: 'Fatima Sheikh',
      email: 'fatima.sheikh@example.com',
      phone: '+92 303 4567890',
      joinDate: '2024-04-05',
      membershipType: 'Basic',
      status: 'inactive',
      completedSessions: 8,
      totalSessions: 12,
      goals: 'General Fitness',
      progress: 45,
      lastActivity: '1 week ago',
      nextSession: null,
      workoutPlan: 'General Fitness',
      achievements: ['First Week Complete'],
      stats: {
        totalWorkouts: 15,
        totalHours: 22,
        caloriesBurned: 3200,
        avgRating: 4.5
      },
      progressData: [
        { date: '2024-04-01', weight: 65, bodyFat: 22 },
        { date: '2024-05-01', weight: 64, bodyFat: 21 },
        { date: '2024-06-01', weight: 63, bodyFat: 20 },
        { date: '2024-07-01', weight: 62, bodyFat: 19 }
      ]
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setMembers(mockMembers);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewMember = (member) => {
    setCurrentMember(member);
    setShowViewModal(true);
  };

  const handleViewProgress = (member) => {
    setCurrentMember(member);
    setShowProgressModal(true);
  };

  const handleScheduleSession = (member) => {
    setCurrentMember(member);
    setScheduleForm({
      date: '',
      time: '',
      duration: '60',
      sessionType: 'personal',
      location: 'gym-floor',
      notes: ''
    });
    setShowScheduleModal(true);
  };

  const handleScheduleFormChange = (e) => {
    const { name, value } = e.target;
    setScheduleForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    
    const sessionData = {
      title: `${scheduleForm.sessionType} - ${currentMember.name}`,
      member: currentMember.name,
      memberEmail: currentMember.email,
      memberPhone: currentMember.phone,
      date: scheduleForm.date,
      startTime: scheduleForm.time,
      endTime: calculateEndTime(scheduleForm.time, scheduleForm.duration),
      duration: parseInt(scheduleForm.duration),
      type: scheduleForm.sessionType,
      location: scheduleForm.location,
      notes: scheduleForm.notes,
      membershipType: currentMember.membershipType,
      sessionStatus: 'scheduled'
    };

    addScheduledSession(sessionData);
    setShowScheduleModal(false);
    alert('Session scheduled successfully! Check your schedule to see the new session.');
  };

  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(startDate.getTime() + duration * 60000);
    return endDate.toTimeString().slice(0, 5);
  };

  const handleAddMember = () => {
    setShowAddModal(true);
  };

  const handleSaveNewMember = () => {
    const newMemberData = {
      id: members.length + 1,
      ...newMember,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      completedSessions: 0,
      totalSessions: 0,
      progress: 0,
      currentWeight: 0,
      targetWeight: 0,
      achievements: [],
      workoutPlan: 'Beginner Program',
      nextSession: null,
      lastActivity: new Date().toISOString().split('T')[0],
      stats: {
        totalWorkouts: 0,
        totalHours: 0,
        caloriesBurned: 0,
        avgRating: 0
      },
      progressData: []
    };
    
    setMembers(prev => [...prev, newMemberData]);
    setShowAddModal(false);
    setNewMember({
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      goals: '',
      healthConditions: '',
      emergencyContact: '',
      membershipType: 'Basic'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMembershipColor = (type) => {
    switch(type) {
      case 'Premium': return 'bg-red-100 text-red-800';
      case 'Basic': return 'bg-gray-100 text-gray-800';
      case 'VIP': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const MemberCard = ({ member }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                {member.status}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMembershipColor(member.membershipType)}`}>
                {member.membershipType}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => handleViewMember(member)}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            title="View Profile"
          >
            <FiEye className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleViewProgress(member)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
            title="View Progress"
          >
            <FiBarChart className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleScheduleSession(member)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            title="Schedule Session"
          >
            <FiCalendar className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-red-50 rounded-lg p-3 border border-red-200">
          <div className="text-lg font-semibold text-red-600">{member.completedSessions}</div>
          <div className="text-sm text-gray-600">Sessions Done</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="text-lg font-semibold text-gray-600">{member.progress}%</div>
          <div className="text-sm text-gray-600">Progress</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Goal:</span>
          <span className="font-medium text-gray-900">{member.goals || 'Weight Loss'}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Last seen:</span>
          <span className="font-medium text-gray-900">{member.lastActivity}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Next session:</span>
          <span className="font-medium text-gray-900">
            {member.nextSession ? new Date(member.nextSession).toLocaleDateString() : 'Not scheduled'}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FiStar className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">{member.stats.avgRating}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
              Message
            </button>
            {member.status === 'active' && (
              <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                Start Session
              </button>
            )}
          </div>
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
                <FiUsers className="w-8 h-8 mr-3 text-red-600" />
                My Members
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and track your members' progress and sessions
              </p>
            </div>
            <button 
              onClick={handleAddMember}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add Member
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{members.length}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FiUsers className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Members</p>
                <p className="text-2xl font-bold text-gray-900">
                  {members.filter(m => m.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {members.length > 0 ? Math.round(members.reduce((sum, m) => sum + m.progress, 0) / members.length) : 0}%
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FiTarget className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {members.reduce((sum, m) => sum + m.sessionsCompleted, 0)}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <FiActivity className="w-6 h-6 text-yellow-600" />
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
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="paused">Paused</option>
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

        {/* Members Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <FiUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
            <p className="text-gray-600">Try adjusting your search or filters, or add a new member.</p>
          </div>
        )}
      </div>

      {/* View Member Modal */}
      {showViewModal && currentMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Member Profile</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Member Header */}
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {currentMember.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{currentMember.name}</h3>
                    <p className="text-gray-600 flex items-center mt-1">
                      <FiMail className="w-4 h-4 mr-1" />
                      {currentMember.email}
                    </p>
                    <p className="text-gray-600 flex items-center mt-1">
                      <FiPhone className="w-4 h-4 mr-1" />
                      {currentMember.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">Total Workouts</p>
                      <p className="text-2xl font-bold text-red-900">{currentMember.stats.totalWorkouts}</p>
                    </div>
                    <FiActivity className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Total Hours</p>
                      <p className="text-2xl font-bold text-green-900">{currentMember.stats.totalHours}</p>
                    </div>
                    <FiClock className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">Calories Burned</p>
                      <p className="text-2xl font-bold text-red-900">{currentMember.stats.caloriesBurned.toLocaleString()}</p>
                    </div>
                    <FiTarget className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-600">Avg Rating</p>
                      <p className="text-2xl font-bold text-yellow-900">{currentMember.stats.avgRating}</p>
                    </div>
                    <FiStar className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
              </div>

              {/* Member Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Member Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Join Date:</span>
                      <span className="font-medium">{currentMember.joinDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Membership:</span>
                      <span className="font-medium">{currentMember.membershipType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Goal:</span>
                      <span className="font-medium">{currentMember.currentGoal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Workout Plan:</span>
                      <span className="font-medium">{currentMember.workoutPlan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Progress:</span>
                      <span className="font-medium">{currentMember.progress}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h4>
                  <div className="space-y-2">
                    {currentMember.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center p-3 bg-white rounded-lg">
                        <FiAward className="w-5 h-5 text-yellow-600 mr-3" />
                        <span className="font-medium text-gray-900">{achievement}</span>
                      </div>
                    ))}
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
              </button>                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleViewProgress(currentMember);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  View Progress
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Member</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSaveNewMember(); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={newMember.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={newMember.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={newMember.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={newMember.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    min="16"
                    max="80"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={newMember.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Membership Type</label>
                  <select
                    name="membershipType"
                    value={newMember.membershipType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fitness Goals</label>
                <textarea
                  name="goals"
                  value={newMember.goals}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., Weight loss, muscle gain, general fitness..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Health Conditions</label>
                <textarea
                  name="healthConditions"
                  value={newMember.healthConditions}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Any health conditions, injuries, or medical concerns..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={newMember.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Name and phone number"
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
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Session Modal */}
      {showScheduleModal && currentMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Schedule Session</h2>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {currentMember.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{currentMember.name}</h3>
                  <p className="text-sm text-gray-600">{currentMember.email}</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleScheduleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Date</label>
                  <input
                    type="date"
                    name="date"
                    value={scheduleForm.date}
                    onChange={handleScheduleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={scheduleForm.time}
                    onChange={handleScheduleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <select 
                    name="duration"
                    value={scheduleForm.duration}
                    onChange={handleScheduleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Type</label>
                  <select 
                    name="sessionType"
                    value={scheduleForm.sessionType}
                    onChange={handleScheduleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="personal">Personal Training</option>
                    <option value="strength">Strength Training</option>
                    <option value="cardio">Cardio Session</option>
                    <option value="flexibility">Flexibility & Mobility</option>
                    <option value="assessment">Fitness Assessment</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select 
                  name="location"
                  value={scheduleForm.location}
                  onChange={handleScheduleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="gym-floor">Gym Floor</option>
                  <option value="private-room">Private Room</option>
                  <option value="cardio-area">Cardio Area</option>
                  <option value="yoga-studio">Yoga Studio</option>
                  <option value="outdoor">Outdoor</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Notes</label>
                <textarea
                  name="notes"
                  value={scheduleForm.notes}
                  onChange={handleScheduleFormChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Any specific focus areas or notes for this session..."
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Schedule Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerMembers;
