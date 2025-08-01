const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - check if user is authenticated
const protect = async (req, res, next) => {
  let token;

  // Get token from cookie
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'No user found with this token'
      });
    }

    // Check if user is active
    if (!req.user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'User account is deactivated'
      });
    }

    // Verify role consistency (extra security check)
    if (decoded.role && decoded.role !== req.user.role) {
      return res.status(401).json({
        success: false,
        error: 'Token role mismatch - please login again'
      });
    }

    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
};

// Role-based authorization middleware
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Access Denied: Role '${req.user.role}' is not authorized to access this resource. Required roles: ${allowedRoles.join(', ')}`
      });
    }
    
    next();
  };
};

// Advanced authorization - check specific permissions
const authorizeOwnerOrRole = (...allowedRoles) => {
  return (req, res, next) => {
    // Allow if user has required role
    if (allowedRoles.includes(req.user.role)) {
      return next();
    }

    // Allow if user is accessing their own resource
    const resourceUserId = req.params.userId || req.params.id || req.body.userId;
    if (resourceUserId && resourceUserId.toString() === req.user._id.toString()) {
      return next();
    }

    return res.status(403).json({
      success: false,
      error: 'Access Denied: You can only access your own resources or need higher privileges'
    });
  };
};

// Admin only access
const adminOnly = authorize('admin');

// Trainer and Admin access
const trainerOrAdmin = authorize('trainer', 'admin');

// All authenticated users
const authenticatedOnly = protect;

module.exports = {
  protect,
  authorize,
  authorizeOwnerOrRole,
  adminOnly,
  trainerOrAdmin,
  authenticatedOnly
};
