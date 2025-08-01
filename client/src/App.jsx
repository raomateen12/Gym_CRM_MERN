import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './contexts/AuthContext';
import { TrainerScheduleProvider } from './contexts/TrainerScheduleContext';
import ProtectedRoute from './components/protectedRoute';
import Layout from './components/layout_3.jsx';
import Loading from './components/loading_2.jsx';
import Unauthorized from './components/unauthorized_11.jsx';

// Main Landing Page
import MainLandingPage from './components/MainLandingPage.jsx';

// Auth Components
import Login from './components/auth/login_1.jsx';
// import Register from './components/auth/register';

// Dashboard Components
import Dashboard from './components/dashboard/dashboard_2.jsx';
import TrainerDashboard from './components/dashboard/trainerDashboard';
import MemberDashboard from './components/dashboard/memberDashboard';
import Profile from './components/profile/profile';

// Admin Components
import AdminDashboard from './components/admin/adminDashboard.jsx';
import UserManagement from './components/admin/userManagement.jsx';
import TrainerManagement from './components/admin/trainerManagement.jsx';
import Analytics from './components/admin/analytics.jsx';
import SystemSettings from './components/admin/systemSettings.jsx';
import WorkoutManagement from './components/admin/workoutManagement.jsx';

// Trainer Portal Components
import TrainerPortalDashboard from './components/trainer/trainerDashboard.jsx';
import TrainerMembers from './components/trainer/trainerMembers.jsx';
import TrainerWorkouts from './components/trainer/trainerWorkouts.jsx';
import TrainerSchedule from './components/trainer/trainerSchedule.jsx';
import TrainerProgressAnalytics from './components/trainer/trainerProgressAnalytics.jsx';
import TrainerSettings from './components/trainer/trainerSettings.jsx';

// Member Portal Components
import MemberProgress from './components/member/memberProgress.jsx';
import MemberWorkouts from './components/member/memberWorkouts.jsx';
import MemberBookings from './components/member/memberBookings.jsx';
import MemberSessions from './components/member/memberSessions.jsx';

// Lazy load components for better performance
const LazyComponent = ({ component: Component, ...props }) => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Component {...props} />
    </React.Suspense>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Main Landing Page */}
            <Route path="/" element={<MainLandingPage />} />
            
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected Dashboard Routes - Role-based */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Admin Dashboard - Main Dashboard */}
            <Route path="/admin-dashboard" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Trainer Dashboard */}
            <Route path="/trainer-dashboard" element={<Navigate to="/trainer/dashboard" replace />} />
            
            {/* Profile Route */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/users" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <UserManagement />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/trainers" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <TrainerManagement />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/analytics" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <Analytics />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/workouts" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <WorkoutManagement />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/settings" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <SystemSettings />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Legacy Admin Routes - Redirect to new paths */}
            <Route path="/users" element={<Navigate to="/admin/users" replace />} />
            <Route path="/trainers" element={<Navigate to="/admin/trainers" replace />} />
            <Route path="/analytics" element={<Navigate to="/admin/analytics" replace />} />
            <Route path="/settings" element={<Navigate to="/admin/settings" replace />} />
            
            {/* Trainer Portal Routes */}
            <Route path="/trainer/dashboard" element={
              <ProtectedRoute requiredRole="trainer">
                <TrainerScheduleProvider>
                  <Layout>
                    <TrainerPortalDashboard />
                  </Layout>
                </TrainerScheduleProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/trainer/members" element={
              <ProtectedRoute requiredRole="trainer">
                <TrainerScheduleProvider>
                  <Layout>
                    <TrainerMembers />
                  </Layout>
                </TrainerScheduleProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/trainer/workouts" element={
              <ProtectedRoute requiredRole="trainer">
                <TrainerScheduleProvider>
                  <Layout>
                    <TrainerWorkouts />
                  </Layout>
                </TrainerScheduleProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/trainer/schedule" element={
              <ProtectedRoute requiredRole="trainer">
                <TrainerScheduleProvider>
                  <Layout>
                    <TrainerSchedule />
                  </Layout>
                </TrainerScheduleProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/trainer/progress" element={
              <ProtectedRoute requiredRole="trainer">
                <TrainerScheduleProvider>
                  <Layout>
                    <TrainerProgressAnalytics />
                  </Layout>
                </TrainerScheduleProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/trainer/settings" element={
              <ProtectedRoute requiredRole="trainer">
                <TrainerScheduleProvider>
                  <Layout>
                    <TrainerSettings />
                  </Layout>
                </TrainerScheduleProvider>
              </ProtectedRoute>
            } />
            
            {/* Legacy Trainer Routes - Redirect to new paths */}
            <Route path="/my-workouts" element={<Navigate to="/trainer/workouts" replace />} />
            <Route path="/my-sessions" element={<Navigate to="/trainer/schedule" replace />} />
            <Route path="/my-members" element={<Navigate to="/trainer/members" replace />} />
            <Route path="/schedule" element={<Navigate to="/trainer/schedule" replace />} />
            
            {/* Old Trainer Routes */}
            <Route path="/my-workouts-old" element={
              <ProtectedRoute requiredRole="trainer">
                <Layout>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">My Workouts</h1>
                    <p className="text-gray-600 mt-2">Manage your workout plans</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/my-sessions-old" element={
              <ProtectedRoute requiredRole="trainer">
                <Layout>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">My Sessions</h1>
                    <p className="text-gray-600 mt-2">Manage your training sessions</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/my-members-old" element={
              <ProtectedRoute requiredRole="trainer">
                <Layout>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">My Members</h1>
                    <p className="text-gray-600 mt-2">Manage your members</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/schedule-old" element={
              <ProtectedRoute requiredRole="trainer">
                <Layout>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
                    <p className="text-gray-600 mt-2">Manage your schedule</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Member Routes */}
            <Route path="/workouts" element={
              <ProtectedRoute>
                <Layout>
                  <MemberWorkouts />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/my-bookings" element={
              <ProtectedRoute>
                <Layout>
                  <MemberBookings />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/bookings" element={
              <ProtectedRoute>
                <Layout>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
                    <p className="text-gray-600 mt-2">All bookings</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/progress" element={
              <ProtectedRoute>
                <Layout>
                  <MemberProgress />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/sessions" element={
              <ProtectedRoute>
                <Layout>
                  <MemberSessions />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Landing Page */}
            <Route path="/" element={
              <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                    🏋️ Gym Management System
                  </h1>
                  <p className="text-gray-600 mb-6 text-center">
                    Welcome to your fitness journey management platform
                  </p>
                  <div className="space-y-4">
                    <Link to="/login" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 block text-center">
                      Login
                    </Link>
                    <Link to="/register" className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200 block text-center">
                      Register
                    </Link>
                  </div>
                </div>
              </div>
            } />
            
            {/* Default redirects */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
