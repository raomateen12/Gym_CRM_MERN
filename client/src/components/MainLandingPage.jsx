import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiUser, FiUsers, FiShield } from 'react-icons/fi';

const MainLandingPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/GYM_front_page.png')",
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-red-900/30" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">G</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">GYM MERN</h1>
                <p className="text-red-300 text-sm">Fitness Management System</p>
              </div>
            </div>
            
            {/* Login Button */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg shadow-lg border-2 border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
                <FiLogIn className="w-5 h-5" />
                <span>Login</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-100">
                    Select your role to login
                  </div>
                  
                  <Link
                    to="/login"
                    state={{ role: 'admin' }}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <FiShield className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Admin</p>
                      <p className="text-xs text-gray-500">System Administrator</p>
                    </div>
                  </Link>
                  
                  <Link
                    to="/login"
                    state={{ role: 'trainer' }}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <FiUsers className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Trainer</p>
                      <p className="text-xs text-gray-500">Fitness Trainer</p>
                    </div>
                  </Link>
                  
                  <Link
                    to="/login"
                    state={{ role: 'member' }}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <FiUser className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Member</p>
                      <p className="text-xs text-gray-500">Gym Member</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              TRANSFORM YOUR
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                FITNESS JOURNEY
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Professional gym management system for trainers, members, and administrators. 
              Track progress, manage workouts, and achieve your fitness goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg shadow-lg border-2 border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 text-lg"
              >
                Get Started
              </Link>
              
              <button className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border-2 border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300 text-lg">
                Learn More
              </button>
            </div>
          </div>
        </main>
        
        {/* Features Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FiShield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Admin Portal</h3>
                <p className="text-gray-300">Complete gym management with user control, analytics, and system settings.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FiUsers className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Trainer Portal</h3>
                <p className="text-gray-300">Manage members, create workouts, track progress, and schedule sessions.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FiUser className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Member Portal</h3>
                <p className="text-gray-300">Track workouts, monitor progress, book sessions, and achieve goals.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center text-gray-400">
            <p>&copy; 2024 GYM MERN. All rights reserved. | Professional Fitness Management System</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLandingPage;
