import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

const getDashboardRoute = (role) => {
  switch (role) {
    case 'admin':
      return '/admin-dashboard';
    case 'trainer':
      return '/trainer-dashboard';
    case 'member':
      return '/dashboard';
    default:
      return '/dashboard';
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, isAuthenticated: true, loading: false, error: null };
    case 'LOGIN_FAILURE':
      return { ...state, user: null, isAuthenticated: false, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, loading: false, error: null };
    case 'REGISTER_START':
      return { ...state, loading: true, error: null };
    case 'REGISTER_SUCCESS':
      return { ...state, user: action.payload, isAuthenticated: true, loading: false, error: null };
    case 'REGISTER_FAILURE':
      return { ...state, user: null, isAuthenticated: false, loading: false, error: action.payload };
    case 'LOAD_USER_START':
      return { ...state, loading: true };
    case 'LOAD_USER_SUCCESS':
      return { ...state, user: action.payload, isAuthenticated: true, loading: false };
    case 'LOAD_USER_FAILURE':
      return { ...state, user: null, isAuthenticated: false, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      dispatch({ type: 'LOAD_USER_FAILURE' });
    }
  }, []);

  const loadUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        dispatch({ type: 'LOAD_USER_FAILURE' });
        return;
      }
      
      dispatch({ type: 'LOAD_USER_START' });
      const response = await api.get('/auth/me');
      dispatch({ type: 'LOAD_USER_SUCCESS', payload: response.data.user });
    } catch (error) {
      localStorage.removeItem('token');
      dispatch({ type: 'LOAD_USER_FAILURE' });
    }
  };

  // Helper function for role-based redirection
  const getRedirectPath = (userRole) => {
    switch (userRole) {
      case 'admin':
        return '/admin-dashboard';
      case 'trainer':
        return '/trainer-dashboard';
      case 'member':
        return '/dashboard';
      default:
        return '/dashboard';
    }
  };

  const login = async (credentials) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const response = await api.post('/auth/login', credentials);
      const user = response.data.user;
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      
      // Return user data with redirect path
      return { 
        success: true, 
        user: user,
        redirectPath: getRedirectPath(user.role)
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'REGISTER_START' });
      console.log('Sending registration data:', userData);
      const response = await api.post('/auth/register', userData);
      const user = response.data.user;
      dispatch({ type: 'REGISTER_SUCCESS', payload: user });
      
      // Return user data with redirect path
      return { 
        success: true, 
        user: user,
        redirectPath: getRedirectPath(user.role)
      };
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error details:', error.response?.data?.details);
      
      // Log the exact userData being sent
      console.error('UserData sent:', userData);
      
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Registration failed';
      const errorDetails = error.response?.data?.details || [];
      
      // Show detailed error message if available
      if (errorDetails.length > 0) {
        const detailedError = errorDetails.map(detail => `${detail.field}: ${detail.message}`).join(', ');
        console.error('Detailed validation errors:', detailedError);
      }
      
      dispatch({ type: 'REGISTER_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage, details: errorDetails };
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
      dispatch({ type: 'LOGOUT' });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
    loadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
