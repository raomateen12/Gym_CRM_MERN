import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiEye, FiEyeOff, FiActivity, FiLock, FiMail, FiShield, FiZap, FiStar, FiTrendingUp, FiUser, FiUsers, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Login = () => {
  const location = useLocation();
  const selectedRole = location.state?.role || '';
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData);
      if (result.success) {
        toast.success(`Welcome back, ${result.user.name}!`);
        // Role-based redirection
        navigate(result.redirectPath || '/dashboard');
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <FiShield className="w-8 h-8 text-white" />;
      case 'trainer':
        return <FiUsers className="w-8 h-8 text-white" />;
      case 'member':
        return <FiUser className="w-8 h-8 text-white" />;
      default:
        return <FiActivity className="w-8 h-8 text-white" />;
    }
  };

  const getRoleTitle = (role) => {
    switch (role) {
      case 'admin':
        return 'Admin Login';
      case 'trainer':
        return 'Trainer Login';
      case 'member':
        return 'Member Login';
      default:
        return 'Login';
    }
  };

  return (
    <div className="min-h-screen max-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Sign_In_or_sign_out_page_background_pic.png')"
        }}
      />
      
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative flex h-screen">
        {/* Back to Home Button */}
        <Link
          to="/"
          className="absolute top-6 left-6 z-20 flex items-center space-x-2 px-4 py-2 bg-black/30 hover:bg-black/50 text-white rounded-lg backdrop-blur-sm transition-all duration-200 border border-white/20 hover:border-white/40"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gradient-to-br from-black/80 via-black/70 to-black/60">
          <div className="max-w-md w-full space-y-6">
            {/* Header Section - Simplified */}
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-white">
                  Gym<span className="text-red-500">MERN</span>
                </h1>
                <h2 className="text-xl font-bold text-white">{getRoleTitle(selectedRole)}</h2>
                <p className="text-gray-300 font-light text-sm">Professional Gym Management System</p>
              </div>
            </div>

            {/* Login Form Card */}
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6">
                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-gray-400 group-focus-within:text-red-400 transition-colors duration-200" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 hover:bg-white/20 focus:bg-white/20"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-red-400 transition-colors duration-200" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 hover:bg-white/20 focus:bg-white/20"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white focus:outline-none focus:text-white transition-colors duration-200"
                      >
                        {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="flex items-center justify-end">
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors duration-200 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 active:scale-95"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-6">
                      {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <FiShield className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-200" />
                      )}
                    </span>
                    {loading ? 'Signing in...' : 'Sign In Securely'}
                  </button>

                  {/* Admin Contact */}
                  <div className="text-center">
                    <span className="text-gray-300 text-sm">
                      Need access? Contact your administrator for credentials.
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Image Area (hidden on mobile) */}
        <div className="hidden lg:block lg:w-1/2 h-full">
          {/* This area shows the background image */}
        </div>
      </div>
    </div>
  );
};

export default Login;
