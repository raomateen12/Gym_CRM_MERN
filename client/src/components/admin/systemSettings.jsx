import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FiSettings, 
  FiSave, 
  FiRefreshCw,
  FiDatabase,
  FiMail,
  FiDollarSign,
  FiClock,
  FiShield,
  FiBell,
  FiGlobe,
  FiUser,
  FiKey,
  FiCheck,
  FiX,
  FiInfo,
  FiAlertTriangle
} from 'react-icons/fi';

const SystemSettings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({});
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const mockSettings = {
    general: {
      gymName: 'FitZone Gym',
      gymAddress: '123 Main Street, Karachi, Pakistan',
      phone: '+92 21 1234567',
      email: 'info@fitzone.com',
      website: 'www.fitzone.com',
      timezone: 'Asia/Karachi',
      currency: 'PKR',
      language: 'en'
    },
    membership: {
      basicPrice: 2000,
      premiumPrice: 3500,
      elitePrice: 5000,
      registrationFee: 500,
      lateFee: 200,
      freezeAllowed: true,
      maxFreezeMonths: 2,
      trialPeriod: 7,
      membershipValidityMonths: 12
    },
    notifications: {
      emailEnabled: true,
      smsEnabled: true,
      pushEnabled: true,
      membershipExpiry: true,
      paymentReminders: true,
      trainerUpdates: true,
      systemMaintenance: true
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 60,
      passwordMinLength: 8,
      passwordRequireSpecial: true,
      loginAttempts: 3,
      lockoutDuration: 15
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      backupTime: '02:00',
      retentionDays: 30,
      lastBackup: '2024-07-13 02:00:00'
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSettings(mockSettings);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    // Save settings API call would go here
    console.log('Saving settings:', settings);
    setUnsavedChanges(false);
  };

  const tabs = [
    { id: 'general', name: 'General', icon: FiSettings },
    { id: 'membership', name: 'Membership', icon: FiDollarSign },
    { id: 'notifications', name: 'Notifications', icon: FiBell },
    { id: 'security', name: 'Security', icon: FiShield },
    { id: 'backup', name: 'Backup', icon: FiDatabase }
  ];

  const GeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gym Name</label>
          <input
            type="text"
            value={settings.general?.gymName || ''}
            onChange={(e) => handleSettingChange('general', 'gymName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="text"
            value={settings.general?.phone || ''}
            onChange={(e) => handleSettingChange('general', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={settings.general?.email || ''}
            onChange={(e) => handleSettingChange('general', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="url"
            value={settings.general?.website || ''}
            onChange={(e) => handleSettingChange('general', 'website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.general?.timezone || ''}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Asia/Karachi">Asia/Karachi</option>
            <option value="Asia/Dubai">Asia/Dubai</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select
            value={settings.general?.currency || ''}
            onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="PKR">PKR - Pakistani Rupee</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <textarea
          value={settings.general?.gymAddress || ''}
          onChange={(e) => handleSettingChange('general', 'gymAddress', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const MembershipSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Basic Membership (₹/month)</label>
          <input
            type="number"
            value={settings.membership?.basicPrice || ''}
            onChange={(e) => handleSettingChange('membership', 'basicPrice', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Premium Membership (₹/month)</label>
          <input
            type="number"
            value={settings.membership?.premiumPrice || ''}
            onChange={(e) => handleSettingChange('membership', 'premiumPrice', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Elite Membership (₹/month)</label>
          <input
            type="number"
            value={settings.membership?.elitePrice || ''}
            onChange={(e) => handleSettingChange('membership', 'elitePrice', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Registration Fee (₹)</label>
          <input
            type="number"
            value={settings.membership?.registrationFee || ''}
            onChange={(e) => handleSettingChange('membership', 'registrationFee', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Late Fee (₹)</label>
          <input
            type="number"
            value={settings.membership?.lateFee || ''}
            onChange={(e) => handleSettingChange('membership', 'lateFee', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Trial Period (days)</label>
          <input
            type="number"
            value={settings.membership?.trialPeriod || ''}
            onChange={(e) => handleSettingChange('membership', 'trialPeriod', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.membership?.freezeAllowed || false}
            onChange={(e) => handleSettingChange('membership', 'freezeAllowed', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">Allow membership freeze</label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Freeze Months</label>
          <input
            type="number"
            value={settings.membership?.maxFreezeMonths || ''}
            onChange={(e) => handleSettingChange('membership', 'maxFreezeMonths', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Notification Channels</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications?.emailEnabled || false}
                onChange={(e) => handleSettingChange('notifications', 'emailEnabled', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">Email notifications</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications?.smsEnabled || false}
                onChange={(e) => handleSettingChange('notifications', 'smsEnabled', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">SMS notifications</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications?.pushEnabled || false}
                onChange={(e) => handleSettingChange('notifications', 'pushEnabled', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">Push notifications</label>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Notification Types</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications?.membershipExpiry || false}
                onChange={(e) => handleSettingChange('notifications', 'membershipExpiry', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">Membership expiry alerts</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications?.paymentReminders || false}
                onChange={(e) => handleSettingChange('notifications', 'paymentReminders', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">Payment reminders</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications?.trainerUpdates || false}
                onChange={(e) => handleSettingChange('notifications', 'trainerUpdates', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">Trainer updates</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications?.systemMaintenance || false}
                onChange={(e) => handleSettingChange('notifications', 'systemMaintenance', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">System maintenance</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={settings.security?.sessionTimeout || ''}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password Min Length</label>
          <input
            type="number"
            value={settings.security?.passwordMinLength || ''}
            onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
          <input
            type="number"
            value={settings.security?.loginAttempts || ''}
            onChange={(e) => handleSettingChange('security', 'loginAttempts', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lockout Duration (minutes)</label>
          <input
            type="number"
            value={settings.security?.lockoutDuration || ''}
            onChange={(e) => handleSettingChange('security', 'lockoutDuration', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.security?.twoFactorAuth || false}
            onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">Enable two-factor authentication</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.security?.passwordRequireSpecial || false}
            onChange={(e) => handleSettingChange('security', 'passwordRequireSpecial', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">Require special characters in passwords</label>
        </div>
      </div>
    </div>
  );

  const BackupSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.backup?.autoBackup || false}
            onChange={(e) => handleSettingChange('backup', 'autoBackup', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">Enable automatic backups</label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
          <select
            value={settings.backup?.backupFrequency || ''}
            onChange={(e) => handleSettingChange('backup', 'backupFrequency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Backup Time</label>
          <input
            type="time"
            value={settings.backup?.backupTime || ''}
            onChange={(e) => handleSettingChange('backup', 'backupTime', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Retention Period (days)</label>
          <input
            type="number"
            value={settings.backup?.retentionDays || ''}
            onChange={(e) => handleSettingChange('backup', 'retentionDays', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Last Backup</h4>
            <p className="text-sm text-gray-500">{settings.backup?.lastBackup || 'Never'}</p>
          </div>
          <button className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <FiRefreshCw className="w-4 h-4 mr-2" />
            Backup Now
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'membership':
        return <MembershipSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'backup':
        return <BackupSettings />;
      default:
        return <GeneralSettings />;
    }
  };

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
                <FiSettings className="w-8 h-8 mr-3 text-gray-600" />
                System Settings
              </h1>
              <p className="text-gray-600 mt-2">
                Configure system-wide settings and preferences
              </p>
            </div>
            {unsavedChanges && (
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiSave className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Unsaved Changes Alert */}
        {unsavedChanges && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <FiAlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-yellow-800">You have unsaved changes</span>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
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
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
