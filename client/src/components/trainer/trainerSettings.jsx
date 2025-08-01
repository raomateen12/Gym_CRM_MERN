import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FiSettings, 
  FiUser, 
  FiLock, 
  FiBell, 
  FiCalendar, 
  FiDollarSign,
  FiClock,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCamera,
  FiSave,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
  FiShield,
  FiEye,
  FiEyeOff,
  FiUpload,
  FiDownload,
  FiRefreshCw,
  FiToggleLeft,
  FiToggleRight,
  FiCreditCard,
  FiStar,
  FiAward,
  FiTarget,
  FiActivity
} from 'react-icons/fi';

const TrainerSettings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@gym.com',
    phone: '+92 300 1234567',
    bio: 'Certified fitness trainer with 8+ years of experience in strength training and nutrition.',
    specialization: 'Strength Training',
    experience: '8 years',
    certifications: ['NASM-CPT', 'ACSM-EP', 'Nutrition Specialist'],
    hourlyRate: 2500,
    location: 'Lahore, Pakistan',
    languages: ['English', 'Urdu', 'Punjabi'],
    profileImage: null
  });

  const [availabilityData, setAvailabilityData] = useState({
    monday: { available: true, start: '06:00', end: '22:00' },
    tuesday: { available: true, start: '06:00', end: '22:00' },
    wednesday: { available: true, start: '06:00', end: '22:00' },
    thursday: { available: true, start: '06:00', end: '22:00' },
    friday: { available: true, start: '06:00', end: '22:00' },
    saturday: { available: true, start: '08:00', end: '20:00' },
    sunday: { available: false, start: '08:00', end: '20:00' }
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    sessionReminders: true,
    newBookings: true,
    paymentAlerts: true,
    weeklyReports: true,
    memberMessages: true
  });

  const [paymentSettings, setPaymentSettings] = useState({
    bankAccount: '1234567890',
    bankName: 'HBL Bank',
    accountTitle: 'Ahmed Hassan',
    jazzCashNumber: '+92 300 1234567',
    easypaisaNumber: '+92 300 1234567',
    defaultPaymentMethod: 'bank'
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showContact: true,
    showRatings: true,
    showLocation: true,
    allowDirectBooking: true,
    requireApproval: false
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'availability', label: 'Availability', icon: FiCalendar },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'payments', label: 'Payments', icon: FiDollarSign },
    { id: 'privacy', label: 'Privacy', icon: FiShield },
    { id: 'security', label: 'Security', icon: FiLock }
  ];

  const specializations = [
    'Strength Training',
    'Cardio Fitness',
    'Weight Loss',
    'Muscle Building',
    'Flexibility',
    'Sports Training',
    'Rehabilitation',
    'Nutrition Coaching',
    'Group Fitness',
    'Personal Training'
  ];

  useEffect(() => {
    // Load user settings
    setLoading(false);
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to change password. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleAvailabilityUpdate = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Availability updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update availability. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationUpdate = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Notification settings updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update notification settings. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentUpdate = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Payment settings updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update payment settings. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePrivacyUpdate = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Privacy settings updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update privacy settings. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          {/* Profile Image */}
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {profileData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <button
                type="button"
                className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <FiCamera className="w-4 h-4 mr-2" />
                Change Photo
              </button>
              <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF (max 5MB)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
              <select
                value={profileData.specialization}
                onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              <input
                type="text"
                value={profileData.experience}
                onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 5 years"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (PKR)</label>
              <input
                type="number"
                value={profileData.hourlyRate}
                onChange={(e) => setProfileData({ ...profileData, hourlyRate: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
            <div className="flex flex-wrap gap-2">
              {profileData.certifications.map((cert, index) => (
                <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center">
                  {cert}
                  <button
                    type="button"
                    onClick={() => setProfileData({
                      ...profileData,
                      certifications: profileData.certifications.filter((_, i) => i !== index)
                    })}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                className="px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-gray-50 flex items-center"
              >
                <FiPlus className="w-4 h-4 mr-1" />
                Add Certification
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              <FiSave className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderAvailabilityTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Availability</h3>
        <div className="space-y-4">
          {Object.entries(availabilityData).map(([day, settings]) => (
            <div key={day} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-24">
                  <span className="font-medium text-gray-900 capitalize">{day}</span>
                </div>
                <button
                  onClick={() => setAvailabilityData({
                    ...availabilityData,
                    [day]: { ...settings, available: !settings.available }
                  })}
                  className={`flex items-center ${settings.available ? 'text-green-600' : 'text-gray-400'}`}
                >
                  {settings.available ? (
                    <FiToggleRight className="w-8 h-8" />
                  ) : (
                    <FiToggleLeft className="w-8 h-8" />
                  )}
                </button>
              </div>
              
              {settings.available && (
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    value={settings.start}
                    onChange={(e) => setAvailabilityData({
                      ...availabilityData,
                      [day]: { ...settings, start: e.target.value }
                    })}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="time"
                    value={settings.end}
                    onChange={(e) => setAvailabilityData({
                      ...availabilityData,
                      [day]: { ...settings, end: e.target.value }
                    })}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            onClick={handleAvailabilityUpdate}
            disabled={loading}
            className="flex items-center px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            <FiSave className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Availability'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-sm text-gray-600">
                  {key === 'emailNotifications' && 'Receive notifications via email'}
                  {key === 'smsNotifications' && 'Receive notifications via SMS'}
                  {key === 'pushNotifications' && 'Receive push notifications'}
                  {key === 'sessionReminders' && 'Get reminders before sessions'}
                  {key === 'newBookings' && 'Get notified of new bookings'}
                  {key === 'paymentAlerts' && 'Get notified of payment updates'}
                  {key === 'weeklyReports' && 'Receive weekly performance reports'}
                  {key === 'memberMessages' && 'Get notified of member messages'}
                </p>
              </div>
              <button
                onClick={() => setNotificationSettings({
                  ...notificationSettings,
                  [key]: !value
                })}
                className={`flex items-center ${value ? 'text-green-600' : 'text-gray-400'}`}
              >
                {value ? (
                  <FiToggleRight className="w-8 h-8" />
                ) : (
                  <FiToggleLeft className="w-8 h-8" />
                )}
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            onClick={handleNotificationUpdate}
            disabled={loading}
            className="flex items-center px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            <FiSave className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderPaymentsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account</label>
              <input
                type="text"
                value={paymentSettings.bankAccount}
                onChange={(e) => setPaymentSettings({ ...paymentSettings, bankAccount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Account Number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
              <input
                type="text"
                value={paymentSettings.bankName}
                onChange={(e) => setPaymentSettings({ ...paymentSettings, bankName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Bank Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Title</label>
              <input
                type="text"
                value={paymentSettings.accountTitle}
                onChange={(e) => setPaymentSettings({ ...paymentSettings, accountTitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Account Title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">JazzCash Number</label>
              <input
                type="text"
                value={paymentSettings.jazzCashNumber}
                onChange={(e) => setPaymentSettings({ ...paymentSettings, jazzCashNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+92 300 1234567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Easypaisa Number</label>
              <input
                type="text"
                value={paymentSettings.easypaisaNumber}
                onChange={(e) => setPaymentSettings({ ...paymentSettings, easypaisaNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+92 300 1234567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Payment Method</label>
              <select
                value={paymentSettings.defaultPaymentMethod}
                onChange={(e) => setPaymentSettings({ ...paymentSettings, defaultPaymentMethod: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="bank">Bank Account</option>
                <option value="jazzcash">JazzCash</option>
                <option value="easypaisa">Easypaisa</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            onClick={handlePaymentUpdate}
            disabled={loading}
            className="flex items-center px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            <FiSave className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Payment Info'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Profile Visibility</h4>
              <p className="text-sm text-gray-600">Control who can see your profile</p>
            </div>
            <select
              value={privacySettings.profileVisibility}
              onChange={(e) => setPrivacySettings({ ...privacySettings, profileVisibility: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="public">Public</option>
              <option value="members">Members Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          {Object.entries(privacySettings).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-sm text-gray-600">
                  {key === 'showContact' && 'Display contact information on profile'}
                  {key === 'showRatings' && 'Show ratings and reviews publicly'}
                  {key === 'showLocation' && 'Display location on profile'}
                  {key === 'allowDirectBooking' && 'Allow members to book directly'}
                  {key === 'requireApproval' && 'Require approval for new bookings'}
                </p>
              </div>
              <button
                onClick={() => setPrivacySettings({
                  ...privacySettings,
                  [key]: !value
                })}
                className={`flex items-center ${value ? 'text-green-600' : 'text-gray-400'}`}
              >
                {value ? (
                  <FiToggleRight className="w-8 h-8" />
                ) : (
                  <FiToggleLeft className="w-8 h-8" />
                )}
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            onClick={handlePrivacyUpdate}
            disabled={loading}
            className="flex items-center px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            <FiSave className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Privacy Settings'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              <FiLock className="w-4 h-4 mr-2" />
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FiSettings className="w-8 h-8 mr-3 text-red-600" />
            Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg border ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center">
              {message.type === 'success' ? (
                <FiCheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <FiAlertCircle className="w-5 h-5 mr-2" />
              )}
              {message.text}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'availability' && renderAvailabilityTab()}
            {activeTab === 'notifications' && renderNotificationsTab()}
            {activeTab === 'payments' && renderPaymentsTab()}
            {activeTab === 'privacy' && renderPrivacyTab()}
            {activeTab === 'security' && renderSecurityTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerSettings;
